/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly STRIPE_SECRET_KEY: string;
  readonly FOUNDERS_PRICE_CENTS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}