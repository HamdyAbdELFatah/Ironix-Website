import { getSupabasePublicConfig, supabaseHeaders } from '@/lib/supabase/public-config';

export type BillingPeriod = 'P1M' | 'P1Y' | 'LIFETIME';

export interface StoreProduct {
  productId: string;
  billingPeriod: BillingPeriod;
  displayPriceUsd: number;
  hasTrial: boolean;
}

interface StoreProductRow {
  product_id: string;
  billing_period: BillingPeriod;
  display_price_usd: number | string;
  has_trial: boolean;
}

/** Revalidate the catalogue every 5 minutes (ISR); prices change rarely. */
export const CATALOGUE_REVALIDATE_SECONDS = 300;

export function toStoreProducts(rows: unknown): StoreProduct[] {
  if (!Array.isArray(rows)) return [];
  return (rows as StoreProductRow[])
    .map((row) => ({
      productId: row.product_id,
      billingPeriod: row.billing_period,
      displayPriceUsd: Number(row.display_price_usd),
      hasTrial: Boolean(row.has_trial),
    }))
    .filter(
      (p) =>
        typeof p.productId === 'string' &&
        ['P1M', 'P1Y', 'LIFETIME'].includes(p.billingPeriod) &&
        Number.isFinite(p.displayPriceUsd) &&
        p.displayPriceUsd > 0
    );
}

/**
 * Active Pro products from Supabase `store_products`, the single source of
 * truth for the USD reference prices. Returns [] when the catalogue can't be
 * reached, and the page then shows the plans without numbers.
 */
export async function getStoreProducts(): Promise<StoreProduct[]> {
  const config = getSupabasePublicConfig();
  if (!config) return [];
  try {
    const res = await fetch(
      `${config.url}/rest/v1/store_products?select=product_id,billing_period,display_price_usd,has_trial&is_active=eq.true&order=sort_order.asc`,
      {
        headers: supabaseHeaders(config),
        next: { revalidate: CATALOGUE_REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(4000),
      }
    );
    if (!res.ok) return [];
    return toStoreProducts(await res.json());
  } catch {
    return [];
  }
}

export function formatUsd(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
