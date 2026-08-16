import { Metadata } from 'next';
import { locales, defaultLocale, Locale } from '../../i18n/config';
import { APP_CONFIG } from '../utils/constants';

export function generateLocalizedMetadata(
  locale: string,
  page: 'home' | 'privacy' | 'terms',
  translations: any
): Metadata {
  const title = translations(`${page}.metadata.title`) || APP_CONFIG.name;
  const description = translations(`${page}.metadata.description`) || APP_CONFIG.description;
  const pathSuffix = page === 'home' ? '' : `/${page}`;
  
  // 19 language hreflang alternates + x-default
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
    keywords: [
      'Ironix',
      'Workout OS',
      'Offline Workout Tracker',
      'Room SQLite Fitness App',
      '3D Muscle Biomechanics Heatmap',
      'AI Gym Voice Coach',
      'Barbell Velocity Tracker',
      'GymID Wallet Pass',
      'Hypertrophy Training Log',
      'Powerlifting Tracker 0ms Latency',
      'Progressive Overload 1RM',
      'NFC Gym Pass',
      'Best Gym App Android iOS HarmonyOS'
    ],
    authors: [{ name: 'Ironix Systems', url: APP_CONFIG.url }],
    creator: 'Ironix Systems',
    publisher: 'Ironix Systems',
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
          alt: `${APP_CONFIG.name} - Offline Workout OS & 3D Biomechanics`
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
      creator: '@ironix_app'
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
      'geo.region': 'US',
      'geo.placename': 'Global Workout Tracking',
      'geo.position': '37.7749;-122.4194',
      'ICBM': '37.7749, -122.4194',
      'apple-itunes-app': 'app-id=6740000000',
      'google-play-app': 'app-id=com.ironix',
      'application-name': 'Ironix Workout OS',
      'msapplication-TileColor': '#0A0A0A',
    }
  };
}
