'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, X, Check } from 'lucide-react';
import { locales, Locale } from '../../i18n/config';
import { detectLocaleFromCountry, parseAcceptLanguage } from '../../lib/geo/geo-detector';

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
  const [suggestedLocale, setSuggestedLocale] = useState<Locale | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('ironix_geo_banner_dismissed');
    if (dismissed) return;

    // Detect browser language
    if (typeof window !== 'undefined' && window.navigator) {
      const browserLang = parseAcceptLanguage(window.navigator.languages?.join(',') || window.navigator.language);
      
      if (browserLang && browserLang !== currentLocale && locales.includes(browserLang)) {
        setSuggestedLocale(browserLang);
        setIsVisible(true);
      }
    }
  }, [currentLocale]);

  if (!isVisible || !suggestedLocale) return null;
  const copy = BANNER_COPY[suggestedLocale];

  const handleSwitch = () => {
    // Save preference cookie
    document.cookie = `NEXT_LOCALE=${suggestedLocale}; path=/; max-age=31536000; SameSite=Lax`;
    sessionStorage.setItem('ironix_geo_banner_dismissed', 'true');
    setIsVisible(false);

    // Switch URL locale prefix
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    router.push(`/${suggestedLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`);
  };

  const handleDismiss = () => {
    sessionStorage.setItem('ironix_geo_banner_dismissed', 'true');
    setIsVisible(false);
  };

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-300"
      id="geo-language-banner"
    >
      <div className="rounded-2xl p-3.5 sm:p-4 bg-neutral-950/90 backdrop-blur-xl border border-amber-500/30 shadow-2xl shadow-black/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3" lang={suggestedLocale} dir={suggestedLocale === 'ar' ? 'rtl' : 'ltr'}>
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div className="text-left rtl:text-right">
            <p className="text-xs font-bold text-white leading-tight">{copy.question}</p>
            <p className="text-[10px] text-neutral-400 mt-0.5">{copy.detail}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleSwitch}
            className="px-3 py-1.5 rounded-xl bg-[#F9C023] hover:bg-[#E0A800] text-neutral-950 text-xs font-black transition-all active:scale-95 shadow-md shadow-amber-500/20 flex items-center gap-1 cursor-pointer"
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
