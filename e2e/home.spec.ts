import { test, expect } from '@playwright/test';

// Claims that must never reappear on the site (audit 2026-09-30).
const FORBIDDEN = [/2\.6M/, /50K\+/, /128,?400/, /AI Voice Coach/i, /Rep Velocity/i, /NFC/, /Money-Back/i, /ironix\.app/];

test.describe('Ironix Landing Page - Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
  });

  test('renders the hero with the waitlist while stores are not live', async ({ page }) => {
    await expect(page).toHaveTitle(/Ironix/i);
    await expect(page.locator('h1')).toContainText(/Train with purpose/i);
    await expect(page.locator('#hero').getByRole('button', { name: /Notify me/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /App Store|Google Play|AppGallery/i })).toHaveCount(0);
  });

  test('contains none of the removed marketing claims', async ({ page }) => {
    const text = await page.locator('body').innerText();
    for (const pattern of FORBIDDEN) expect(text).not.toMatch(pattern);
  });

  test('the phone mockup logger responds to taps', async ({ page }) => {
    await expect(page.getByText(/Set 2 of 4/i)).toBeVisible();
    await page.getByText(/Log set \(20 kg × 10\)/i).click();
    await expect(page.getByText(/Set 3 of 4/i)).toBeVisible();
  });

  test('lists the six shipped features', async ({ page }) => {
    const features = page.locator('#features');
    await features.scrollIntoViewIfNeeded();
    await expect(features.getByRole('listitem')).toHaveCount(6);
    await expect(features.getByRole('heading', { name: 'Offline workout logger' })).toBeVisible();
    await expect(features.getByRole('heading', { name: 'Muscle recovery map' })).toBeVisible();
  });

  test('shows Free and Pro plans', async ({ page }) => {
    const pricing = page.locator('#pricing');
    await pricing.scrollIntoViewIfNeeded();
    await expect(pricing.getByRole('heading', { name: 'Free' })).toBeVisible();
    await expect(pricing.getByRole('heading', { name: /Ironix Pro/ })).toBeVisible();
    await expect(pricing.getByText('Unlimited workout logging')).toBeVisible();
  });

  test('expands FAQ items', async ({ page }) => {
    const faq = page.locator('#faq');
    await faq.scrollIntoViewIfNeeded();
    await faq.getByText('Does Ironix work without internet?').click();
    await expect(page.getByText(/Every set you log is saved on your phone first/i)).toBeVisible();
  });

  test('rejects an invalid waitlist email without calling the server', async ({ page }) => {
    let rpcCalls = 0;
    await page.route('**/rest/v1/rpc/join_waitlist', (route) => {
      rpcCalls++;
      return route.fulfill({ json: { ok: true } });
    });
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await footer.getByRole('textbox').fill('not-an-email');
    await footer.getByRole('button', { name: /Notify me/i }).click();
    await expect(footer.getByText(/valid email address/i)).toBeVisible();
    expect(rpcCalls).toBe(0);
  });

  test('joins the waitlist', async ({ page }) => {
    let body: Record<string, unknown> | null = null;
    await page.route('**/rest/v1/rpc/join_waitlist', async (route) => {
      body = route.request().postDataJSON();
      await route.fulfill({ json: { ok: true } });
    });
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await footer.getByRole('textbox').fill('tester@example.com');
    await footer.getByRole('button', { name: /Notify me/i }).click();
    await expect(footer.getByText(/You are on the list/i)).toBeVisible();
    expect(body).toMatchObject({ p_email: 'tester@example.com', p_locale: 'en', p_source: 'footer' });
  });
});
