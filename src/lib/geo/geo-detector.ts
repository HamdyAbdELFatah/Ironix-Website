import { Locale, locales, defaultLocale } from '../../i18n/config';

// Country -> published locale. Countries not listed fall through to the
// browser language and then the default (en).
export const COUNTRY_TO_LOCALE_MAP: Record<string, Locale> = {
  // Arabic-speaking markets
  SA: 'ar', AE: 'ar', EG: 'ar', KW: 'ar', QA: 'ar', OM: 'ar', BH: 'ar',
  IQ: 'ar', JO: 'ar', LB: 'ar', MA: 'ar', DZ: 'ar', TN: 'ar', LY: 'ar',
  YE: 'ar', SD: 'ar', SY: 'ar', PS: 'ar', SO: 'ar', MR: 'ar',

  // English-dominant markets
  US: 'en', GB: 'en', CA: 'en', AU: 'en', NZ: 'en', IE: 'en', ZA: 'en',
};

/**
 * Extracts best matching locale from country code
 */
export function detectLocaleFromCountry(countryCode?: string | null): Locale | null {
  if (!countryCode) return null;
  const upper = countryCode.toUpperCase().trim();
  const matched = COUNTRY_TO_LOCALE_MAP[upper];
  if (matched && locales.includes(matched)) {
    return matched;
  }
  return null;
}

/**
 * Parses the HTTP Accept-Language header into ordered preferences
 */
export function parseAcceptLanguage(header?: string | null): Locale | null {
  if (!header) return null;

  try {
    const preferences = header
      .split(',')
      .map(part => {
        const [lang, qVal] = part.trim().split(';');
        const quality = qVal ? parseFloat(qVal.replace('q=', '')) : 1.0;
        const normalizedLang = lang.split('-')[0].toLowerCase() as Locale;
        return { lang: normalizedLang, quality };
      })
      .filter(item => !isNaN(item.quality))
      .sort((a, b) => b.quality - a.quality);

    for (const pref of preferences) {
      if (locales.includes(pref.lang)) {
        return pref.lang;
      }
    }
  } catch {
    // Fallback on parse failure
  }

  return null;
}

/**
 * Detects best locale given request headers
 * Precedence:
 * 1. Saved User Cookie Override (NEXT_LOCALE)
 * 2. Geolocation Country Header for Arabic-speaking markets (SA, EG, AE, ...)
 * 3. Browser / Device Accept-Language header
 * 4. Geolocation Country Header fallback (US, GB, etc.)
 * 5. Default Locale Fallback (en)
 */
export function detectBestLocale(
  headers: {
    country?: string | null;
    acceptLanguage?: string | null;
  },
  savedCookieLocale?: string | null
): Locale {
  // 1. Explicit user cookie preference always takes highest precedence
  if (savedCookieLocale && locales.includes(savedCookieLocale as Locale)) {
    return savedCookieLocale as Locale;
  }

  // 2. Specific localized country header (e.g. SA -> ar)
  const countryLocale = detectLocaleFromCountry(headers.country);
  if (countryLocale && countryLocale !== defaultLocale) {
    return countryLocale;
  }

  // 3. Browser / Device Accept-Language header (e.g. ar-EG, en-US)
  const browserLocale = parseAcceptLanguage(headers.acceptLanguage);
  if (browserLocale) {
    return browserLocale;
  }

  // 4. Country locale fallback (e.g. US, GB -> en)
  if (countryLocale) {
    return countryLocale;
  }

  // 5. Default fallback
  return defaultLocale;
}
