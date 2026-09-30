import { afterEach, describe, expect, it, vi } from 'vitest';

async function loadConfig() {
  vi.resetModules();
  return (await import('./constants')).APP_CONFIG;
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('APP_CONFIG', () => {
  it('defaults to the live site and the real support inbox', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '');
    vi.stubEnv('NEXT_PUBLIC_SUPPORT_EMAIL', '');
    const config = await loadConfig();
    expect(config.url).toBe('https://ironix-website.vercel.app');
    expect(config.support.email).toBe('hamdy.abdelfattah.mohamed@gmail.com');
  });

  it('takes the site URL and support email from env, without a trailing slash', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.org/');
    vi.stubEnv('NEXT_PUBLIC_SUPPORT_EMAIL', 'help@example.org');
    const config = await loadConfig();
    expect(config.url).toBe('https://example.org');
    expect(config.support.email).toBe('help@example.org');
  });

  it('has no store links until the listings are configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_APP_STORE_URL', '');
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_PLAY_URL', '');
    const config = await loadConfig();
    expect(config.hasAnyStoreListing()).toBe(false);
    expect(config.storeUrl('ios', 'hero')).toBeNull();
    expect(config.storeUrl('android', 'hero')).toBeNull();
  });

  it('tags configured store links with UTM parameters', async () => {
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_PLAY_URL', 'https://play.google.com/store/apps/details?id=com.ironix');
    const config = await loadConfig();
    const url = config.storeUrl('android', 'cta');
    expect(config.hasAnyStoreListing()).toBe(true);
    expect(url).toContain('id=com.ironix&utm_source=landing');
    expect(url).toContain('utm_medium=android');
    expect(url).toContain('utm_content=cta');
  });
});
