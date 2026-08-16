import { describe, it, expect } from 'vitest';
import { locales, rtlLocales, defaultLocale, localeNames } from './config';

describe('i18n Configuration', () => {
  it('includes English as default locale', () => {
    expect(defaultLocale).toBe('en');
    expect(locales).toContain('en');
  });

  it('includes Arabic in RTL locales', () => {
    expect(rtlLocales).toContain('ar');
    expect(locales).toContain('ar');
  });

  it('defines human-readable names for all 19 supported locales', () => {
    locales.forEach((locale) => {
      expect(localeNames[locale]).toBeDefined();
      expect(typeof localeNames[locale]).toBe('string');
      expect(localeNames[locale].length).toBeGreaterThan(0);
    });
  });

  it('has at least 19 locales supported', () => {
    expect(locales.length).toBeGreaterThanOrEqual(19);
  });
});
