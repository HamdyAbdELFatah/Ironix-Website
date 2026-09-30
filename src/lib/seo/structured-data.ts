import { APP_CONFIG } from '../utils/constants';
import type { StoreProduct } from '../pricing/catalogue';

/**
 * JSON-LD for search engines. Only verifiable facts go here: no ratings until
 * the app has real store ratings, and offers come from the same Supabase
 * catalogue the pricing section renders.
 */

const PERIOD_NAMES: Record<StoreProduct['billingPeriod'], string> = {
  P1M: 'Ironix Pro (monthly)',
  P1Y: 'Ironix Pro (yearly)',
  LIFETIME: 'Ironix Pro (lifetime)',
};

export function generateSoftwareAppSchema(products: StoreProduct[] = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: APP_CONFIG.name,
    operatingSystem: 'iOS, Android',
    applicationCategory: 'HealthApplication',
    applicationSubCategory: 'Workout tracker',
    description: APP_CONFIG.description,
    url: APP_CONFIG.url,
    image: `${APP_CONFIG.url}/assets/logo.png`,
    inLanguage: ['en', 'ar'],
    offers: [
      { '@type': 'Offer', name: 'Ironix Free', price: '0', priceCurrency: 'USD' },
      ...products.map((p) => ({
        '@type': 'Offer',
        name: PERIOD_NAMES[p.billingPeriod],
        price: p.displayPriceUsd.toFixed(2),
        priceCurrency: 'USD',
      })),
    ],
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: APP_CONFIG.name,
    url: APP_CONFIG.url,
    logo: `${APP_CONFIG.url}/assets/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: APP_CONFIG.support.email,
      contactType: 'Customer Support',
      availableLanguage: ['English', 'Arabic'],
    },
  };
}

export function generateFAQSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${APP_CONFIG.url}${item.url}`,
    })),
  };
}
