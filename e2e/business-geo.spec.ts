import { test, expect } from '@playwright/test';

test.describe('Ironix Business Growth, Geo-Detection & SEO E2E Suite', () => {
  test('redirects root "/" to Arabic ("/ar") when Arab country header is present', async ({ browser }) => {
    const context = await browser.newContext({
      extraHTTPHeaders: {
        'x-vercel-ip-country': 'SA',
      },
    });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/ar/);
    await expect(page.locator('[dir="rtl"]')).toBeVisible();
    await context.close();
  });

  test('redirects root "/" to Spanish ("/es") when Hispanic country header is present', async ({ browser }) => {
    const context = await browser.newContext({
      extraHTTPHeaders: {
        'x-vercel-ip-country': 'ES',
      },
    });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/es/);
    await context.close();
  });

  test('redirects root "/" to German ("/de") based on device locale and Accept-Language', async ({ browser }) => {
    const context = await browser.newContext({
      locale: 'de-DE',
      extraHTTPHeaders: {
        'Accept-Language': 'de-DE,de;q=0.9',
      },
    });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/de/);
    await context.close();
  });

  test('interacts with the AI Split & Hypertrophy Calculator', async ({ page }) => {
    await page.goto('/en');

    const splitSection = page.locator('#split-calculator');
    await expect(splitSection).toBeVisible();

    // Click Upper / Lower split
    await page.click('button:has-text("Upper / Lower")');
    await expect(splitSection).toContainText('Upper / Lower');

    // Click Arnold split
    await page.click('button:has-text("Arnold Mass Split")');
    await expect(splitSection).toContainText('Arnold Mass Split');

    // Click beginner experience level
    await page.click('button:has-text("beginner")');
    await expect(splitSection).toContainText(/Projected Biometric Blueprint/i);
  });

  test('toggles pricing annual/monthly cycles and verifies savings badge', async ({ page }) => {
    await page.goto('/en');

    const pricingSection = page.locator('#pricing');
    await expect(pricingSection).toBeVisible();
    await expect(pricingSection).toContainText('Core Free');
    await expect(pricingSection).toContainText('Ironix Pro');
    await expect(pricingSection).toContainText('Founder Pass');

    // Toggle billing cycle
    const toggleBtn = pricingSection.locator('button[aria-label="Toggle annual or monthly billing"]');
    await toggleBtn.click();
    await expect(pricingSection).toContainText('$4.99');

    // Toggle back to annual
    await toggleBtn.click();
    await expect(pricingSection).toContainText('$3.33');
    await expect(pricingSection).toContainText('Save 42%');
  });

  test('verifies competitive comparison matrix table', async ({ page }) => {
    await page.goto('/en');

    const comparisonSection = page.locator('#comparison');
    await expect(comparisonSection).toBeVisible();
    await expect(comparisonSection).toContainText('0ms Latency (Room DB)');
    await expect(comparisonSection).toContainText('Why Serious Athletes Choose Ironix');
  });

  test('verifies rich JSON-LD structured data graph and GEO meta tags', async ({ page }) => {
    await page.goto('/en');

    // Check JSON-LD scripts
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();
    expect(count).toBeGreaterThanOrEqual(3);

    // Verify presence of SoftwareApplication and AggregateRating
    const allJsonTexts = await jsonLdScripts.allInnerTexts();
    const combined = allJsonTexts.join(' ');
    expect(combined).toContain('SoftwareApplication');
    expect(combined).toContain('AggregateRating');
    expect(combined).toContain('128400');
    expect(combined).toContain('Product');
  });
});
