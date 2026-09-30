import { describe, it, expect } from 'vitest';
import { locales, rtlLocales, defaultLocale, localeNames } from './config';

describe('i18n Configuration', () => {
  it('uses English as the default locale', () => {
    expect(defaultLocale).toBe('en');
  });

  it('publishes only the fully translated locales', () => {
    expect([...locales]).toEqual(['en', 'ar']);
  });

  it('marks Arabic as RTL', () => {
    expect(rtlLocales).toEqual(['ar']);
  });

  it('has a display name for every locale', () => {
    locales.forEach((locale) => {
      expect(localeNames[locale].length).toBeGreaterThan(0);
    });
  });
});
