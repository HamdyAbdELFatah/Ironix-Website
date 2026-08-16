import { test, expect } from '@playwright/test';

test.describe('Ironix Legal & Policy Pages', () => {
  test('renders Privacy Policy page with all sections in English', async ({ page }) => {
    await page.goto('/en/privacy-policy');

    await expect(page).toHaveTitle(/Privacy Policy/i);
    await expect(page.locator('h1')).toContainText(/Privacy Policy/i);

    await expect(page.getByRole('heading', { name: /Information We Collect/i })).toBeVisible();

    await page.getByRole('link', { name: /Back to Home/i }).click();
    await expect(page).toHaveURL(/\/en$/);
  });

  test('renders Privacy Policy in Arabic with full RTL layout', async ({ page }) => {
    await page.goto('/ar/privacy-policy');

    const rtlContainer = page.locator('[dir="rtl"]');
    await expect(rtlContainer).toBeVisible();
    await expect(page.locator('h1')).toContainText(/سياسة الخصوصية/i);
  });

  test('renders Terms of Service page with all sections in English', async ({ page }) => {
    await page.goto('/en/terms-of-service');

    await expect(page).toHaveTitle(/Terms of Service/i);
    await expect(page.locator('h1')).toContainText(/Terms of Service/i);

    await expect(page.getByRole('heading', { name: /Acceptance/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Subscriptions/i })).toBeVisible();
  });

  test('renders Terms of Service in Arabic with full RTL layout', async ({ page }) => {
    await page.goto('/ar/terms-of-service');

    const rtlContainer = page.locator('[dir="rtl"]');
    await expect(rtlContainer).toBeVisible();
    await expect(page.locator('h1')).toContainText(/شروط الخدمة|شروط الاستخدام/i);
  });
});
