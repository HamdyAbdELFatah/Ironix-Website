import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { formatUsd, getStoreProducts, toStoreProducts } from './catalogue';

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://project.supabase.co');
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'anon-key');
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('toStoreProducts', () => {
  it('maps rows and drops malformed ones', () => {
    expect(
      toStoreProducts([
        { product_id: 'premium_monthly', billing_period: 'P1M', display_price_usd: '4.99', has_trial: false },
        { product_id: 'premium_yearly', billing_period: 'P1Y', display_price_usd: 29.99, has_trial: true },
        { product_id: 'broken', billing_period: 'WEEKLY', display_price_usd: 1, has_trial: false },
        { product_id: 'free', billing_period: 'P1M', display_price_usd: 0, has_trial: false },
      ])
    ).toEqual([
      { productId: 'premium_monthly', billingPeriod: 'P1M', displayPriceUsd: 4.99, hasTrial: false },
      { productId: 'premium_yearly', billingPeriod: 'P1Y', displayPriceUsd: 29.99, hasTrial: true },
    ]);
    expect(toStoreProducts(null)).toEqual([]);
  });
});

describe('getStoreProducts', () => {
  it('reads active products in order with ISR caching', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([{ product_id: 'premium_lifetime', billing_period: 'LIFETIME', display_price_usd: 79.99, has_trial: false }]))
    );
    vi.stubGlobal('fetch', fetchMock);
    expect(await getStoreProducts()).toEqual([
      { productId: 'premium_lifetime', billingPeriod: 'LIFETIME', displayPriceUsd: 79.99, hasTrial: false },
    ]);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toContain('/rest/v1/store_products?');
    expect(url).toContain('is_active=eq.true');
    expect(init.next).toEqual({ revalidate: 300 });
  });

  it('returns an empty catalogue on failure instead of throwing', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('down')));
    expect(await getStoreProducts()).toEqual([]);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('nope', { status: 500 })));
    expect(await getStoreProducts()).toEqual([]);
  });
});

describe('formatUsd', () => {
  it('always shows two decimals', () => {
    expect(formatUsd(4.99)).toBe('$4.99');
    expect(formatUsd(30)).toBe('$30.00');
  });
});
