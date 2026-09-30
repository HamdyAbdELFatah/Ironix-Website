/**
 * Single source of truth for brand URLs, contact email and store links.
 *
 * Every value is overridable per deployment through NEXT_PUBLIC_* env vars
 * (inlined at build time), so moving to a custom domain or publishing the
 * store listings is a config change, not a code change.
 */

export type StorePlatform = 'ios' | 'android';

function envOr(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

const SITE_URL = envOr(process.env.NEXT_PUBLIC_SITE_URL, 'https://ironix-website.vercel.app').replace(/\/+$/, '');
const SUPPORT_EMAIL = envOr(process.env.NEXT_PUBLIC_SUPPORT_EMAIL, 'hamdy.abdelfattah.mohamed@gmail.com');

// Empty until the listings are live: an empty URL hides the store badge and the
// page shows the waitlist instead, so the site never links to a 404.
const STORE_URLS: Record<StorePlatform, string> = {
  ios: envOr(process.env.NEXT_PUBLIC_APP_STORE_URL, ''),
  android: envOr(process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL, ''),
};

export const APP_CONFIG = {
  name: 'Ironix',
  tagline: 'Train with purpose. Progress with proof.',
  description:
    'Offline-first workout tracker with a muscle recovery map, a digital gym pass and full Arabic support.',
  url: SITE_URL,
  support: { email: SUPPORT_EMAIL },
  hasAnyStoreListing(): boolean {
    return Object.values(STORE_URLS).some((url) => url.length > 0);
  },
  /** Store URL tagged with UTM parameters, or null while the listing isn't published. */
  storeUrl(platform: StorePlatform, section: string): string | null {
    const base = STORE_URLS[platform];
    if (!base) return null;
    const separator = base.includes('?') ? '&' : '?';
    return `${base}${separator}utm_source=landing&utm_medium=${platform}&utm_campaign=download&utm_content=${encodeURIComponent(section)}`;
  },
};
