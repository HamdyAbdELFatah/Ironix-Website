'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, X, Check } from 'lucide-react';
import { locales, Locale } from '../../i18n/config';
import { parseAcceptLanguage } from '../../lib/geo/geo-detector';

// Written in the *suggested* language, since that is the one the visitor reads.
const BANNER_COPY: Record<Locale, { question: string; detail: string; switch: string; dismiss: string }> = {
  en: {
    question: 'View this site in English?',
    detail: 'Your device language is set to English.',
    switch: 'Switch',
    dismiss: 'Dismiss language suggestion',
  },
  ar: {
    question: 'عرض الموقع بالعربية؟',
    detail: 'لغة جهازك مضبوطة على العربية.',
    switch: 'تبديل',
    dismiss: 'إخفاء اقتراح اللغة',
  },
};

interface GeoLanguageBannerProps {
  currentLocale: Locale;
}

export function GeoLanguageBanner({ currentLocale }: GeoLanguageBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const suggestedLocale = useSyncExternalStore(
    () => () => {},
    () => {
      if (sessionStorage.getItem('ironix_geo_banner_dismissed')) return null;
      const browserLang = parseAcceptLanguage(window.navigator.languages?.join(',') || window.navigator.language);
      return browserLang && browserLang !== currentLocale && locales.includes(browserLang) ? browserLang : null;
    },
    () => null
  );

  if (dismissed || !suggestedLocale) return null;
  const copy = BANNER_COPY[suggestedLocale];

  const handleSwitch = () => {
    // Save preference cookie
    document.cookie = `NEXT_LOCALE=${suggestedLocale}; path=/; max-age=31536000; SameSite=Lax`;
    sessionStorage.setItem('ironix_geo_banner_dismissed', 'true');
    setDismissed(true);

    // Switch URL locale prefix
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    router.push(`/${suggestedLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`);
  };

  const handleDismiss = () => {
    sessionStorage.setItem('ironix_geo_banner_dismissed', 'true');
    setDismissed(true);
  };

  return (
    <div
      className="geo-language-banner fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-50 w-[min(82vw,20rem)] animate-[geo-banner-enter_300ms_cubic-bezier(0.23,1,0.32,1)_both]"
      id="geo-language-banner"
    >
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/80 bg-card/95 p-3.5 text-card-foreground shadow-xl shadow-black/15 backdrop-blur-xl sm:p-4">
        <div className="flex items-center gap-3" lang={suggestedLocale} dir={suggestedLocale === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
            <Globe className="w-4 h-4" />
          </div>
          <div className="text-start">
            <p className="text-xs font-bold leading-tight text-card-foreground">{copy.question}</p>
            <p className="mt-0.5 hidden text-[10px] text-muted-foreground sm:block">{copy.detail}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleSwitch}
            className="flex min-h-10 cursor-pointer items-center gap-1 rounded-xl bg-primary px-3 py-1.5 text-xs font-black text-primary-foreground shadow-md shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105"
            id="geo-banner-switch-btn"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>{copy.switch}</span>
          </button>
          <button
            onClick={handleDismiss}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={copy.dismiss}
            id="geo-banner-dismiss-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
