// Hero copy, extracted from index.astro so variants can be swapped for
// A/B testing without touching the component. No experimentation framework
// introduced — just a plain export the page imports and reads one key from.
// To run a manual test: change ACTIVE_VARIANT below (or wire it to a query
// param / cookie in index.astro if a real split becomes worth building).
//
// Each variant is a title (rendered as the hero <h1>, with the <em> portion
// marked separately so index.astro can keep its existing emphasis styling)
// plus the subhead paragraph beneath it.

export type HeroVariant = {
  id: 'A' | 'B' | 'C' | 'D';
  titlePlain: string;
  titleEmphasis: string;
  sub: string;
};

export const HERO_VARIANTS: Record<'A' | 'B' | 'C' | 'D', HeroVariant> = {
  A: {
    id: 'A',
    titlePlain: 'One sign is a moment.',
    titleEmphasis: 'A pattern is a message.',
    sub: "Whisp remembers what you don't —<br />and shows you what it adds up to.",
  },
  B: {
    id: 'B',
    titlePlain: 'What keeps',
    titleEmphasis: 'finding you?',
    sub: "Whisp remembers what you don't —<br />and shows you what it adds up to.",
  },
  C: {
    id: 'C',
    titlePlain: 'Maybe life has been speaking to you',
    titleEmphasis: 'longer than you’ve been listening.',
    sub: "Whisp remembers what you don't —<br />and shows you what it adds up to.",
  },
  // D is the headline the current homepage narrative is built around: the
  // whole page is a progressive expansion from one noticed moment outward,
  // and every later section resolves against this line. A/B/C predate that
  // restructure and pair with a page that argued differently.
  D: {
    id: 'D',
    titlePlain: 'You noticed the sign.',
    titleEmphasis: 'Whisp noticed the pattern.',
    sub: 'Dreams. Numbers. Symbols. Coincidences.<br />Whisp remembers what keeps finding you — and what was happening when it did.',
  },
};

// The live variant — server-rendered, and the no-JS / first-paint default.
export const ACTIVE_HERO_VARIANT: HeroVariant = HERO_VARIANTS.D;

// Which variants the client-side split actually assigns from.
//
// Currently a single entry, which means the split is effectively PAUSED —
// every visitor sees D. That's deliberate: the page narrative below the
// hero now depends on D's framing, so serving A/B/C would put a quarter of
// visitors on a hero that contradicts the rest of the page.
//
// The machinery is intact rather than deleted. To resume testing, add ids
// back to this array — nothing else needs to change, and the cookie,
// PostHog super-property and assignment event all keep working.
export const HERO_SPLIT_IDS: Array<HeroVariant['id']> = ['D'];
