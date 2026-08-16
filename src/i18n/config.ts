export const locales = ['en','ar','es','fr','de','zh','ja','pt','ru','hi','tr','id','ko','it','nl','pl','th','vi','uk'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const rtlLocales: Locale[] = ['ar'];
export const localeNames: Record<Locale, string> = {
  en: 'English', ar: 'العربية', es: 'Español', fr: 'Français', de: 'Deutsch',
  zh: '中文', ja: '日本語', pt: 'Português', ru: 'Русский', hi: 'हिन्दी',
  tr: 'Türkçe', id: 'Bahasa Indonesia', ko: '한국어', it: 'Italiano', nl: 'Nederlands',
  pl: 'Polski', th: 'ไทย', vi: 'Tiếng Việt', uk: 'Українська'
};
