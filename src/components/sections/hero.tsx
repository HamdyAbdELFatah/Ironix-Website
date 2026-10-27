"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowDown, Languages, ShieldCheck, WifiOff } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { GetTheApp } from "@/components/shared/get-the-app";

const PREVIEW_IMAGES = {
  en: { main: "/assets/app-screenshots/programs-en.png", secondary: "/assets/app-screenshots/plate-calculator-en.png" },
  ar: { main: "/assets/app-screenshots/programs-ar.png", secondary: "/assets/app-screenshots/plate-calculator-ar.png" },
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
      className="ironix-hero-field relative overflow-hidden pb-10 pt-28 sm:pb-16 sm:pt-36 lg:pb-20 lg:pt-36"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:min-h-[40rem] lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 xl:gap-20">
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-start">
          <motion.div
            {...reveal(0)}
            className="mb-6 inline-flex items-center gap-2.5 text-xs font-bold text-amber-800 dark:text-amber-300 sm:text-sm"
          >
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            <span>{t("badge")}</span>
          </motion.div>

          <motion.h1
            {...reveal(0.07)}
            className="max-w-3xl text-balance text-[2.7rem] font-black leading-[1.18] tracking-tight text-foreground sm:text-6xl lg:text-[3.75rem] xl:text-[4.4rem]"
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

          <motion.div {...reveal(0.22)} className="mt-8 w-full max-w-xl">
            <GetTheApp section="hero" className="justify-center lg:justify-start" />
          </motion.div>

          <motion.ul
            {...reveal(0.3)}
            className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-3 border-t border-border/70 pt-6 text-xs font-semibold text-muted-foreground sm:text-sm lg:justify-start"
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
          <motion.a
            {...reveal(0.35)}
            href="#screenshots"
            className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-foreground underline decoration-primary/60 underline-offset-8 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {screenshots("eyebrow")}
            <ArrowDown className="h-4 w-4 text-primary" aria-hidden="true" />
          </motion.a>
        </div>

        <motion.figure
          {...reveal(0.18)}
          className="hero-product-stage relative mx-auto flex h-[31rem] w-full max-w-[35rem] select-none items-center justify-center sm:h-[39rem] lg:h-[42rem] lg:max-w-none"
        >
          <div aria-hidden="true" className="hero-plate-orbit absolute left-1/2 top-1/2 aspect-square w-[98%] -translate-x-1/2 -translate-y-1/2 rounded-full" />
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

          <div aria-hidden="true" className="hero-secondary-phone absolute end-[2%] top-[17%] w-[min(38vw,11.5rem)] rotate-[8deg] rounded-[2rem] border-[5px] border-neutral-900 bg-neutral-950 p-1 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/15 sm:end-[5%] sm:w-[14rem] lg:end-0">
            <Image
              src={PREVIEW_IMAGES[locale].secondary}
              alt=""
              width={411}
              height={891}
              sizes="(max-width: 640px) 38vw, 224px"
              className="aspect-[411/891] w-full rounded-[1.45rem] object-cover"
            />
          </div>

          <div className="hero-phone-shell relative z-10 me-[13%] w-[min(55vw,14.5rem)] rounded-[2.55rem] border-[6px] border-neutral-900 bg-neutral-950 p-1.5 shadow-[0_34px_80px_-28px_rgba(0,0,0,0.62)] ring-1 ring-white/20 sm:w-[17rem] lg:w-[18rem]">
            <div className="relative aspect-[411/891] overflow-hidden rounded-[2rem] bg-white">
              <Image
                src={PREVIEW_IMAGES[locale].main}
                alt={screenshots("items.library.alt")}
                width={411}
                height={891}
                loading="eager"
                sizes="(max-width: 640px) 68vw, (max-width: 1024px) 288px, 304px"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <span aria-hidden="true" className="absolute left-1/2 top-2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-neutral-950" />
          </div>

          <figcaption className="absolute bottom-1 start-[4%] z-20 max-w-[65%] rounded-2xl border border-border/80 bg-card/95 px-4 py-3 text-xs font-semibold text-foreground shadow-xl shadow-black/10 backdrop-blur sm:bottom-4 sm:start-[5%] sm:text-sm">
            {screenshots("items.library.label")}
          </figcaption>
        </motion.figure>
      </div>
    </SectionWrapper>
  );
}
