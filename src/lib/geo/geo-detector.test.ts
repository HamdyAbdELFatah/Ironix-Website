import { describe, it, expect } from 'vitest';
import { detectLocaleFromCountry, parseAcceptLanguage, detectBestLocale } from './geo-detector';

describe('Geolocation & Device Language Auto-Detection', () => {
  it('maps Arab countries to "ar"', () => {
    expect(detectLocaleFromCountry('SA')).toBe('ar');
    expect(detectLocaleFromCountry('AE')).toBe('ar');
    expect(detectLocaleFromCountry('EG')).toBe('ar');
    expect(detectLocaleFromCountry('kw')).toBe('ar');
  });

  it('maps English-speaking countries to "en"', () => {
    expect(detectLocaleFromCountry('US')).toBe('en');
    expect(detectLocaleFromCountry('GB')).toBe('en');
  });

  it('returns null for countries without a published locale', () => {
    expect(detectLocaleFromCountry('DE')).toBeNull();
    expect(detectLocaleFromCountry('XYZ')).toBeNull();
    expect(detectLocaleFromCountry(null)).toBeNull();
    expect(detectLocaleFromCountry('')).toBeNull();
  });

  it('picks the first published language from Accept-Language', () => {
    expect(parseAcceptLanguage('ar-EG,ar;q=0.9,en-US;q=0.8,en;q=0.7')).toBe('ar');
    expect(parseAcceptLanguage('fr-CA,fr;q=0.8,en;q=0.6')).toBe('en');
    expect(parseAcceptLanguage('de-DE,de;q=0.9')).toBeNull();
  });

  it('respects hierarchy: cookie > Arabic country > Accept-Language > country > default', () => {
    expect(detectBestLocale({ country: 'SA', acceptLanguage: 'ar-EG' }, 'en')).toBe('en');
    expect(detectBestLocale({ country: 'SA', acceptLanguage: 'en-US,en;q=0.9' }, null)).toBe('ar');
    expect(detectBestLocale({ country: 'US', acceptLanguage: 'ar,en;q=0.5' }, null)).toBe('ar');
    expect(detectBestLocale({ country: 'DE', acceptLanguage: 'de-DE' }, null)).toBe('en');
    expect(detectBestLocale({ country: null, acceptLanguage: null }, null)).toBe('en');
  });

  it('ignores a stale cookie for a locale that is no longer published', () => {
    expect(detectBestLocale({ country: 'US', acceptLanguage: 'en' }, 'de')).toBe('en');
  });
});
