import { Metadata } from 'next';
import { locales } from '../../i18n/config';
import { APP_CONFIG } from '../utils/constants';

export function generateLocalizedMetadata(
  locale: string,
  page: 'home' | 'privacy' | 'terms',
  translations: (key: string) => string
): Metadata {
  const title = translations(`${page}.metadata.title`) || APP_CONFIG.name;
  const description = translations(`${page}.metadata.description`) || APP_CONFIG.description;
  const PAGE_PATHS = { home: '', privacy: '/privacy-policy', terms: '/terms-of-service' } as const;
  const pathSuffix = PAGE_PATHS[page];
  
  // hreflang alternates for every published locale + x-default
  const languages: Record<string, string> = {
    'x-default': `${APP_CONFIG.url}/en${pathSuffix}`,
  };

  locales.forEach(l => {
    languages[l] = `${APP_CONFIG.url}/${l}${pathSuffix}`;
  });

  // OpenGraph alternates for all non-current locales
  const alternateLocales = locales.filter(l => l !== locale);

  return {
    title,
    description,
    keywords:
      locale === 'ar'
        ? ['آيرونكس', 'تطبيق تمارين', 'متتبع تمارين الجيم', 'تسجيل التمارين دون إنترنت', 'تعافي العضلات', 'بطاقة النادي الرقمية']
        : ['Ironix', 'workout tracker', 'gym log', 'offline workout tracker', 'muscle recovery', 'digital gym pass', 'Arabic workout app'],
    authors: [{ name: APP_CONFIG.name, url: APP_CONFIG.url }],
    creator: APP_CONFIG.name,
    publisher: APP_CONFIG.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(APP_CONFIG.url),
    alternates: {
      canonical: `${APP_CONFIG.url}/${locale}${pathSuffix}`,
      languages
    },
    openGraph: {
      title,
      description,
      url: `${APP_CONFIG.url}/${locale}${pathSuffix}`,
      siteName: APP_CONFIG.name,
      images: [
        {
          url: `${APP_CONFIG.url}/assets/logo.png`,
          width: 1024,
          height: 1024,
          alt: APP_CONFIG.name
        }
      ],
      locale,
      alternateLocale: alternateLocales,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${APP_CONFIG.url}/assets/logo.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'application-name': APP_CONFIG.name,
      'msapplication-TileColor': '#0A0A0A',
    }
  };
}
