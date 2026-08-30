export const prerender = false;

import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { getFounderCount } from '../../lib/founderCount';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY as string);
const SITE = 'https://getwhisp.app';

// Real, persisted Stripe Price objects (created once — see
// PROJECT_NOTES.md or the founders-price creation script) rather than the
// inline `price_data` this used to build per-checkout. That mattered for
// one specific reason: the live founder counter (Phase 4) needs a stable
// set of Price IDs to query subscription counts against — price_data
// creates an ad-hoc Price under the hood that isn't something you can
// reliably re-query later. Price IDs aren't secret (same trust level as a
// Stripe publishable key), so hardcoding them here rather than depending
// on a Netlify dashboard env var being set correctly at deploy time is a
// deliberate choice, not an oversight.
const PLANS = {
  monthly: { priceId: 'price_1U40ORCwtErAAxY9rPrMvCM6', label: 'Whisp Premium — Monthly' },
  annual:  { priceId: 'price_1U40ORCwtErAAxY9tD751yjH', label: 'Whisp Premium — Annual'  },
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body  = await request.json().catch(() => ({}));
    const email: string | undefined = body?.email || undefined;
    const plan  = (body?.plan === 'annual') ? 'annual' : 'monthly';
    const { priceId } = PLANS[plan];

    // In-app external-checkout entry point (App Store 3.1.1(a), iOS/US
    // only) passes the signed-in Firebase uid through so stripeWebhook can
    // attach the purchase to the user's EXISTING account instead of
    // resolving by email — a signed-in user checking out with a different
    // billing email than their Whisp account would otherwise get a second,
    // orphaned account with none of their logged history. uid isn't
    // secret (same trust tier as the price IDs above); worst case someone
    // hand-crafts a request with someone else's uid and pays for THEM,
    // which is a gift, not a vulnerability.
    const uid: string | undefined = typeof body?.uid === 'string' && body.uid.trim() ? body.uid.trim() : undefined;

    // First-touch UTM the client persisted at landing time (see
    // Analytics.astro) — carried into Stripe metadata so stripeWebhook can
    // write acquisition source onto the user doc, and so a purchase is
    // attributable to a campaign without cross-referencing PostHog.
    const utm = body?.utm && typeof body.utm === 'object' ? body.utm : {};
    const utmMetadata: Record<string, string> = {};
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
      if (typeof utm[key] === 'string' && utm[key]) utmMetadata[key] = String(utm[key]).slice(0, 200);
    }

    // Hard cap enforcement — the whole point of "500 founding spots" is
    // that it's a real number, not a marketing device. If the count is
    // unavailable (Stripe unreachable), we deliberately fail closed here
    // rather than silently letting a 501st+ person through: checkout is a
    // much higher-stakes moment to get wrong than the counter display,
    // where failing open (hide the number) is the right call instead.
    const founderStatus = await getFounderCount(import.meta.env.STRIPE_SECRET_KEY as string);
    if (!founderStatus || founderStatus.capReached) {
      return new Response(JSON.stringify({
        error: 'cap_reached',
        message: 'Founders access has reached its 500-member cap. Standard pricing is available in the app.',
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      allow_promotion_codes: true,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${SITE}/founders/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${SITE}/founders`,
      // source/plan/tier all live in metadata so the founder counter and
      // the Stripe webhook (which reads session.metadata?.plan) keep
      // working exactly as before — the switch to real Price IDs doesn't
      // change what either of those read.
      metadata: {
        source: uid ? 'in_app_external_checkout' : 'founders_page',
        plan, tier: 'founders',
        ...(uid && { uid }),
        ...utmMetadata,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('checkout error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
