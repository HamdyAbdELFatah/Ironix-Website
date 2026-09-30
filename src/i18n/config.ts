// Only languages whose marketing *and* legal copy are fully translated are
// published. Add a locale here only together with a complete message file.
export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const rtlLocales: Locale[] = ['ar'];
export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
};
