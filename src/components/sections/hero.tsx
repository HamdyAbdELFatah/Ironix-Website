"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CheckCircle2, ChevronRight, Flame, Languages, ShieldCheck, WifiOff, Wallet } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { GetTheApp } from "@/components/shared/get-the-app";
import { Badge } from "@/components/ui/badge";

const TOTAL_SETS = 4;
const TRAINED_DAYS = 4;

export function Hero() {
  const t = useTranslations("hero");
  const shouldReduceMotion = useReducedMotion();

  // Illustrative demo of the logger: labels are localized, numbers are sample values.
  const [completedSets, setCompletedSets] = React.useState(2);
  const [workoutStarted, setWorkoutStarted] = React.useState(false);
  const [restSeconds, setRestSeconds] = React.useState(60);

  React.useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => setRestSeconds((s) => (s > 1 ? s - 1 : 60)), 1000);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const weekdays = t("mock.weekdays").split(",");

  const reveal = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: "easeOut" as const },
        };

  return (
    <SectionWrapper
      sectionId="hero"
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 overflow-hidden noise-overlay"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[550px] bg-gradient-to-tr from-amber-500/20 via-yellow-600/15 to-blue-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start">
          <motion.div
            {...reveal(0)}
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-bold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>{t("badge")}</span>
          </motion.div>

          <motion.h1
            {...reveal(0.05)}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.1] mb-6 text-balance"
          >
            {t("title")} <span className="text-ironix-gold-gradient block sm:inline">{t("titleAccent")}</span>
          </motion.h1>

          <motion.p
            {...reveal(0.15)}
            className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div {...reveal(0.25)} className="w-full flex justify-center lg:justify-start mb-8">
            <GetTheApp section="hero" />
          </motion.div>

          <motion.ul
            {...reveal(0.35)}
            className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm font-semibold text-muted-foreground"
          >
            <li className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-amber-500" aria-hidden />
              {t("points.offline")}
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" aria-hidden />
              {t("points.free")}
            </li>
            <li className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-blue-500" aria-hidden />
              {t("points.arabic")}
            </li>
          </motion.ul>
        </div>

        {/* Phone mockup of the workout logger (decorative, sample data). */}
        <div className="lg:col-span-5 flex justify-center select-none py-6" aria-hidden>
          <div className="w-[300px] sm:w-[340px] rounded-[48px] p-3 bg-neutral-950 border-[3px] border-neutral-700/80 shadow-2xl shadow-black/60 relative">
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-10 border border-neutral-800" />

            <div className="rounded-[40px] bg-black text-white p-4 pt-12 flex flex-col gap-3.5 border border-neutral-900 min-h-[560px]">
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg overflow-hidden border border-amber-400/40 bg-neutral-950 flex items-center justify-center p-0.5">
                    <Image src="/assets/logo.png" alt="" width={28} height={28} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs font-bold text-neutral-300">{t("mock.greeting")}</span>
                </div>
                <Badge
                  variant="outline"
                  className="text-[9px] border-amber-500/40 text-amber-400 px-2 py-0.5 bg-amber-500/10 flex items-center gap-1"
                >
                  <WifiOff className="w-2.5 h-2.5" />
                  <span>{t("mock.offline")}</span>
                </Badge>
              </div>

              <div className="rounded-2xl p-3.5 bg-gradient-to-br from-neutral-900/95 to-neutral-950 border border-neutral-800 space-y-2.5">
                <span className="text-[10px] font-black text-amber-400 block">{t("mock.todaysWorkout")}</span>
                <h4 className="text-sm font-black">{t("mock.workoutName")}</h4>
                <span className="text-[10px] text-neutral-400 block">{t("mock.workoutMeta")}</span>
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setWorkoutStarted((v) => !v)}
                  className="w-full h-11 px-4 rounded-full bg-[#F9C023] text-black font-black text-xs flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
                >
                  <span>{workoutStarted ? t("mock.inProgress") : t("mock.start")}</span>
                  <span className="w-7 h-7 rounded-full bg-neutral-950 text-[#F9C023] flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 stroke-[3] rtl:rotate-180" />
                  </span>
                </button>
              </div>

              <div className="rounded-2xl p-3.5 bg-neutral-900/95 border border-amber-500/30 space-y-2.5">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[11px] font-bold">{t("mock.exercise")}</span>
                  <span className="text-[10px] text-amber-400 font-bold whitespace-nowrap">
                    {t("mock.setOf", { current: completedSets, total: TOTAL_SETS })}
                  </span>
                </div>
                <div className="w-full h-1.5 flex gap-1">
                  {Array.from({ length: TOTAL_SETS }, (_, i) => (
                    <div
                      key={i}
                      className={`h-full flex-1 rounded-full transition-colors duration-500 ${i < completedSets ? "bg-amber-400" : "bg-neutral-800"}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => {
                    setCompletedSets((n) => (n < TOTAL_SETS ? n + 1 : 1));
                    setRestSeconds(60);
                  }}
                  className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 font-extrabold text-[11px] border border-neutral-700 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t("mock.logSet", { weight: 20, reps: 10 })}</span>
                </button>
                <div className="flex items-center justify-between text-[9px] text-neutral-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3 h-3" /> {t("mock.savedOnPhone")}
                  </span>
                  <span className="text-amber-400">{t("mock.rest", { seconds: restSeconds })}</span>
                </div>
              </div>

              <div className="rounded-2xl p-3 bg-neutral-900/60 border border-neutral-800 space-y-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-neutral-300">{t("mock.thisWeek")}</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-amber-400" /> {t("mock.streak", { days: TRAINED_DAYS })}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  {weekdays.map((day, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div
                        className={`w-3.5 h-7 rounded-full flex items-center justify-center ${i < TRAINED_DAYS ? "bg-amber-400 text-neutral-950" : "bg-neutral-800"}`}
                      >
                        {i < TRAINED_DAYS && <CheckCircle2 className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                      <span className="text-[8px] font-bold text-neutral-400">{day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-2.5 bg-gradient-to-r from-amber-500/15 to-neutral-900 border border-amber-500/30 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-bold">{t("mock.gymPass")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
