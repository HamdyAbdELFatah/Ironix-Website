"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Languages, ShieldCheck, WifiOff } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { GetTheApp } from "@/components/shared/get-the-app";

const PREVIEW_IMAGES = {
  en: "/assets/app-screenshots/programs-en.png",
  ar: "/assets/app-screenshots/programs-ar.png",
} as const;

export function Hero() {
  const t = useTranslations("hero");
  const screenshots = useTranslations("screenshots");
  const locale = useLocale() === "ar" ? "ar" : "en";
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, transform: "translateY(18px)" },
          animate: { opacity: 1, transform: "translateY(0)" },
          transition: { duration: 0.65, delay, ease: [0.23, 1, 0.32, 1] as const },
        };

  return (
    <SectionWrapper
      sectionId="hero"
      className="ironix-hero-field relative overflow-hidden pb-4 pt-28 sm:pb-10 sm:pt-36 lg:pb-14 lg:pt-40"
    >
      <div className="grid grid-cols-1 items-center gap-3 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-10 xl:gap-16">
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-start">
          <motion.div
            {...reveal(0)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-bold text-amber-800 dark:text-amber-300 sm:text-sm"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>{t("badge")}</span>
          </motion.div>

          <motion.h1
            {...reveal(0.07)}
            className="max-w-3xl text-balance text-[2.65rem] font-black leading-[1.2] tracking-tight text-foreground sm:text-6xl lg:text-5xl xl:text-6xl"
          >
            {t("title")}
            <span className="mt-1 block text-amber-700 dark:text-amber-400">{t("titleAccent")}</span>
          </motion.h1>

          <motion.p
            {...reveal(0.14)}
            className="mt-5 max-w-[35rem] text-pretty text-base leading-8 text-muted-foreground sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div {...reveal(0.22)} className="mt-7 w-full max-w-xl lg:mt-8">
            <GetTheApp section="hero" />
          </motion.div>

          <motion.ul
            {...reveal(0.3)}
            className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-3 text-xs font-semibold text-muted-foreground sm:text-sm lg:justify-start"
          >
            <li className="flex items-center gap-2">
              <WifiOff className="h-4 w-4 text-primary" aria-hidden="true" />
              {t("points.offline")}
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              {t("points.free")}
            </li>
            <li className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              {t("points.arabic")}
            </li>
          </motion.ul>
        </div>

        <motion.figure
          {...reveal(0.18)}
          className="relative mx-auto flex h-[38rem] w-full max-w-[34rem] select-none flex-col items-center justify-start pt-6 sm:h-[42rem] sm:pt-8 lg:h-[46rem] lg:max-w-none lg:justify-center lg:pt-0"
        >
          <div aria-hidden="true" className="hero-plate-orbit absolute left-1/2 top-[46%] aspect-square w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full" />
          <div aria-hidden="true" className="absolute left-1/2 top-[46%] aspect-square w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative w-[min(62vw,15.5rem)] rounded-[2.55rem] border-[6px] border-neutral-900 bg-neutral-950 p-1.5 shadow-[0_34px_80px_-28px_rgba(0,0,0,0.62)] ring-1 ring-black/25 sm:w-[17rem] lg:w-[18rem]">
            <div className="relative aspect-[411/891] overflow-hidden rounded-[2rem] bg-white">
              <Image
                src={PREVIEW_IMAGES[locale]}
                alt={screenshots("items.library.alt")}
                width={411}
                height={891}
                priority
                sizes="(max-width: 640px) 68vw, (max-width: 1024px) 288px, 304px"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <span aria-hidden="true" className="absolute left-1/2 top-2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-neutral-950" />
          </div>

          <figcaption className="relative mt-4 w-max max-w-[88%] rounded-full border border-border/70 bg-background/90 px-4 py-2 text-xs font-semibold text-muted-foreground shadow-lg shadow-black/5 backdrop-blur">
            {screenshots("items.library.label")}
          </figcaption>
        </motion.figure>
      </div>
    </SectionWrapper>
  );
}
