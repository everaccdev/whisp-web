export const prerender = false;

import type { APIRoute } from 'astro';

// Thin server-side proxy to the generateLeadReading Cloud Function — keeps
// the Cloud Functions URL and any future server-side additions (analytics,
// UTM capture) in one place, same pattern as api/checkout.ts.
const FUNCTION_URL = 'https://us-central1-life-signs-be094.cloudfunctions.net/generateLeadReading';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));

    const upstream = await fetch(FUNCTION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await upstream.json().catch(() => ({}));

    return new Response(JSON.stringify(data), {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('lead-reading proxy error:', err);
    return new Response(JSON.stringify({ error: 'Something went wrong. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
