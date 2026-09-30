'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Check, Crown } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { formatUsd, type StoreProduct } from '@/lib/pricing/catalogue';
import { cn } from '@/lib/utils';

interface PricingProps {
  /** Active Pro products from the Supabase catalogue (empty if unavailable). */
  products: StoreProduct[];
}

export function Pricing({ products }: PricingProps) {
  const t = useTranslations('pricing');
  const freeFeatures = t.raw('free.features') as string[];
  const proFeatures = t.raw('pro.features') as string[];

  return (
    <SectionWrapper sectionId="pricing">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight mb-4 text-balance">
          {t('title')}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch max-w-5xl mx-auto">
        <article className="rounded-3xl p-7 border border-border/80 bg-card/70 flex flex-col gap-6">
          <header className="space-y-2">
            <h3 className="text-2xl font-black text-foreground">{t('free.name')}</h3>
            <p className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-foreground tabular-nums">{t('free.price')}</span>
              <span className="text-sm text-muted-foreground font-semibold">{t('free.period')}</span>
            </p>
          </header>
          <FeatureList items={freeFeatures} tone="free" />
        </article>

        <article className="rounded-3xl p-7 border-2 border-amber-400 bg-card/90 shadow-2xl shadow-amber-500/10 flex flex-col gap-6">
          <header className="space-y-2">
            <h3 className="text-2xl font-black text-foreground flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" aria-hidden />
              {t('pro.name')}
            </h3>
          </header>

          {products.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {products.map((product) => (
                <li
                  key={product.productId}
                  className={cn(
                    'rounded-2xl border p-4 flex flex-col gap-1',
                    product.billingPeriod === 'P1Y'
                      ? 'border-amber-400 bg-amber-500/10'
                      : 'border-border/80 bg-background/40'
                  )}
                >
                  <span className="text-xs font-bold text-muted-foreground flex items-center justify-between gap-2">
                    {t(`plans.${product.billingPeriod}`)}
                    {product.billingPeriod === 'P1Y' && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950">
                        {t('bestValue')}
                      </span>
                    )}
                  </span>
                  <span className="text-2xl font-black text-foreground tabular-nums" dir="ltr">
                    {formatUsd(product.displayPriceUsd)}
                  </span>
                  <span className="text-xs text-muted-foreground">{t(`periods.${product.billingPeriod}`)}</span>
                  {product.hasTrial && (
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">{t('trial')}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">{t('unavailable')}</p>
          )}

          <FeatureList items={proFeatures} tone="pro" />
        </article>
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t('note')}</p>
    </SectionWrapper>
  );
}

function FeatureList({ items, tone }: { items: string[]; tone: 'free' | 'pro' }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/90">
          <Check
            className={cn('w-4 h-4 shrink-0 mt-0.5', tone === 'pro' ? 'text-amber-500' : 'text-emerald-500')}
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
