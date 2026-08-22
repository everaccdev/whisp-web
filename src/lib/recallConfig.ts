// Config for the /patterns Pattern Map funnel — the web host's shell around
// the same shared recall-capture question set as the in-app
// RecallCaptureScreen (src/utils/recallCaptureConfig.js in the main app
// repo). Self-contained/duplicated rather than importing from quizConfig.ts
// or the app repo — /patterns is a separate, independently-evolvable
// funnel per the build spec ("/reading and the quiz remain live... not
// deleted"), not a variant of either.

export interface EntryCategory { key: string; label: string; }

export const ENTRY_CATEGORIES: EntryCategory[] = [
  { key: 'number', label: 'A repeating number' },
  { key: 'animal', label: 'An animal or bird' },
  { key: 'dream', label: 'A dream' },
  { key: 'object', label: 'An object' },
  { key: 'word', label: 'A word or name' },
  { key: 'other', label: 'Something else' },
];

export const NUMBER_OPTIONS = ['111', '222', '333', '444', '555', '11:11', 'Another'];
export const ANIMAL_OPTIONS = ['Hawk', 'Feather', 'Dragonfly', 'Butterfly', 'Hummingbird', 'Owl', 'Deer', 'Cardinal', 'Fox', 'Another'];

export interface EraOption { key: string; label: string; }

// Tap-select only — never a date picker. Precise dating of a recalled
// event is false precision.
export const ERA_OPTIONS: EraOption[] = [
  { key: 'recently', label: 'Recently' },
  { key: 'few_months', label: 'A few months ago' },
  { key: 'about_year', label: 'About a year ago' },
  { key: 'years_ago', label: 'Years ago' },
  { key: 'keeps_happening', label: 'It keeps happening' },
  { key: 'dont_remember', label: "I don't remember" },
];

export const MIN_ENTRIES = 3;
export const MAX_ENTRIES = 8;
export const DONE_AVAILABLE_FROM = 3;

export const encouragementFor = (entryCount: number): string | null => {
  if (entryCount < MIN_ENTRIES) return null;
  if (entryCount === MIN_ENTRIES) return 'Three is enough to find a thread. More gives Whisp more to work with.';
  if (entryCount < MAX_ENTRIES) return 'Each one sharpens the picture a little more.';
  return null;
};

// Campaign symbol pre-fill for the first entry — same values/keys as
// quizConfig.ts's CAMPAIGN_SYMBOLS (kept as a separate literal copy per the
// decoupling note above), reflecting the symbol back honestly rather than
// assigning it meaning (see the /discover build's sensitivity note).
export interface CampaignSymbolConfig {
  reflected: string;
  category: 'number' | 'animal' | 'object';
  symbolName: string;
}

export const CAMPAIGN_SYMBOLS: Record<string, CampaignSymbolConfig> = {
  '1111':       { reflected: "You're seeing 11:11…",          category: 'number', symbolName: '11:11' },
  '444':        { reflected: "You're seeing 444…",             category: 'number', symbolName: '444' },
  '555':        { reflected: "You're seeing 555…",             category: 'number', symbolName: '555' },
  cardinal:     { reflected: 'A cardinal keeps appearing…',    category: 'animal', symbolName: 'Cardinal' },
  hawk:         { reflected: 'A hawk keeps appearing…',        category: 'animal', symbolName: 'Hawk' },
  butterfly:    { reflected: 'A butterfly keeps appearing…',   category: 'animal', symbolName: 'Butterfly' },
  feather:      { reflected: 'You keep finding feathers…',     category: 'object', symbolName: 'Feather' },
  dragonfly:    { reflected: 'A dragonfly keeps appearing…',   category: 'animal', symbolName: 'Dragonfly' },
  hummingbird:  { reflected: 'A hummingbird keeps appearing…', category: 'animal', symbolName: 'Hummingbird' },
  fox:          { reflected: 'A fox keeps appearing…',         category: 'animal', symbolName: 'Fox' },
};

export const LIFE_DOMAINS = [
  'Relationships', 'Work & Purpose', 'Home & Stability',
  'Grief & Endings', 'A Decision', 'Something New',
];
