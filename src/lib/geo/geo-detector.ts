import { Locale, locales, defaultLocale } from '../../i18n/config';

// Comprehensive ISO 3166-1 alpha-2 country to supported Locale mapping
export const COUNTRY_TO_LOCALE_MAP: Record<string, Locale> = {
  // Middle East & North Africa (Arabic)
  SA: 'ar', AE: 'ar', EG: 'ar', KW: 'ar', QA: 'ar', OM: 'ar', BH: 'ar',
  IQ: 'ar', JO: 'ar', LB: 'ar', MA: 'ar', DZ: 'ar', TN: 'ar', LY: 'ar',
  YE: 'ar', SD: 'ar', SY: 'ar', PS: 'ar', SO: 'ar', MR: 'ar',

  // Hispanic / Latin America & Spain (Spanish)
  ES: 'es', MX: 'es', CO: 'es', AR: 'es', PE: 'es', VE: 'es', CL: 'es',
  GT: 'es', EC: 'es', CU: 'es', BO: 'es', DO: 'es', HN: 'es', PY: 'es',
  SV: 'es', NI: 'es', CR: 'es', PA: 'es', UY: 'es', PR: 'es', GQ: 'es',

  // France & Francophone (French)
  FR: 'fr', BE: 'fr', CH: 'fr', SN: 'fr', CI: 'fr', CM: 'fr', CD: 'fr',
  MG: 'fr', ML: 'fr', NE: 'fr', BF: 'fr', GN: 'fr', RW: 'fr', HT: 'fr',

  // DACH Region (German)
  DE: 'de', AT: 'de', LI: 'de',

  // Brazil, Portugal & Lusophone (Portuguese)
  BR: 'pt', PT: 'pt', AO: 'pt', MZ: 'pt', CV: 'pt', GW: 'pt',

  // Russia & CIS (Russian)
  RU: 'ru', KZ: 'ru', BY: 'ru', KG: 'ru', TJ: 'ru',

  // Greater China (Chinese)
  CN: 'zh', TW: 'zh', HK: 'zh', MO: 'zh', SG: 'zh',

  // Japan (Japanese)
  JP: 'ja',

  // South Korea (Korean)
  KR: 'ko',

  // Italy (Italian)
  IT: 'it', SM: 'it', VA: 'it',

  // Netherlands & Flanders (Dutch)
  NL: 'nl',

  // Poland (Polish)
  PL: 'pl',

  // Turkey (Turkish)
  TR: 'tr', CY: 'tr',

  // Indonesia (Indonesian)
  ID: 'id',

  // Thailand (Thai)
  TH: 'th',

  // Vietnam (Vietnamese)
  VN: 'vi',

  // Ukraine (Ukrainian)
  UA: 'uk',

  // India (Hindi)
  IN: 'hi',

  // English Dominant / Default
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
 * 2. Geolocation Country Header for localized non-English markets (SA, ES, FR, DE, etc.)
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

  // 2. Specific localized country header (e.g. SA -> ar, ES -> es, DE -> de)
  const countryLocale = detectLocaleFromCountry(headers.country);
  if (countryLocale && countryLocale !== defaultLocale) {
    return countryLocale;
  }

  // 3. Browser / Device Accept-Language header (e.g. de-DE, ar, fr)
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
