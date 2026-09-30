import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  if (!hasLocale(locales, locale)) {
    locale = defaultLocale;
  }

  let messages;
  try {
    messages = (await import(`./messages/${locale}.json`)).default;
  } catch {
    messages = (await import(`./messages/en.json`)).default;
  }

  return {
    locale,
    messages
  };
});
