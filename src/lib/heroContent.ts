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
  id: 'A' | 'B' | 'C';
  titlePlain: string;
  titleEmphasis: string;
  sub: string;
};

export const HERO_VARIANTS: Record<'A' | 'B' | 'C', HeroVariant> = {
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
};

// The live variant. Swap this one line to test B or C — nothing else in
// index.astro needs to change.
export const ACTIVE_HERO_VARIANT: HeroVariant = HERO_VARIANTS.A;
