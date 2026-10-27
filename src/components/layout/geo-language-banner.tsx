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
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-500/30 bg-neutral-950/95 p-3.5 shadow-xl shadow-black/35 backdrop-blur-xl sm:p-4">
        <div className="flex items-center gap-3" lang={suggestedLocale} dir={suggestedLocale === 'ar' ? 'rtl' : 'ltr'}>
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div className="text-start">
            <p className="text-xs font-bold text-white leading-tight">{copy.question}</p>
            <p className="mt-0.5 hidden text-[10px] text-neutral-400 sm:block">{copy.detail}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleSwitch}
            className="flex cursor-pointer items-center gap-1 rounded-xl bg-[#F9C023] px-3 py-1.5 text-xs font-black text-neutral-950 shadow-md shadow-amber-500/20 transition-colors hover:bg-[#E0A800]"
            id="geo-banner-switch-btn"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>{copy.switch}</span>
          </button>
          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
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
