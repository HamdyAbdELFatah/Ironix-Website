import { describe, it, expect } from 'vitest';
import {
  generateSoftwareAppSchema,
  generateOrganizationSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from './structured-data';
import { APP_CONFIG } from '../utils/constants';

describe('Structured Data Generators (JSON-LD)', () => {
  it('builds SoftwareApplication offers from the catalogue and never claims a rating', () => {
    const schema = generateSoftwareAppSchema([
      { productId: 'premium_monthly', billingPeriod: 'P1M', displayPriceUsd: 4.99, hasTrial: false },
      { productId: 'premium_yearly', billingPeriod: 'P1Y', displayPriceUsd: 29.99, hasTrial: true },
    ]);
    expect(schema['@type']).toBe('SoftwareApplication');
    expect(schema.operatingSystem).toBe('iOS, Android');
    expect(schema.offers.map((o) => o.price)).toEqual(['0', '4.99', '29.99']);
    expect(JSON.stringify(schema)).not.toMatch(/aggregateRating|ratingValue|reviewCount/i);
  });

  it('still lists the free offer when the catalogue is unavailable', () => {
    expect(generateSoftwareAppSchema([]).offers).toHaveLength(1);
  });

  it('uses the configured support email for the organization', () => {
    const schema = generateOrganizationSchema();
    expect(schema.contactPoint.email).toBe(APP_CONFIG.support.email);
    expect(JSON.stringify(schema)).not.toContain('ironix.app');
  });

  it('generates valid FAQPage schema', () => {
    const schema = generateFAQSchema([{ question: 'Q?', answer: 'A.' }]);
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity[0].name).toBe('Q?');
  });

  it('generates valid BreadcrumbList schema', () => {
    const schema = generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/#features' },
    ]);
    expect(schema.itemListElement[1].position).toBe(2);
    expect(schema.itemListElement[0].item).toBe(`${APP_CONFIG.url}/`);
  });
});
