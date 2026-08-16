'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Dumbbell,
  Flame,
  Activity,
  Zap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SplitOption {
  id: 'ppl' | 'upper_lower' | 'full_body' | 'arnold';
  nameKey: string;
  days: number;
  descKey: string;
  focusMuscles: string[];
  growthRate: string;
  setsPerWeek: number;
}

const SPLIT_OPTIONS: SplitOption[] = [
  {
    id: 'ppl',
    nameKey: 'splits.ppl.name',
    days: 6,
    descKey: 'splits.ppl.desc',
    focusMuscles: ['Chest', 'Lats', 'Quads', 'Delts', 'Triceps', 'Hamstrings'],
    growthRate: '+18.4%',
    setsPerWeek: 22,
  },
  {
    id: 'upper_lower',
    nameKey: 'splits.upper_lower.name',
    days: 4,
    descKey: 'splits.upper_lower.desc',
    focusMuscles: ['Chest', 'Back', 'Shoulders', 'Quads', 'Hamstrings', 'Core'],
    growthRate: '+15.2%',
    setsPerWeek: 18,
  },
  {
    id: 'full_body',
    nameKey: 'splits.full_body.name',
    days: 3,
    descKey: 'splits.full_body.desc',
    focusMuscles: ['Full Body Symmetry', 'Posterior Chain', 'Compound Core'],
    growthRate: '+12.8%',
    setsPerWeek: 15,
  },
  {
    id: 'arnold',
    nameKey: 'splits.arnold.name',
    days: 6,
    descKey: 'splits.arnold.desc',
    focusMuscles: ['Chest', 'Upper Back', 'Biceps', 'Triceps', 'Lateral Delts'],
    growthRate: '+21.0%',
    setsPerWeek: 26,
  },
];

export function SplitCalculator() {
  const t = useTranslations('splitCalculator');
  const [selectedSplit, setSelectedSplit] = useState<SplitOption>(SPLIT_OPTIONS[0]);
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [focusArea, setFocusArea] = useState<string>('Hypertrophy');

  // Dynamic calculations
  const experienceMultiplier =
    experienceLevel === 'beginner' ? 1.4 : experienceLevel === 'intermediate' ? 1.0 : 0.7;
  const projectedGainKg = (
    parseFloat(selectedSplit.growthRate.replace('+', '').replace('%', '')) *
    experienceMultiplier *
    0.8
  ).toFixed(1);

  return (
    <section
      id="split-calculator"
      className="py-24 relative overflow-hidden bg-neutral-950/60 border-t border-b border-neutral-900"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {t('title')} <span className="text-[#F9C023]">{t('titleAccent')}</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base md:text-lg">
            {t('subtitle')}
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (Left 6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* 1. Split Selection */}
            <div className="rounded-3xl p-6 bg-neutral-900/80 border border-neutral-800 shadow-xl space-y-4">
              <label className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Dumbbell className="w-4 h-4" />
                <span>{t('step1')}</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SPLIT_OPTIONS.map((split) => {
                  const isSelected = selectedSplit.id === split.id;
                  const splitName = t(split.nameKey as any);
                  const splitDesc = t(split.descKey as any);

                  return (
                    <button
                      key={split.id}
                      onClick={() => setSelectedSplit(split)}
                      className={cn(
                        'p-4 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer relative overflow-hidden',
                        isSelected
                          ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/15'
                          : 'border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 hover:bg-neutral-800/40 text-neutral-300'
                      )}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className={cn('text-sm font-black', isSelected ? 'text-amber-400' : 'text-white')}>
                          {splitName}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 font-mono text-neutral-300">
                          {split.days} {t('daysPerWeek')}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                        {splitDesc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Experience Level */}
            <div className="rounded-3xl p-6 bg-neutral-900/80 border border-neutral-800 shadow-xl space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>{t('step2')}</span>
              </label>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => {
                  const isSelected = experienceLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => setExperienceLevel(lvl)}
                      className={cn(
                        'py-3 px-2 sm:px-4 rounded-xl border text-center transition-all cursor-pointer capitalize text-xs font-bold',
                        isSelected
                          ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300 shadow-md shadow-cyan-500/20'
                          : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700'
                      )}
                    >
                      {t(`levels.${lvl}` as any)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Primary Goal */}
            <div className="rounded-3xl p-6 bg-neutral-900/80 border border-neutral-800 shadow-xl space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Flame className="w-4 h-4" />
                <span>3. Primary Adaptation Target</span>
              </label>

              <div className="flex flex-wrap gap-2">
                {['Hypertrophy Mass', 'Powerlifting 1RM', 'Athletic Conditioning', 'Recomposition'].map((goal) => {
                  const isSelected = focusArea === goal;
                  return (
                    <button
                      key={goal}
                      onClick={() => setFocusArea(goal)}
                      className={cn(
                        'px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer',
                        isSelected
                          ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300 shadow-md shadow-emerald-500/20'
                          : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700'
                      )}
                    >
                      {goal}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-time Projections Card (Right 6 cols) */}
          <div className="lg:col-span-6 sticky top-28">
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 border border-amber-500/30 shadow-2xl shadow-black/80 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Title & Badge */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-amber-400 block">
                    {t('blueprintTitle')}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {t(selectedSplit.nameKey as any)} ({focusArea})
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black font-mono flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current" />
                  <span>{t('sqliteProof')}</span>
                </div>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80">
                  <span className="text-[10px] text-neutral-400 font-bold block uppercase">{t('weeklyVolume')}</span>
                  <span className="text-xl font-black text-amber-400 font-mono">
                    {Math.round(selectedSplit.setsPerWeek * experienceMultiplier)} Sets
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80">
                  <span className="text-[10px] text-neutral-400 font-bold block uppercase">Hypertrophy Index</span>
                  <span className="text-xl font-black text-emerald-400 font-mono">
                    {selectedSplit.growthRate}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-neutral-400 font-bold block uppercase">{t('gainTitle')}</span>
                  <span className="text-xl font-black text-cyan-400 font-mono">
                    +{projectedGainKg} kg
                  </span>
                </div>
              </div>

              {/* Primary Target Muscle Groups */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-neutral-300 block">
                  Optimized Biomechanical Stimulus:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSplit.focusMuscles.map((muscle) => (
                    <span
                      key={muscle}
                      className="text-xs px-2.5 py-1 rounded-lg bg-neutral-800/60 border border-neutral-700 text-neutral-200 font-medium flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-amber-400" />
                      <span>{muscle}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Projected Progression Curve Preview */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-2">
                <div className="flex justify-between text-xs text-neutral-400 font-medium">
                  <span>Week 1: Baseline Calibration</span>
                  <span className="text-amber-400 font-bold">Week 12: Peak Mechanical Tension</span>
                </div>
                <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-amber-400 h-full w-[35%] transition-all duration-500" />
                  <div className="bg-emerald-400 h-full w-[40%] transition-all duration-500" />
                  <div className="bg-cyan-400 h-full w-[25%] transition-all duration-500" />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-500">
                  <span>Neuromuscular Adapt (35%)</span>
                  <span>Hypertrophic Volume (40%)</span>
                  <span>1RM Overload (25%)</span>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="#download"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#F9C023] hover:bg-[#E0A800] text-neutral-950 font-black text-sm tracking-wider uppercase transition-all shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <span>{t('ctaPlan')}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </a>

              <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Free Core Engine</span>
                </span>
                <span>•</span>
                <span>No Account Required to Start</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
