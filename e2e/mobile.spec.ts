import { test, expect } from '@playwright/test';

test.describe('Ironix Mobile Navigation & Drawer', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('opens mobile drawer sheet and navigates to section', async ({ page }) => {
    await page.goto('/en');

    // Find and click hamburger menu trigger
    const menuButton = page.getByRole('button', { name: /Open navigation menu/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Drawer should open displaying IRONIX brand title
    await expect(page.getByText('IRONIX', { exact: true }).first()).toBeVisible();

    // Nav links should be present inside drawer
    const featuresBtn = page.getByRole('button', { name: 'Features' }).last();
    await expect(featuresBtn).toBeVisible();

    // Store download badges should be present in mobile menu
    const appStoreBadge = page.getByRole('link', { name: /Download Ironix on Apple App Store/i }).last();
    await expect(appStoreBadge).toBeVisible();

    // Click link to scroll
    await featuresBtn.click();
    await expect(page.locator('#features')).toBeVisible();
  });
});
