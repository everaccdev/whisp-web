// netlify/functions/create-checkout.js
// Stripe Checkout Session creator — wire this up when you're ready for web payments
//
// Setup:
//   1. npm install stripe
//   2. Add STRIPE_SECRET_KEY to Netlify environment variables
//   3. Add STRIPE_PRICE_ID to Netlify environment variables (your founding member price)
//   4. Uncomment the code below and update SUCCESS_URL / CANCEL_URL
//
// Then point your pricing CTA button to: /.netlify/functions/create-checkout

/*
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: 'https://getwhisp.app/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://getwhisp.app/#pricing',
      allow_promotion_codes: true,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
*/

// Placeholder response until Stripe is configured
export const handler = async () => ({
  statusCode: 200,
  body: JSON.stringify({ message: 'Stripe not yet configured' }),
});
