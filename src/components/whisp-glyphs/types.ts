// Split out from WhispGlyph.astro — Astro's build-time esbuild pass choked
// on a multi-line `export type ... = 'a' | 'b' | ...` union declared
// directly in a component's frontmatter (passed `astro check`, failed
// `astro build`), so the types live in a plain .ts file instead.
export type WhispGlyphName =
  | 'spark'
  | 'sign-diamond'
  | 'synchronicity'
  | 'pattern'
  | 'feather'
  | 'dream-crescent'
  | 'threshold'
  | 'ripple'
  | 'fading-memory'
  | 'thread';

export type WhispGlyphAnimation = 'none' | 'draw' | 'drift' | 'fade' | 'brighten';
