import { describe, it, expect } from 'vitest';
import {
  detectLocaleFromCountry,
  parseAcceptLanguage,
  detectBestLocale,
  COUNTRY_TO_LOCALE_MAP
} from './geo-detector';

describe('Geolocation & Device Language Auto-Detection', () => {
  it('maps Arab countries to "ar"', () => {
    expect(detectLocaleFromCountry('SA')).toBe('ar');
    expect(detectLocaleFromCountry('AE')).toBe('ar');
    expect(detectLocaleFromCountry('EG')).toBe('ar');
    expect(detectLocaleFromCountry('kw')).toBe('ar');
  });

  it('maps Hispanic countries to "es"', () => {
    expect(detectLocaleFromCountry('ES')).toBe('es');
    expect(detectLocaleFromCountry('MX')).toBe('es');
    expect(detectLocaleFromCountry('AR')).toBe('es');
  });

  it('maps Francophone countries to "fr"', () => {
    expect(detectLocaleFromCountry('FR')).toBe('fr');
    expect(detectLocaleFromCountry('SN')).toBe('fr');
  });

  it('maps DACH countries to "de"', () => {
    expect(detectLocaleFromCountry('DE')).toBe('de');
    expect(detectLocaleFromCountry('AT')).toBe('de');
  });

  it('returns null for unknown country codes', () => {
    expect(detectLocaleFromCountry('XYZ')).toBeNull();
    expect(detectLocaleFromCountry(null)).toBeNull();
    expect(detectLocaleFromCountry('')).toBeNull();
  });

  it('parses complex Accept-Language headers with weighted priorities', () => {
    expect(parseAcceptLanguage('fr-CA,fr;q=0.8,en;q=0.6')).toBe('fr');
    expect(parseAcceptLanguage('ar-EG,ar;q=0.9,en-US;q=0.8,en;q=0.7')).toBe('ar');
    expect(parseAcceptLanguage('de-DE,de;q=0.9,en;q=0.5')).toBe('de');
    expect(parseAcceptLanguage('es-MX,es;q=0.9,en;q=0.8')).toBe('es');
    expect(parseAcceptLanguage('zh-CN,zh;q=0.9,en;q=0.8')).toBe('zh');
  });

  it('respects hierarchy: User Cookie > Non-English Country > Accept-Language > Country Fallback > Default', () => {
    // Case 1: User has manual cookie override "de", even if IP is in Saudi Arabia
    expect(
      detectBestLocale({ country: 'SA', acceptLanguage: 'ar-EG' }, 'de')
    ).toBe('de');

    // Case 2: Specific localized country header (SA) overrides default English browser accept-language
    expect(
      detectBestLocale({ country: 'SA', acceptLanguage: 'en-US,en;q=0.9' }, null)
    ).toBe('ar');

    // Case 3: Specific localized country header (ES) overrides default English browser accept-language
    expect(
      detectBestLocale({ country: 'ES', acceptLanguage: 'en-US,en;q=0.9' }, null)
    ).toBe('es');

    // Case 4: US country or no country, German Accept-Language header activates "de"
    expect(
      detectBestLocale({ country: 'US', acceptLanguage: 'de-DE,de;q=0.9,en;q=0.5' }, null)
    ).toBe('de');

    // Case 5: No signals provided, falls back to default "en"
    expect(
      detectBestLocale({ country: null, acceptLanguage: null }, null)
    ).toBe('en');
  });
});
