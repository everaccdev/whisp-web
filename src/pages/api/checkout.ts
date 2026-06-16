export const prerender = false;

import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY as string);
const SITE = 'https://getwhisp.app';

const PLANS = {
  monthly: { amount: 399,  interval: 'month' as const, label: 'Whisp Premium — Monthly' },
  annual:  { amount: 3997, interval: 'year'  as const, label: 'Whisp Premium — Annual'  },
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body  = await request.json().catch(() => ({}));
    const email: string | undefined = body?.email || undefined;
    const plan  = (body?.plan === 'annual') ? 'annual' : 'monthly';
    const { amount, interval, label } = PLANS[plan];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      allow_promotion_codes: true,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: label,
              description: 'Full premium access. Cancel anytime.',
            },
            unit_amount: amount,
            recurring: { interval },
          },
          quantity: 1,
        },
      ],
      success_url: `${SITE}/founders/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${SITE}/founders`,
      metadata: { source: 'founders_page', plan },
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
