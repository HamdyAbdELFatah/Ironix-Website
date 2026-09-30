"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Activity, Database, Dumbbell, TrendingUp, Wallet, WifiOff } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";

// Only features that ship in the app. `pro` marks the ones behind Ironix Pro,
// matching the Free vs Pro split in the pricing section and the in-app paywall.
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
    <SectionWrapper sectionId="features">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight mb-4 text-balance">
          {t("title")}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{t("subtitle")}</p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map(({ id, icon: Icon, pro }, index) => (
          <motion.li
            key={id}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="rounded-2xl border border-border/80 bg-card/70 p-6 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center">
                <Icon className="w-5 h-5" aria-hidden />
              </span>
              {pro && (
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950">
                  {t("proBadge")}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-foreground">{t(`items.${id}.title`)}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t(`items.${id}.description`)}</p>
          </motion.li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
