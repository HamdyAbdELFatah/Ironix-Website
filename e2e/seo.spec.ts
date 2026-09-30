import { test, expect } from '@playwright/test';

const SITE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'https://ironix-website.vercel.app';

test.describe('Ironix SEO & Metadata Endpoints', () => {
  test('serves robots.txt pointing at our own sitemap', async ({ request }) => {
    const text = await (await request.get('/robots.txt')).text();
    expect(text.toLowerCase()).toContain('user-agent: *');
    expect(text).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  });

  test('sitemap lists only the published locales on our own host', async ({ request }) => {
    const text = await (await request.get('/sitemap.xml')).text();
    expect(text).toContain(`${SITE}/en`);
    expect(text).toContain(`${SITE}/ar`);
    expect(text).not.toContain(`${SITE}/es`);
    expect(text).not.toContain('ironix.app');
  });

  test('home page JSON-LD carries no fabricated rating', async ({ page }) => {
    await page.goto('/en');
    const jsonLd = (await page.locator('script[type="application/ld+json"]').allTextContents()).join('\n');
    expect(jsonLd).toContain('SoftwareApplication');
    expect(jsonLd).not.toMatch(/aggregateRating|ratingValue|reviewCount/);
  });
});
