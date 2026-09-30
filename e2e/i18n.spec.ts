import { test, expect } from '@playwright/test';

test.describe('Ironix languages & RTL', () => {
  test('renders Arabic with RTL layout and Arabic copy', async ({ page }) => {
    await page.goto('/ar');
    await expect(page.locator('[dir="rtl"]').first()).toBeVisible();
    await expect(page.locator('h1')).toContainText('تدرّب بهدف');
    await expect(page.locator('#hero').getByRole('button', { name: 'أبلغني' })).toBeVisible();
  });

  test('unpublished locales are not served', async ({ page }) => {
    const response = await page.goto('/es');
    expect(response?.status()).toBe(404);
  });

  test('switches language from the navbar', async ({ page }) => {
    await page.goto('/en');
    await page.getByRole('button', { name: 'Change language' }).first().click();
    await page.getByRole('menuitem', { name: /العربية/ }).click();
    await expect(page).toHaveURL(/\/ar/);
    await expect(page.locator('h1')).toContainText('تدرّب بهدف');
  });
});
