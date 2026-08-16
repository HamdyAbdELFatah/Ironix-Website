import { describe, it, expect } from 'vitest';
import {
  generateSoftwareAppSchema,
  generateOrganizationSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateProductSchema
} from './structured-data';

describe('Structured Data Generators (JSON-LD)', () => {
  it('generates valid SoftwareApplication schema with AggregateRating and offers', () => {
    const schema = generateSoftwareAppSchema();
    expect(schema['@type']).toBe('SoftwareApplication');
    expect(schema.name).toBe('Ironix');
    expect(schema.operatingSystem).toContain('iOS');
    expect(schema.operatingSystem).toContain('Android');
    expect(schema.aggregateRating.ratingValue).toBe('4.9');
    expect(schema.aggregateRating.ratingCount).toBe('128400');
    expect(schema.offers.length).toBe(3);
  });

  it('generates valid Organization schema with contactPoint and social links', () => {
    const schema = generateOrganizationSchema();
    expect(schema['@type']).toBe('Organization');
    expect(schema.name).toBe('Ironix');
    expect(schema.contactPoint.contactType).toBe('Customer Support');
    expect(schema.url).toBeDefined();
  });

  it('generates valid Product schema with price range', () => {
    const schema = generateProductSchema();
    expect(schema['@type']).toBe('Product');
    expect(schema.offers['@type']).toBe('AggregateOffer');
    expect(schema.offers.lowPrice).toBe('0');
    expect(schema.offers.highPrice).toBe('89.99');
  });

  it('generates valid FAQPage schema', () => {
    const items = [
      { question: 'Is Ironix 100% offline?', answer: 'Yes, it uses local Room SQLite.' }
    ];
    const schema = generateFAQSchema(items);
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity.length).toBe(1);
    expect(schema.mainEntity[0].name).toBe('Is Ironix 100% offline?');
  });

  it('generates valid BreadcrumbList schema', () => {
    const items = [
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/#features' }
    ];
    const schema = generateBreadcrumbSchema(items);
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement.length).toBe(2);
    expect(schema.itemListElement[0].position).toBe(1);
  });
});
