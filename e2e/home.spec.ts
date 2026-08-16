import { test, expect } from '@playwright/test';

test.describe('Ironix Landing Page - Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
  });

  test('renders hero headline, brand title and download badges', async ({ page }) => {
    await expect(page).toHaveTitle(/Ironix/i);

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/Train with Purpose/i);

    const appStoreBadge = page.getByRole('link', { name: /Download Ironix on Apple App Store/i }).first();
    const googlePlayBadge = page.getByRole('link', { name: /Get Ironix on Google Play/i }).first();
    const appGalleryBadge = page.getByRole('link', { name: /Explore Ironix on Huawei AppGallery/i }).first();

    await expect(appStoreBadge).toBeVisible();
    await expect(appStoreBadge).toHaveAttribute('href', /apps\.apple\.com/);

    await expect(googlePlayBadge).toBeVisible();
    await expect(googlePlayBadge).toHaveAttribute('href', /play\.google\.com\/store\/apps\/details\?id=com\.ironix/);

    await expect(appGalleryBadge).toBeVisible();
    await expect(appGalleryBadge).toHaveAttribute('href', /appgallery\.huawei\.com/);
  });

  test('interacts with the live phone set logger mockup', async ({ page }) => {
    // Initial state shows Set 2 of 4
    await expect(page.getByText(/Set 2 of 4/i)).toBeVisible();

    const logButton = page.getByRole('button', { name: /Log Set/i });
    await expect(logButton).toBeVisible();

    // Click to log set -> increments to Set 3 of 4
    await logButton.click();
    await expect(page.getByText(/Set 3 of 4/i)).toBeVisible();
  });

  test('displays all 6 core features', async ({ page }) => {
    const featuresSection = page.locator('#features');
    await featuresSection.scrollIntoViewIfNeeded();
    await expect(featuresSection).toBeVisible();

    await expect(featuresSection.getByRole('heading', { name: 'Offline-First Logger' })).toBeVisible();
    await expect(featuresSection.getByRole('heading', { name: '3D Muscle Anatomy' })).toBeVisible();
    await expect(featuresSection.getByRole('heading', { name: 'AI Voice Coach' })).toBeVisible();
    await expect(featuresSection.getByRole('heading', { name: 'Digital GymID Pass' })).toBeVisible();
    await expect(featuresSection.getByRole('heading', { name: 'Gamification & Battlecards' })).toBeVisible();
    await expect(featuresSection.getByRole('heading', { name: '8 Premium Themes' })).toBeVisible();
  });

  test('switches tabs in the interactive showcase', async ({ page }) => {
    const showcaseSection = page.locator('#showcase');
    await showcaseSection.scrollIntoViewIfNeeded();
    await expect(showcaseSection).toBeVisible();

    // Switch to GymID Wallet tab
    const gymIdTab = page.getByRole('button', { name: /GymID Wallet/i });
    await gymIdTab.click();
    await expect(page.getByText(/IRONIX GYMID PASS/i)).toBeVisible();

    // Switch to AI Coach tab
    const coachTab = page.getByRole('button', { name: /AI Coach/i });
    await coachTab.click();
    await expect(page.getByText(/Choose Your Trainer's Voice/i)).toBeVisible();
  });

  test('expands and collapses FAQ accordion items', async ({ page }) => {
    const faqSection = page.locator('#faq');
    await faqSection.scrollIntoViewIfNeeded();
    await expect(faqSection).toBeVisible();

    const firstQuestion = faqSection.getByText(/Is Ironix really offline-first\?/i);
    await expect(firstQuestion).toBeVisible();
    await firstQuestion.click();

    await expect(page.getByText(/You can log your entire workout without an internet connection/i)).toBeVisible();
  });

  test('submits newsletter subscription form', async ({ page }) => {
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();

    const emailInput = page.getByPlaceholder(/athlete@example.com/i);
    await emailInput.fill('tester@ironix.app');

    const submitBtn = page.locator('footer form button[type="submit"]');
    await submitBtn.click();

    await expect(page.getByText(/Thank you! You are subscribed/i)).toBeVisible();
  });
});
