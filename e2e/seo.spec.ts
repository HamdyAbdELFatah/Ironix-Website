import { test, expect } from '@playwright/test';

test.describe('Ironix SEO & Metadata Endpoints', () => {
  test('serves valid robots.txt', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.ok()).toBeTruthy();
    const text = await response.text();
    expect(text.toLowerCase()).toContain('user-agent: *');
    expect(text).toContain('Sitemap: https://ironix.app/sitemap.xml');
  });

  test('serves valid sitemap.xml with 19 locale entries', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.ok()).toBeTruthy();
    const text = await response.text();
    expect(text).toContain('<urlset');
    expect(text).toContain('https://ironix.app/en');
    expect(text).toContain('https://ironix.app/ar');
    expect(text).toContain('https://ironix.app/es');
    expect(text).toContain('https://ironix.app/de');
    expect(text).toContain('https://ironix.app/fr');
  });
});
