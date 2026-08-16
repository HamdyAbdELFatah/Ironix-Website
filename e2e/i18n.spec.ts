import { test, expect } from '@playwright/test';

test.describe('Ironix Multi-Language & RTL E2E Suite (19 Locales)', () => {
  test('renders Arabic locale with full RTL layout direction', async ({ page }) => {
    await page.goto('/ar');

    const dirElement = page.locator('[dir="rtl"]');
    await expect(dirElement).toBeVisible();

    const heading = page.locator('h1');
    await expect(heading).toContainText(/تدرّب بهدف/i);
    await expect(heading).toContainText(/وتقدّم بالأدلة/i);
  });

  test('renders Spanish locale (/es)', async ({ page }) => {
    await page.goto('/es');
    const heading = page.locator('h1');
    await expect(heading).toContainText(/Entrena con propósito/i);
  });

  test('renders German locale (/de)', async ({ page }) => {
    await page.goto('/de');
    const heading = page.locator('h1');
    await expect(heading).toContainText(/Trainiere mit Ziel/i);
  });

  test('renders French locale (/fr)', async ({ page }) => {
    await page.goto('/fr');
    const heading = page.locator('h1');
    await expect(heading).toContainText(/Entraînez-vous avec intention/i);
  });

  test('renders Chinese locale (/zh)', async ({ page }) => {
    await page.goto('/zh');
    const heading = page.locator('h1');
    await expect(heading).toContainText(/目标明确的训练/i);
  });

  test('renders Japanese locale (/ja)', async ({ page }) => {
    await page.goto('/ja');
    const heading = page.locator('h1');
    await expect(heading).toContainText(/目的を持って鍛え/i);
  });

  test('renders Portuguese locale (/pt)', async ({ page }) => {
    await page.goto('/pt');
    const heading = page.locator('h1');
    await expect(heading).toContainText(/Treine com propósito/i);
  });

  test('renders Russian locale (/ru)', async ({ page }) => {
    await page.goto('/ru');
    const heading = page.locator('h1');
    await expect(heading).toContainText(/Тренируйтесь с целью/i);
  });

  test('renders Korean locale (/ko)', async ({ page }) => {
    await page.goto('/ko');
    const heading = page.locator('h1');
    await expect(heading).toContainText(/목표를 갖고 훈련하고/i);
  });

  test('switches language using the navbar language switcher dropdown', async ({ page }) => {
    await page.goto('/en');

    // Open language dropdown
    const langBtn = page.locator('button[aria-label="Switch Language"]').first();
    await langBtn.click();

    // Select Spanish
    await page.click('div[role="menuitem"]:has-text("Español")');
    await expect(page).toHaveURL(/\/es/);
    await expect(page.locator('h1')).toContainText(/Entrena con propósito/i);
  });
});
