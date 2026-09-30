"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BarChart3, Dumbbell, Target } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";

const STEPS = [
  { id: "1", icon: Target },
  { id: "2", icon: Dumbbell },
  { id: "3", icon: BarChart3 },
] as const;

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionWrapper sectionId="how-it-works" dark>
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight mb-4 text-balance">
          {t("title")}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{t("subtitle")}</p>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STEPS.map(({ id, icon: Icon }, index) => (
          <motion.li
            key={id}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.1 }}
            className="relative rounded-3xl border border-border/80 bg-card/70 p-6 flex flex-col items-center text-center gap-3"
          >
            <span className="text-xs font-black text-amber-500 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Icon className="w-7 h-7" aria-hidden />
            </span>
            <h3 className="text-xl font-bold text-foreground">{t(`steps.${id}.title`)}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{t(`steps.${id}.description`)}</p>
          </motion.li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
