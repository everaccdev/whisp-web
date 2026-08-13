// Live founder count — sourced from real active Stripe subscriptions on the
// two founders Price IDs (monthly + annual both count, per product
// decision: a founding member is a founding member regardless of billing
// interval). Cached in-memory with a short TTL so the page stays fast and
// Stripe isn't hit on every request — this is a module-level cache, which
// persists across warm serverless invocations and resets on cold start;
// that's an acceptable, deliberately simple tradeoff for a number that only
// needs to be "close enough," not transactionally exact to the second.
import Stripe from 'stripe';

const FOUNDER_CAP = 500;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const FOUNDERS_PRICE_IDS = [
  'price_1U40ORCwtErAAxY9rPrMvCM6', // monthly
  'price_1U40ORCwtErAAxY9tD751yjH', // annual
];

let cache: { count: number; fetchedAt: number } | null = null;

// Paginates fully rather than trusting the first page — at a 500-person
// cap we could plausibly have more active subscriptions on one price than
// Stripe's page size, and an undercounted number here would mean the cap
// gets enforced late (letting in a 501st+ member) rather than early. An
// overcounted number is the safer failure direction if this has to lean
// one way, but full pagination avoids needing to pick.
async function countActiveSubscriptions(stripe: Stripe, priceId: string): Promise<number> {
  let count = 0;
  let startingAfter: string | undefined;
  for (;;) {
    const page = await stripe.subscriptions.list({
      price: priceId,
      status: 'active',
      limit: 100,
      starting_after: startingAfter,
    });
    count += page.data.length;
    if (!page.has_more) break;
    startingAfter = page.data[page.data.length - 1]?.id;
    if (!startingAfter) break;
  }
  return count;
}

// Returns null on Stripe failure — callers must show the offer WITHOUT a
// number in that case, never a stale or fabricated one (see Phase 4
// requirement: "if Stripe is unreachable, show the offer without a number
// rather than showing a wrong number").
export async function getFounderCount(secretKey: string): Promise<{ count: number; remaining: number; capReached: boolean } | null> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return {
      count: cache.count,
      remaining: Math.max(0, FOUNDER_CAP - cache.count),
      capReached: cache.count >= FOUNDER_CAP,
    };
  }

  try {
    const stripe = new Stripe(secretKey);
    const counts = await Promise.all(FOUNDERS_PRICE_IDS.map(id => countActiveSubscriptions(stripe, id)));
    const total = counts.reduce((a, b) => a + b, 0);
    cache = { count: total, fetchedAt: Date.now() };
    return {
      count: total,
      remaining: Math.max(0, FOUNDER_CAP - total),
      capReached: total >= FOUNDER_CAP,
    };
  } catch (err) {
    console.error('getFounderCount: Stripe fetch failed:', (err as Error).message);
    // Serve a stale cache if we have one rather than nothing — still
    // better than a hard failure, and only slightly behind real-time.
    if (cache) {
      return {
        count: cache.count,
        remaining: Math.max(0, FOUNDER_CAP - cache.count),
        capReached: cache.count >= FOUNDER_CAP,
      };
    }
    return null;
  }
}

export { FOUNDER_CAP, FOUNDERS_PRICE_IDS };
