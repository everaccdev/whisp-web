// Pattern Map & Recall System — glyph resolution for the web host. Mirrors
// src/utils/patternMapGlyphs.js in the app repo — same 13-asset set (copied
// into public/patternMap/ verbatim) plus the reused dream icon, same
// numbers-stay-typographic rule. Returns a public URL path rather than a
// bundler import since these are static files served from /public.
const ANIMAL_GLYPHS: Record<string, string> = {
  Hawk: '/patternMap/animal_hawk.png',
  Feather: '/patternMap/animal_feather.png',
  Dragonfly: '/patternMap/animal_dragonfly.png',
  Butterfly: '/patternMap/animal_butterfly.png',
  Hummingbird: '/patternMap/animal_hummingbird.png',
  Owl: '/patternMap/animal_owl.png',
  Deer: '/patternMap/animal_deer.png',
  Cardinal: '/patternMap/animal_cardinal.png',
  Fox: '/patternMap/animal_fox.png',
};

const CATEGORY_GLYPHS: Record<string, string> = {
  object: '/patternMap/category_object.png',
  word: '/patternMap/category_word.png',
  other: '/patternMap/category_other.png',
  dream: '/patternMap/category_dream.png',
};

const FALLBACK_GLYPH = '/patternMap/category_fallback.png';

export const isTypographicNumber = (category: string | null): boolean => category === 'number';

export const glyphForOption = (categoryKey: string | null, specificValue: string | null = null): string | null => {
  if (isTypographicNumber(categoryKey)) return null;
  if (categoryKey === 'animal' && specificValue && ANIMAL_GLYPHS[specificValue]) return ANIMAL_GLYPHS[specificValue];
  if (categoryKey && CATEGORY_GLYPHS[categoryKey]) return CATEGORY_GLYPHS[categoryKey];
  return FALLBACK_GLYPH;
};
