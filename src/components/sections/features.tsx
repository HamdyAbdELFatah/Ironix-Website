"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Activity, Database, Dumbbell, TrendingUp, Wallet, WifiOff } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";

const FEATURES = [
  { id: "1", icon: WifiOff, pro: false },
  { id: "2", icon: Activity, pro: true },
  { id: "3", icon: Wallet, pro: false },
  { id: "4", icon: TrendingUp, pro: false },
  { id: "5", icon: Dumbbell, pro: false },
  { id: "6", icon: Database, pro: false },
] as const;

export function Features() {
  const t = useTranslations("features");
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionWrapper sectionId="features" className="py-20 sm:py-24 lg:py-32">
      <div className="mb-10 flex flex-col gap-4 text-start sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <h2 className="max-w-2xl text-balance text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="max-w-lg text-sm leading-7 text-muted-foreground sm:text-base lg:pb-1">
          {t("subtitle")}
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {FEATURES.map(({ id, icon: Icon, pro }, index) => (
          <motion.li
            key={id}
            initial={shouldReduceMotion ? {} : { opacity: 0, transform: "translateY(12px)" }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: index * 0.055, ease: [0.23, 1, 0.32, 1] }}
            className={`feature-card group relative min-w-0 overflow-hidden rounded-3xl border border-border/75 p-6 sm:p-7 ${index < 2 ? "feature-card--featured sm:col-span-2 lg:col-span-2 lg:min-h-[16rem]" : "lg:min-h-[16rem]"}`}
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="feature-card__icon inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-amber-800 dark:text-amber-300">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              {pro && (
                <span className="rounded-full bg-primary/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-amber-800 dark:text-amber-300">
                  {t("proBadge")}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold leading-snug text-foreground sm:text-xl">{t("items." + id + ".title")}</h3>
            <p className="mt-2 max-w-sm text-sm leading-7 text-muted-foreground">{t("items." + id + ".description")}</p>
            {index < 2 && <span aria-hidden="true" className={`feature-card__mark feature-card__mark--${index === 0 ? "offline" : "recovery"}`} />}
          </motion.li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
