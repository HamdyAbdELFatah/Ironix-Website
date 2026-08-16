'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Zap, Sparkles, Crown, Shield, HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Pricing() {
  const t = useTranslations('pricing');
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section
      id="pricing"
      className="py-24 relative overflow-hidden bg-neutral-950/80 border-b border-neutral-900"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest shadow-sm">
            <Crown className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {t('title')} <span className="text-[#F9C023]">{t('titleAccent')}</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base md:text-lg">
            {t('subtitle')}
          </p>

          {/* Billing Cycle Switcher */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={cn('text-xs font-bold transition-colors', !isAnnual ? 'text-white' : 'text-neutral-400')}>
              {t('monthly')}
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-7 rounded-full bg-neutral-900 border border-neutral-700 p-1 flex items-center transition-colors relative cursor-pointer"
              aria-label="Toggle annual or monthly billing"
            >
              <div
                className={cn(
                  'w-5 h-5 rounded-full bg-[#F9C023] transition-transform duration-200 shadow-md',
                  isAnnual ? 'translate-x-7' : 'translate-x-0'
                )}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={cn('text-xs font-bold transition-colors', isAnnual ? 'text-white' : 'text-neutral-400')}>
                {t('annual')}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950 font-black tracking-wider uppercase shadow-sm">
                {t('saveBadge')}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Tier 1: Core Free Edition */}
          <div className="rounded-3xl p-7 bg-neutral-900/60 border border-neutral-800 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black tracking-wider text-neutral-400">
                  {t('freeTier.badge')}
                </span>
                <h3 className="text-2xl font-black text-white">{t('freeTier.name')}</h3>
                <p className="text-xs text-neutral-400">
                  {t('freeTier.desc')}
                </p>
              </div>

              <div className="pt-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white font-mono">{t('freeTier.price')}</span>
                  <span className="text-xs text-neutral-400 font-bold">{t('freeTier.period')}</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-medium block mt-1">
                  ✓ Free on App Store & Google Play
                </span>
              </div>

              <div className="border-t border-neutral-800 pt-4 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                  Included Features:
                </span>
                {[
                  '100% Offline Room SQLite Local Database',
                  'Unlimited Workouts, Routines & Sets',
                  '100+ Exercise GIF & Video Demonstrations',
                  'Rest Timer with Dynamic Island Stopwatch',
                  'CSV / JSON Local Data Export',
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2 text-xs text-neutral-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#download"
              className="w-full py-3 px-4 rounded-xl border border-neutral-700 bg-neutral-800/80 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider text-center transition-all cursor-pointer"
            >
              {t('getStarted')}
            </a>
          </div>

          {/* Tier 2: Ironix Pro (Featured) */}
          <div className="rounded-3xl p-7 bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-neutral-950 border-2 border-amber-400 shadow-2xl shadow-amber-500/20 flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#F9C023] text-neutral-950 text-[10px] font-black tracking-widest uppercase shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-current" />
              <span>{t('proTier.badge')}</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black tracking-wider text-amber-400">
                  ADVANCED BIOMECHANICS
                </span>
                <h3 className="text-2xl font-black text-white">{t('proTier.name')}</h3>
                <p className="text-xs text-neutral-400">
                  {t('proTier.desc')}
                </p>
              </div>

              <div className="pt-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-amber-400 font-mono">
                    {isAnnual ? t('proTier.priceAnnual') : t('proTier.priceMonthly')}
                  </span>
                  <span className="text-xs text-neutral-400 font-bold">{t('proTier.period')}</span>
                </div>
                <span className="text-[11px] text-amber-400/80 font-medium block mt-1">
                  {isAnnual ? 'Billed annually ($39.99/year)' : 'Billed monthly ($4.99/month)'}
                </span>
              </div>

              <div className="border-t border-neutral-800 pt-4 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                  Everything in Free, plus:
                </span>
                {[
                  '3D Interactive Biomechanics & Muscle Fatigue Heatmap',
                  'Multi-Persona Audio AI Voice Gym Coach',
                  'Accelerometer Barbell Rep Velocity Tracker',
                  'GymID Apple Wallet & Wear OS NFC Pass',
                  'Cloud Backup & Multi-Device Live Sync',
                  '1RM Strength Progression Estimator',
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2 text-xs text-neutral-200 font-medium">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#download"
              className="w-full py-3.5 px-4 rounded-xl bg-[#F9C023] hover:bg-[#E0A800] text-neutral-950 font-black text-xs uppercase tracking-wider text-center transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{t('startTrial')}</span>
            </a>
          </div>

          {/* Tier 3: Lifetime Founder Pass */}
          <div className="rounded-3xl p-7 bg-neutral-900/60 border border-neutral-800 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black tracking-wider text-cyan-400">
                  LIFETIME ACCESS
                </span>
                <h3 className="text-2xl font-black text-white">{t('founderTier.name')}</h3>
                <p className="text-xs text-neutral-400">
                  {t('founderTier.desc')}
                </p>
              </div>

              <div className="pt-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white font-mono">{t('founderTier.price')}</span>
                  <span className="text-xs text-neutral-400 font-bold">{t('founderTier.period')}</span>
                </div>
                <span className="text-[11px] text-cyan-400 font-medium block mt-1">
                  ✓ Lifetime VIP Status & Badge
                </span>
              </div>

              <div className="border-t border-neutral-800 pt-4 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block">
                  Exclusive Founder Perks:
                </span>
                {[
                  'Lifetime Access to All Current & Future Pro Features',
                  'Exclusive Gold Founder Badge on GymID & Profile',
                  'Priority Direct Channel to Development Team',
                  'Early Beta Access to New 3D Anatomy Engines',
                  'No Future Price Increases or Renewal Fees',
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2 text-xs text-neutral-300">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#download"
              className="w-full py-3 px-4 rounded-xl border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-bold text-xs uppercase tracking-wider text-center transition-all cursor-pointer"
            >
              {t('getFounder')}
            </a>
          </div>
        </div>

        {/* Guarantees & Trust Banner */}
        <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>30-Day Money-Back Guarantee</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-amber-400" />
            <span>Cancel Anytime via App Store / Google Play</span>
          </span>
          <span>•</span>
          <span>Encrypted Local SQLite Storage</span>
        </div>
      </div>
    </section>
  );
}
