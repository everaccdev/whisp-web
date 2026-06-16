export const prerender = false;

import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY as string);

const SITE = 'https://getwhisp.app';
const PRICE_CENTS = parseInt(import.meta.env.FOUNDERS_PRICE_CENTS || '4900'); // $49

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const email: string | undefined = body?.email || undefined;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      allow_promotion_codes: true,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Whisp — Founders Access',
              description:
                'Lifetime premium access at the founders price. Your Whisp account will be ready within minutes of payment.',
              images: ['https://getwhisp.app/og-image.jpg'],
            },
            unit_amount: PRICE_CENTS,
          },
          quantity: 1,
        },
      ],
      success_url: `${SITE}/founders/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE}/founders`,
      metadata: { source: 'founders_page' },
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
