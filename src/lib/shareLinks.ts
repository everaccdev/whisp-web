// Shared install-link constants + UTM tagging for every share-landing page
// (r/c/d/je/sl/v/y under src/pages). Centralized here so all seven don't
// each hand-roll their own copy of the store URLs — a real gap found in
// audit: six of the seven previously had NO Android link at all (iOS-only,
// even on pages whose own microcopy said "iOS & Android"), and none of the
// seven tagged outbound links with any attribution params.
export const APP_STORE_URL = 'https://apps.apple.com/app/id6777561873';
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.eyeswidewellness.whisp&pcampaignid=web_share';

// Google Play's Install Referrer API reliably surfaces utm_source/medium/
// content into post-install attribution — this is a real, working signal
// on Android. Apple's App Store does NOT carry arbitrary query params
// through an install (that needs Apple Search Ads' own pt/ct/mt params or
// a deep-link/attribution SDK, neither of which exists here) — so on iOS
// this is honest best-effort tagging (visible in the outbound link, usable
// if attribution tooling is ever added) rather than a working attribution
// path today. Tag both anyway: cheap, harmless, and correct the moment iOS
// attribution tooling exists.
export function withShareUtm(url: string, shareType: string, id?: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set('utm_source', 'share');
    u.searchParams.set('utm_medium', shareType);
    if (id) u.searchParams.set('utm_content', id);
    return u.toString();
  } catch {
    return url;
  }
}
