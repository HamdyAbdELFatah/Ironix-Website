import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';

async function loadBadges() {
  vi.resetModules();
  const { AppStoreBadge } = await import('./app-store-badge');
  const { GooglePlayBadge } = await import('./google-play-badge');
  return { AppStoreBadge, GooglePlayBadge };
}

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

describe('App Download Badges', () => {
  it('render nothing while the store listings are not published', async () => {
    vi.stubEnv('NEXT_PUBLIC_APP_STORE_URL', '');
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_PLAY_URL', '');
    const { AppStoreBadge, GooglePlayBadge } = await loadBadges();
    const { container } = render(
      <>
        <AppStoreBadge section="hero" />
        <GooglePlayBadge section="hero" />
      </>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('link to the configured listings with UTM tags', async () => {
    vi.stubEnv('NEXT_PUBLIC_APP_STORE_URL', 'https://apps.apple.com/app/id1');
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_PLAY_URL', 'https://play.google.com/store/apps/details?id=com.ironix');
    const { AppStoreBadge, GooglePlayBadge } = await loadBadges();
    render(
      <>
        <AppStoreBadge section="hero" />
        <GooglePlayBadge section="hero" />
      </>
    );
    expect(screen.getByRole('link', { name: /Apple App Store/i })).toHaveAttribute(
      'href',
      expect.stringContaining('apps.apple.com/app/id1?utm_source=landing')
    );
    expect(screen.getByRole('link', { name: /Google Play/i })).toHaveAttribute(
      'href',
      expect.stringContaining('id=com.ironix&utm_source=landing')
    );
  });
});
