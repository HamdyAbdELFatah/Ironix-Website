'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Check, X, Shield, Sparkles, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Comparison() {
  const t = useTranslations('comparison');

  const COMPARISON_FEATURES = [
    {
      name: t('features.offline'),
      category: 'Speed & Reliability',
      ironix: t('features.offlineIronix'),
      hevy: t('features.offlineHevy'),
      strong: t('features.offlineStrong'),
      appleFitness: false,
    },
    {
      name: t('features.anatomy3d'),
      category: 'Intelligence',
      ironix: true,
      hevy: t('features.anatomyHevy'),
      strong: false,
      appleFitness: false,
    },
    {
      name: t('features.aiCoach'),
      category: 'Intelligence',
      ironix: true,
      hevy: false,
      strong: false,
      appleFitness: t('features.aiCoachApple'),
    },
    {
      name: t('features.gymId'),
      category: 'Hardware & Ecosystem',
      ironix: true,
      hevy: false,
      strong: false,
      appleFitness: false,
    },
    {
      name: t('features.velocity'),
      category: 'Performance',
      ironix: true,
      hevy: false,
      strong: false,
      appleFitness: false,
    },
    {
      name: t('features.i18nRtl'),
      category: 'Accessibility',
      ironix: t('features.i18nIronix'),
      hevy: t('features.i18nHevy'),
      strong: t('features.i18nStrong'),
      appleFitness: t('features.i18nApple'),
    },
    {
      name: t('features.founderPass'),
      category: 'Pricing Transparency',
      ironix: t('features.founderIronix'),
      hevy: false,
      strong: false,
      appleFitness: false,
    },
  ];

  return (
    <section
      id="comparison"
      className="py-24 relative overflow-hidden bg-neutral-950 border-b border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest shadow-sm">
            <Award className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {t('title')} <span className="text-[#F9C023]">{t('titleAccent')}</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base md:text-lg">
            {t('subtitle')}
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto rounded-3xl border border-neutral-800 bg-neutral-900/60 shadow-2xl backdrop-blur-md">
          <table className="w-full text-left rtl:text-right border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/80">
                <th className="p-4 sm:p-5 text-xs font-black uppercase text-neutral-400 tracking-wider w-1/3">
                  {t('featureCol')}
                </th>
                <th className="p-4 sm:p-5 text-xs font-black uppercase text-amber-400 tracking-wider bg-amber-500/10 border-x border-amber-500/30 text-center w-1/5">
                  <div className="flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('ironixCol')}</span>
                  </div>
                </th>
                <th className="p-4 sm:p-5 text-xs font-bold uppercase text-neutral-400 tracking-wider text-center">
                  {t('hevyCol')}
                </th>
                <th className="p-4 sm:p-5 text-xs font-bold uppercase text-neutral-400 tracking-wider text-center">
                  {t('strongCol')}
                </th>
                <th className="p-4 sm:p-5 text-xs font-bold uppercase text-neutral-400 tracking-wider text-center">
                  {t('appleCol')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {COMPARISON_FEATURES.map((feature, idx) => (
                <tr
                  key={feature.name}
                  className={cn(
                    'transition-colors hover:bg-neutral-800/30',
                    idx % 2 === 0 ? 'bg-neutral-900/20' : 'bg-transparent'
                  )}
                >
                  {/* Feature Name */}
                  <td className="p-4 sm:p-5">
                    <span className="text-sm font-bold text-white block">
                      {feature.name}
                    </span>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">
                      {feature.category}
                    </span>
                  </td>

                  {/* Ironix Value (Highlighted) */}
                  <td className="p-4 sm:p-5 text-center bg-amber-500/5 border-x border-amber-500/20 font-bold">
                    {typeof feature.ironix === 'boolean' ? (
                      <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 mx-auto flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    ) : (
                      <span className="text-xs font-black text-amber-400 font-mono">
                        {feature.ironix}
                      </span>
                    )}
                  </td>

                  {/* Hevy */}
                  <td className="p-4 sm:p-5 text-center">
                    {typeof feature.hevy === 'boolean' ? (
                      feature.hevy ? (
                        <Check className="w-4 h-4 text-neutral-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-neutral-600 mx-auto" />
                      )
                    ) : (
                      <span className="text-xs text-neutral-400">{feature.hevy}</span>
                    )}
                  </td>

                  {/* Strong */}
                  <td className="p-4 sm:p-5 text-center">
                    {typeof feature.strong === 'boolean' ? (
                      feature.strong ? (
                        <Check className="w-4 h-4 text-neutral-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-neutral-600 mx-auto" />
                      )
                    ) : (
                      <span className="text-xs text-neutral-400">{feature.strong}</span>
                    )}
                  </td>

                  {/* Apple Fitness+ */}
                  <td className="p-4 sm:p-5 text-center">
                    {typeof feature.appleFitness === 'boolean' ? (
                      feature.appleFitness ? (
                        <Check className="w-4 h-4 text-neutral-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-neutral-600 mx-auto" />
                      )
                    ) : (
                      <span className="text-xs text-neutral-400">{feature.appleFitness}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 rounded-2xl p-4 sm:p-6 bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-900 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-sm font-black text-white">
                {t('ctaTitle')}
              </h4>
              <p className="text-xs text-neutral-400">
                {t('ctaSubtitle')}
              </p>
            </div>
          </div>

          <a
            href="#download"
            className="px-5 py-2.5 rounded-xl bg-[#F9C023] hover:bg-[#E0A800] text-neutral-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 active:scale-95 shrink-0"
          >
            {t('ctaButton')}
          </a>
        </div>
      </div>
    </section>
  );
}
