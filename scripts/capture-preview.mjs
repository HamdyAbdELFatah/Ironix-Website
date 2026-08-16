import { chromium } from '@playwright/test';
import path from 'path';

async function captureScreenshots() {
  const artifactDir = '/Users/mabuzaid/.gemini/antigravity/brain/db74bb43-4778-4b97-b88c-a61fdfaac53d';
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000/en...');
  await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle' });

  // 1. Dark Mode Hero Screenshot
  console.log('Capturing Hero Section...');
  const hero = page.locator('#hero');
  await hero.screenshot({
    path: path.join(artifactDir, 'screenshot_hero_dark.png'),
  });

  // 2. Full Page Dark Mode Screenshot
  console.log('Capturing Full Landing Page...');
  await page.screenshot({
    path: path.join(artifactDir, 'screenshot_full_page.png'),
    fullPage: true,
  });

  // 3. Interactive Showcase Section
  console.log('Capturing Interactive Showcase Section...');
  const showcase = page.locator('#showcase');
  await showcase.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await showcase.screenshot({
    path: path.join(artifactDir, 'screenshot_showcase.png'),
  });

  // 4. Arabic RTL Page Screenshot
  console.log('Navigating to Arabic RTL page http://localhost:3000/ar...');
  await page.goto('http://localhost:3000/ar', { waitUntil: 'networkidle' });
  const arabicHero = page.locator('#hero');
  await arabicHero.screenshot({
    path: path.join(artifactDir, 'screenshot_arabic_rtl.png'),
  });

  // 5. Mobile Viewport Screenshot (iPhone)
  console.log('Capturing Mobile Viewport...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle' });
  await page.screenshot({
    path: path.join(artifactDir, 'screenshot_mobile_hero.png'),
  });

  await browser.close();
  console.log('All screenshots captured successfully!');
}

captureScreenshots().catch(console.error);
