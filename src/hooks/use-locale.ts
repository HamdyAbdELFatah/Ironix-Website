import { useLocale as useNextIntlLocale } from 'next-intl';
import { getLocaleDirection, isRtlLocale } from '../lib/utils/helpers';
import { localeNames, Locale } from '../i18n/config';

export function useLocale() {
  const locale = useNextIntlLocale() as Locale;
  const direction = getLocaleDirection(locale);
  const isRtl = isRtlLocale(locale);
  const localeName = localeNames[locale] || localeNames['en'];

  return { locale, direction, isRtl, localeName };
}
