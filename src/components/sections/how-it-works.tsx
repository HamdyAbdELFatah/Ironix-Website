"use client";

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
    <SectionWrapper sectionId="how-it-works" className="bg-muted/35 py-20 sm:py-24 lg:py-32">
      <div className="mb-10 flex flex-col gap-4 text-start sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <h2 className="max-w-2xl text-balance text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="max-w-lg text-sm leading-7 text-muted-foreground sm:text-base lg:pb-1">
          {t("subtitle")}
        </p>
      </div>

      <ol className="grid grid-cols-1 border-y border-border/80 md:grid-cols-3">
        {STEPS.map(({ id, icon: Icon }, index) => (
          <motion.li
            key={id}
            initial={shouldReduceMotion ? {} : { opacity: 0, transform: "translateY(14px)" }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: index * 0.09, ease: [0.23, 1, 0.32, 1] }}
            className="relative flex min-w-0 flex-col items-start py-7 sm:py-8 md:px-6 md:py-10 lg:px-8 lg:py-12"
          >
            {index > 0 && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-border/80 md:inset-y-0 md:inset-x-auto md:start-0 md:h-auto md:w-px" />}
            <div className="mb-7 flex w-full items-center justify-between gap-4">
              <span className="font-mono text-5xl font-bold leading-none tracking-[-0.08em] text-primary/80 sm:text-6xl">
                0{index + 1}
              </span>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <h3 className="text-xl font-extrabold leading-snug text-foreground sm:text-2xl">{t("steps." + id + ".title")}</h3>
            <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">{t("steps." + id + ".description")}</p>
          </motion.li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
