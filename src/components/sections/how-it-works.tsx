"use client";

import * as React from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Smartphone, Dumbbell, Share2, ArrowRight, Sparkles, CheckCircle2, QrCode, Zap, Activity } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { cn } from "@/lib/utils";

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const shouldReduceMotion = useReducedMotion();

  const [activeStep, setActiveStep] = React.useState<number>(0);

  const steps = [
    {
      number: "01",
      icon: Smartphone,
      title: t("steps.1.title"),
      description: t("steps.1.description"),
      color: "from-amber-500 via-yellow-500 to-amber-600",
      previewBadge: "Zero Plastic",
      previewText: "Point camera to scan Gym barcode or NFC badge once.",
    },
    {
      number: "02",
      icon: Dumbbell,
      title: t("steps.2.title"),
      description: t("steps.2.description"),
      color: "from-amber-400 via-orange-500 to-amber-600",
      previewBadge: "100% Offline",
      previewText: "Log weights, reps, and RPE with instant 0ms Room DB response.",
    },
    {
      number: "03",
      icon: Share2,
      title: t("steps.3.title"),
      description: t("steps.3.description"),
      color: "from-blue-500 via-indigo-500 to-blue-600",
      previewBadge: "3D Analytics",
      previewText: "Analyze muscle strain distribution and automated progressive overload.",
    },
  ];

  return (
    <SectionWrapper sectionId="how-it-works" dark className="relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>SIMPLE & SEAMLESS FLOW</span>
        </motion.div>

        <motion.h2
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-sans tracking-tight mb-4"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative">
        {/* Animated Laser Connector Line (Desktop) */}
        <div className="hidden md:block absolute top-20 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-amber-500/30 via-yellow-400 to-blue-500/30 -z-0" />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isSelected = activeStep === index;
          return (
            <motion.div
              key={step.number}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onClick={() => setActiveStep(index)}
              className={cn(
                "relative flex flex-col items-center text-center p-6 rounded-3xl border transition-all duration-300 cursor-pointer group bg-card/60 backdrop-blur-md",
                isSelected
                  ? "border-amber-500/50 shadow-2xl shadow-amber-500/10 -translate-y-2 bg-card/90"
                  : "border-border/80 hover:border-amber-500/30 hover:-translate-y-1"
              )}
            >
              {/* Step Number Backdrop */}
              <div className="text-7xl lg:text-8xl font-black text-foreground/5 absolute -top-8 font-mono select-none pointer-events-none group-hover:text-amber-500/10 transition-colors">
                {step.number}
              </div>

              {/* Icon Bubble */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-neutral-950 font-bold shadow-xl shadow-amber-500/20 mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-8 h-8" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground font-sans mb-2.5 relative z-10 group-hover:text-amber-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs relative z-10 mb-4">
                {step.description}
              </p>

              {/* Active Step Feature Pill */}
              <div className="mt-auto pt-3 border-t border-border/60 w-full flex items-center justify-between text-xs">
                <span className="text-neutral-400 text-[11px] font-medium">{step.previewBadge}</span>
                <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
