export const prerender = false;

import type { APIRoute } from 'astro';
import { getFounderCount } from '../../lib/founderCount';

export const GET: APIRoute = async () => {
  const result = await getFounderCount(import.meta.env.STRIPE_SECRET_KEY as string);

  // null means Stripe was unreachable AND there's no cache to fall back on
  // — the frontend must show the offer without a number in this case
  // rather than a fabricated or stale-beyond-trust one.
  if (!result) {
    return new Response(JSON.stringify({ available: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }

  return new Response(JSON.stringify({ available: true, ...result }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};
