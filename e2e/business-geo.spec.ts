import { test, expect } from '@playwright/test';

test.describe('Geo & device-language detection', () => {
  test('redirects "/" to Arabic for visitors from an Arab country', async ({ browser }) => {
    const context = await browser.newContext({ extraHTTPHeaders: { 'x-vercel-ip-country': 'SA' } });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/ar/);
    await context.close();
  });

  test('redirects "/" to Arabic when the device language is Arabic', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'ar-EG', extraHTTPHeaders: { 'Accept-Language': 'ar-EG,ar;q=0.9' } });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/ar/);
    await context.close();
  });

  test('falls back to English for languages the site does not publish', async ({ browser }) => {
    const context = await browser.newContext({
      locale: 'de-DE',
      extraHTTPHeaders: { 'Accept-Language': 'de-DE,de;q=0.9', 'x-vercel-ip-country': 'DE' },
    });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/en/);
    await context.close();
  });
});
