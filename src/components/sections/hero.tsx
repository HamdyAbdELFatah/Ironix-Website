"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, ChevronRight, Languages, ShieldCheck, WifiOff } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { GetTheApp } from "@/components/shared/get-the-app";

const TOTAL_SETS = 4;

const PREVIEW_IMAGES = {
  en: {
    programs: "/assets/app-screenshots/programs-en.png",
    calculator: "/assets/app-screenshots/plate-calculator-en-dark.png",
  },
  ar: {
    programs: "/assets/app-screenshots/programs-ar.png",
    calculator: "/assets/app-screenshots/plate-calculator-ar.png",
  },
} as const;

function PreviewPhone({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`rounded-[2.6rem] border-[6px] border-neutral-900 bg-neutral-950 p-1.5 shadow-2xl shadow-black/30 ring-1 ring-black/15 ${className}`}
    >
      <div className="relative aspect-[411/891] overflow-hidden rounded-[2rem] bg-background">
        <Image
          src={src}
          alt={alt}
          width={411}
          height={891}
          priority={priority}
          sizes="(max-width: 640px) 68vw, 270px"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <span aria-hidden="true" className="absolute left-1/2 top-2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-neutral-950" />
    </div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const screenshots = useTranslations("screenshots");
  const locale = useLocale() === "ar" ? "ar" : "en";
  const shouldReduceMotion = useReducedMotion();
  const [completedSets, setCompletedSets] = React.useState(2);
  const images = PREVIEW_IMAGES[locale];

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
      className="relative overflow-hidden pt-28 pb-12 noise-overlay sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[26rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-amber-500/15 via-yellow-500/10 to-sky-500/10 blur-[120px]"
      />

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-4">
        <div className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-start">
          <motion.div
            {...reveal(0)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary sm:text-sm"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>{t("badge")}</span>
          </motion.div>

          <motion.h1
            {...reveal(0.05)}
            className="mb-5 text-balance text-4xl font-black leading-[1.12] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            {t("title")} <span className="text-ironix-gold-gradient block sm:inline">{t("titleAccent")}</span>
          </motion.h1>

          <motion.p
            {...reveal(0.15)}
            className="mb-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div {...reveal(0.25)} className="mb-7 flex w-full justify-center lg:justify-start">
            <GetTheApp section="hero" />
          </motion.div>

          <motion.ul
            {...reveal(0.35)}
            className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm font-semibold text-muted-foreground lg:justify-start"
          >
            <li className="flex items-center gap-2">
              <WifiOff className="h-4 w-4 text-amber-500" aria-hidden="true" />
              {t("points.offline")}
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              {t("points.free")}
            </li>
            <li className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-sky-500" aria-hidden="true" />
              {t("points.arabic")}
            </li>
          </motion.ul>
        </div>

        <div className="relative mx-auto h-[560px] w-full max-w-[520px] select-none sm:h-[620px] lg:col-span-6 lg:mx-0 lg:justify-self-end">
          <div
            aria-hidden="true"
            className="absolute inset-x-[8%] top-[12%] h-[70%] rounded-full bg-primary/15 blur-[90px]"
          />

          <PreviewPhone
            src={images.calculator}
            alt=""
            className="absolute end-0 top-[12%] z-0 w-[42%] rotate-[9deg] opacity-90 sm:w-[39%]"
          />
          <PreviewPhone
            src={images.programs}
            alt={screenshots("items.library.alt")}
            priority
            className="absolute left-1/2 top-[2%] z-10 w-[58%] -translate-x-1/2 sm:w-[54%]"
          />

          <div className="absolute bottom-4 start-0 z-20 w-[min(74%,300px)] rounded-2xl border border-border/80 bg-card/95 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:bottom-6 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold text-foreground">{t("mock.exercise")}</p>
                <p className="mt-0.5 text-xs font-semibold text-primary">
                  {t("mock.setOf", { current: completedSets, total: TOTAL_SETS })}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
                {t("mock.sampleData")}
              </span>
            </div>
            <div className="mb-3 flex gap-1.5" aria-hidden="true">
              {Array.from({ length: TOTAL_SETS }, (_, index) => (
                <span
                  key={index}
                  className={`h-1.5 flex-1 rounded-full ${index < completedSets ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setCompletedSets((current) => (current < TOTAL_SETS ? current + 1 : 1))}
              className="flex min-h-11 w-full items-center justify-between rounded-xl bg-neutral-950 px-3 text-start text-xs font-extrabold text-white transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400" aria-hidden="true" />
                {t("mock.logSet", { weight: 20, reps: 10 })}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 rtl:rotate-180" aria-hidden="true" />
            </button>
            <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
              {t("mock.savedOnPhone")}
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
