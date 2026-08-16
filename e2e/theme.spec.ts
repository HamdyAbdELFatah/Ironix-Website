import { test, expect } from '@playwright/test';

test.describe('Ironix Theme Mode Toggle', () => {
  test('toggles between dark and light themes', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    // Find theme toggle button in header
    const toggleButton = page.locator('[data-testid="theme-toggle"]').first();
    await expect(toggleButton).toBeVisible();

    const html = page.locator('html');

    // Initial theme is dark
    await expect(html).toHaveClass(/dark/);

    // Click to switch to light theme
    await toggleButton.click();
    // Wait for theme transition
    await expect(html).not.toHaveClass(/dark/);

    // Click again to return to dark theme
    await toggleButton.click();
    await expect(html).toHaveClass(/dark/);
  });
});
