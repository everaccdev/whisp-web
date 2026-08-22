export const prerender = false;

import type { APIRoute } from 'astro';

// Thin server-side proxy to the getThemeTriadStory Cloud Function — same
// pattern as api/lead-reading.ts and api/checkout.ts. This is what renders
// the /patterns Pattern Map FREE, in full, before the email gate — the
// function itself generates-on-miss (a real Claude call happens here on a
// cold cache) but the result is cached forever server-side, so repeat
// visitors to the same theme triad never pay that cost again.
const FUNCTION_URL = 'https://us-central1-life-signs-be094.cloudfunctions.net/getThemeTriadStory';

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
    console.error('theme-triad-story proxy error:', err);
    return new Response(JSON.stringify({ error: 'Something went wrong. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
