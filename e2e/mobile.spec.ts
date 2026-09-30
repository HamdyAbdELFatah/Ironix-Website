import { test, expect } from '@playwright/test';

test.describe('Ironix Mobile Navigation & Drawer', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('opens the drawer, shows the waitlist and navigates to a section', async ({ page }) => {
    await page.goto('/en');
    await page.getByRole('button', { name: /Open navigation menu/i }).click();

    const featuresBtn = page.getByRole('button', { name: 'Features' }).last();
    await expect(featuresBtn).toBeVisible();
    await expect(page.getByRole('dialog').getByRole('button', { name: /Notify me/i })).toBeVisible();

    await featuresBtn.click();
    await expect(page.locator('#features')).toBeVisible();
  });

  test('has no horizontal scroll at phone width', async ({ page }) => {
    await page.goto('/ar');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
