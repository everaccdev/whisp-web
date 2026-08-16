// Config for the /discover quiz funnel. Adding a new campaign symbol or ad
// variant should be a one-line addition here, never a code change to
// discover.astro itself.

export type SymbolFamily = 'number' | 'animal' | 'object';

export interface CampaignSymbolConfig {
  /** Headline fragment reflecting the symbol back — "You're seeing 444…" */
  reflected: string;
  family: SymbolFamily;
  /** symbolCache lookup key (see functions/index.js#getSymbolTeaser) */
  cacheKey: string;
  /** The exact Step 2 tap-option label this pre-answers, for branch state */
  step2Value: string;
}

// Real logged-data-informed set (queried live against production signLogs —
// see the /discover build report). Numbers are fully cached; animals/objects
// were seeded ahead of launch via scripts/seedSymbolCache.js so none of
// these fall back to generic teaser copy.
export const CAMPAIGN_SYMBOLS: Record<string, CampaignSymbolConfig> = {
  '1111':       { reflected: "You're seeing 11:11…",          family: 'number', cacheKey: '1111',       step2Value: '11:11' },
  '444':        { reflected: "You're seeing 444…",             family: 'number', cacheKey: '444',        step2Value: '444' },
  '555':        { reflected: "You're seeing 555…",             family: 'number', cacheKey: '555',        step2Value: '555' },
  cardinal:     { reflected: 'A cardinal keeps appearing…',    family: 'animal', cacheKey: 'cardinal',   step2Value: 'Cardinal' },
  hawk:         { reflected: 'A hawk keeps appearing…',        family: 'animal', cacheKey: 'hawk',       step2Value: 'Hawk' },
  butterfly:    { reflected: 'A butterfly keeps appearing…',   family: 'animal', cacheKey: 'butterfly',  step2Value: 'Butterfly' },
  feather:      { reflected: 'You keep finding feathers…',     family: 'object', cacheKey: 'feather',    step2Value: 'Feather' },
  dragonfly:    { reflected: 'A dragonfly keeps appearing…',   family: 'animal', cacheKey: 'dragonfly',  step2Value: 'Dragonfly' },
  hummingbird:  { reflected: 'A hummingbird keeps appearing…', family: 'animal', cacheKey: 'hummingbird', step2Value: 'Hummingbird' },
  fox:          { reflected: 'A fox keeps appearing…',         family: 'animal', cacheKey: 'fox',        step2Value: 'Fox' },
};

export interface VariantCopy {
  headline: string;
  sub: string;
}

// Deliberately observational, never assigning meaning — "you keep seeing X"
// not "X means Y" or "X is a sign from Z" (see sensitivity note: naming the
// sighting is honest, assigning its source or meaning up front is not).
export const VARIANT_COPY: Record<string, VariantCopy> = {
  default: {
    headline: "What has life been showing you?",
    sub: 'A few quick questions, then a real reading — not a template.',
  },
  signs: {
    headline: 'Something keeps showing up. What might it mean?',
    sub: 'A short reading, built from what you actually tell us.',
  },
  numbers: {
    headline: 'You keep seeing the same number.',
    sub: 'A short reading built from what you actually tell us — not a generic template.',
  },
  animals: {
    headline: 'The same creature keeps crossing your path.',
    sub: 'A short reading built from what you actually tell us — not a generic template.',
  },
};

export const STEP1_OPTIONS = [
  'A repeating number',
  'An animal or bird',
  'A dream that stayed with you',
  'A word, name, or phrase',
  "A feeling I can't explain",
  'Something else',
] as const;

// Ranked by real logged frequency (signLogs, queried live — hawk/feather/
// dragonfly/butterfly/hummingbird/owl/deer lead; cardinal is real but rarer
// in-app, kept for message-match with the campaign symbol table above).
export const ANIMAL_OPTIONS = [
  'Hawk', 'Feather', 'Dragonfly', 'Butterfly', 'Hummingbird', 'Owl', 'Deer', 'Cardinal', 'Fox', 'Another',
] as const;

export const NUMBER_OPTIONS = ['111', '222', '333', '444', '555', '11:11', 'Another'] as const;

export const FEELING_OPTIONS = [
  'Déjà vu', 'A pull toward something', 'Being watched over', 'Unease I can\'t place', 'Another',
] as const;

export const LIFE_CONTEXT_OPTIONS = [
  'A big decision', 'A relationship', 'Work or purpose', 'An ending', 'A new beginning', "I'm not sure yet",
] as const;

export const LENS_OPTIONS = [
  'Signs & synchronicity', 'Astrology', 'Dreams & symbols', 'Intuition', 'Faith or scripture', 'Just curious',
] as const;
