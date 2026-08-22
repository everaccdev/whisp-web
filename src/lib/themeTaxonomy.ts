// Pattern Map & Recall System — theme taxonomy, ported from the app repo's
// src/utils/themeTaxonomy.js (source of truth — see that file's header for
// the full rationale and the real symbolCache data each mapping is grounded
// in). Duplicated here rather than imported because this is a separate
// deploy (whisp-web), same reasoning as functions/index.js's own copy —
// keep all three in sync if any of them changes.

export interface ThemeDef { id: string; label: string; }

export const RECALL_THEMES: Record<string, ThemeDef> = {
  threshold: { id: 'threshold', label: 'Threshold / Transition' },
  foundation: { id: 'foundation', label: 'Foundation / Stability' },
  beginning: { id: 'beginning', label: 'Beginning / Initiation' },
  alignment: { id: 'alignment', label: 'Alignment / Confirmation' },
  partnership: { id: 'partnership', label: 'Partnership / Union' },
  growth: { id: 'growth', label: 'Growth / Expansion' },
  abundance: { id: 'abundance', label: 'Abundance / Cycles' },
  completion: { id: 'completion', label: 'Completion / Ending' },
  vision: { id: 'vision', label: 'Vision / Perspective' },
  intuition: { id: 'intuition', label: 'Intuition / Inner Knowing' },
  messages: { id: 'messages', label: 'Messages / Communication' },
  protection: { id: 'protection', label: 'Protection / Guidance' },
  release: { id: 'release', label: 'Release / Letting Go' },
  transformation: { id: 'transformation', label: 'Transformation / Rebirth' },
  grief: { id: 'grief', label: 'Grief / Remembrance' },
  gentleness: { id: 'gentleness', label: 'Gentleness / Receptivity' },
};

export const SYMBOL_THEME_MAP: Record<string, Record<string, number>> = {
  '1111': { alignment: 1.0, threshold: 0.6 },
  '111': { beginning: 1.0, alignment: 0.7 },
  '222': { partnership: 1.0, threshold: 0.5 },
  '333': { growth: 1.0 },
  '444': { foundation: 1.0, protection: 0.5 },
  '555': { threshold: 1.0, transformation: 0.4 },
  '888': { abundance: 1.0 },
  '999': { completion: 1.0 },

  cardinal: { messages: 1.0, grief: 0.7 },
  hawk: { vision: 1.0, messages: 0.5 },
  eagle: { vision: 1.0 },
  owl: { intuition: 1.0, vision: 0.4 },
  deer: { gentleness: 1.0, threshold: 0.4 },
  fawn: { gentleness: 1.0 },
  rabbit: { gentleness: 0.8 },
  hummingbird: { gentleness: 0.7, intuition: 0.8 },
  butterfly: { transformation: 1.0, grief: 0.4 },
  moth: { transformation: 0.8 },
  dragonfly: { transformation: 1.0, vision: 0.4 },
  snake: { release: 1.0, transformation: 0.6, threshold: 0.3 },
  wolf: { protection: 1.0, intuition: 0.4 },
  dog: { protection: 1.0 },
  raven: { messages: 0.8, intuition: 0.5 },
  crow: { messages: 0.8, intuition: 0.5 },
  dove: { messages: 0.7, gentleness: 0.6 },
  feather: { messages: 1.0, grief: 0.6 },
  white_feather: { messages: 1.0, grief: 0.9 },

  water: { intuition: 1.0, release: 0.5 },
  moon: { intuition: 1.0 },
  bridge: { threshold: 1.0 },
  door: { threshold: 1.0, beginning: 0.4 },
  key: { threshold: 0.8, alignment: 0.4 },
  mountain: { foundation: 1.0, vision: 0.3 },
  sunrise: { beginning: 1.0, growth: 0.4 },
  sunset: { completion: 1.0 },
  seed: { beginning: 1.0, growth: 0.5 },
  spiral: { abundance: 0.8, transformation: 0.4 },
  mirror: { intuition: 0.8 },
  fog: { intuition: 0.6 },
  wind: { release: 0.8 },
};

const KEYWORD_THEME_HINTS: Record<string, string[]> = {
  threshold: ['threshold', 'gateway', 'portal', 'liminal', 'in-between', 'crossing'],
  foundation: ['foundation', 'structure', 'grounded', 'stability', 'roots'],
  beginning: ['beginning', 'birth', 'dawn', 'initiat', 'new start', 'pioneer'],
  alignment: ['synchronicity', 'alignment', 'confirm'],
  partnership: ['partnership', 'union', 'relationship', 'bond', 'together'],
  growth: ['growth', 'expansion', 'flourish', 'blossom'],
  abundance: ['abundance', 'cycle', 'harvest', 'prosperity'],
  completion: ['completion', 'ending', 'closure', 'culminat'],
  vision: ['perspective', 'vision', 'clarity', 'discernment', 'see what others miss'],
  intuition: ['intuition', 'inner knowing', 'instinct', 'presence', 'stillness'],
  messages: ['message', 'messenger', 'communication', 'sign from', 'carries word'],
  protection: ['protect', 'guard', 'guidance', 'watch over'],
  release: ['release', 'let go', 'shed', 'surrender', 'dissolv'],
  transformation: ['transform', 'metamorphosis', 'rebirth', 'chrysalis', 'emerges'],
  grief: ['grief', 'loss', 'mourning', 'remembrance', 'departed'],
  gentleness: ['gentle', 'vulnerab', 'receptiv', 'grace', 'soft'],
};

export const inferThemesFromMeaningText = (text: string | null): Record<string, number> => {
  if (!text) return {};
  const lower = text.toLowerCase();
  const result: Record<string, number> = {};
  Object.entries(KEYWORD_THEME_HINTS).forEach(([themeId, keywords]) => {
    if (keywords.some(kw => lower.includes(kw))) result[themeId] = 0.5;
  });
  return result;
};

// Same slugify as symbolCacheService.js#cacheKey / functions/index.js's copy.
export const themeCacheKeyForSymbol = (symbolName: string | null): string =>
  String(symbolName || '').toLowerCase().trim().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');

export const getSymbolThemeWeights = (symbolName: string | null, cachedMeaningText: string | null = null): Record<string, number> => {
  const key = themeCacheKeyForSymbol(symbolName);
  if (SYMBOL_THEME_MAP[key]) return SYMBOL_THEME_MAP[key];
  return inferThemesFromMeaningText(cachedMeaningText);
};

// ── Recall canvas: fixed theme→angle compass ────────────────────────────────
// See themeTaxonomy.js for the full compass rationale — grouped so
// thematically adjacent regions sit together, Foundation directly opposite
// Vision.
export const RECALL_THEME_ANGLES: Record<string, number> = {
  vision: 0, alignment: 22.5, messages: 45, intuition: 67.5,
  beginning: 90, growth: 112.5, abundance: 135, partnership: 157.5,
  foundation: 180, protection: 202.5, gentleness: 225, threshold: 247.5,
  release: 270, grief: 292.5, completion: 315, transformation: 337.5,
};

// Deterministic (not Math.random) — same seed always resolves to the same
// offset, so a re-render or restored draft never reshuffles a star.
const hashSeed = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

export interface EntryPlacement { angleDeg: number; radiusFactor: number; dominantTheme: string | null; }

// Resolves ONE entry's final canvas position from its own dominant theme —
// computed once at finalize time and never recomputed. seedKey should be
// unique per entry (symbolName + index) so repeats still jitter apart.
export const computeEntryPlacement = (symbolName: string | null, cachedMeaningText: string | null, seedKey: string): EntryPlacement => {
  const weights = getSymbolThemeWeights(symbolName, cachedMeaningText);
  const themeIds = Object.keys(weights);
  const dominantTheme = themeIds.length
    ? themeIds.sort((a, b) => weights[b] - weights[a])[0]
    : null;

  const hash = hashSeed(String(seedKey || symbolName || ''));
  const angleJitter = (hash % 21) - 10; // ±10°, deterministic
  // `>>>` not `>>` — see themeTaxonomy.js's comment on this exact bug.
  const radiusFactor = 0.85 + ((hash >>> 8) % 30) / 100;

  const baseAngle = dominantTheme != null ? RECALL_THEME_ANGLES[dominantTheme] : (hash % 360);

  return {
    angleDeg: (baseAngle + angleJitter + 360) % 360,
    radiusFactor,
    dominantTheme,
  };
};
