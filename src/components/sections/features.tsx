"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Dumbbell,
  Activity,
  Mic,
  CreditCard,
  TrendingUp,
  Sparkles,
  Zap,
  ShieldCheck,
  Smartphone,
  Check,
  Terminal,
  Volume2,
  Maximize2,
} from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { Badge } from "@/components/ui/badge";

export function Features() {
  const t = useTranslations("features");
  const shouldReduceMotion = useReducedMotion();

  // Interactive state for features
  const [offlineEnabled, setOfflineEnabled] = React.useState(true);
  const [selectedMuscle, setSelectedMuscle] = React.useState("Chest");
  const [selectedCoach, setSelectedCoach] = React.useState("Aggressive");
  const [currentWeight, setCurrentWeight] = React.useState(100);
  const [fpsMode, setFpsMode] = React.useState<"120" | "60">("120");

  const featureItems = [
    {
      id: "1",
      icon: Zap,
      color: "from-amber-500 via-yellow-500 to-amber-600",
      shadow: "shadow-amber-500/25",
      spotlight: "rgba(249, 192, 35, 0.16)",
      interactive: (
        <div className="mt-4 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${offlineEnabled ? "bg-emerald-400 animate-ping" : "bg-neutral-500"}`} />
              <span className="text-xs font-mono font-bold text-white">
                {offlineEnabled ? "Room SQLite (0ms)" : "Cloud Fallback"}
              </span>
            </div>
            <button
              onClick={() => setOfflineEnabled(!offlineEnabled)}
              className="text-[10px] px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-bold border border-neutral-700 cursor-pointer transition-colors"
            >
              {offlineEnabled ? "⚡ 100% OFFLINE" : "ONLINE"}
            </button>
          </div>
          <div className="p-2 rounded-lg bg-black/60 font-mono text-[9px] text-neutral-400 flex items-center justify-between">
            <span className="text-emerald-400 truncate">INSERT INTO workout_sets VALUES(3, 100kg, 8);</span>
            <span className="text-amber-400 ml-2">0.2ms</span>
          </div>
        </div>
      ),
    },
    {
      id: "2",
      icon: Activity,
      color: "from-blue-500 to-cyan-500",
      shadow: "shadow-blue-500/25",
      spotlight: "rgba(33, 150, 243, 0.16)",
      interactive: (
        <div className="mt-4 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-neutral-400">Target Muscle Load:</span>
            <span className="text-cyan-400 font-bold">
              {selectedMuscle === "Chest" ? "Pectorals (84% Load)" : selectedMuscle === "Back" ? "Lats (65% Load)" : selectedMuscle === "Legs" ? "Quads (95% Load)" : "Deltoids (70% Load)"}
            </span>
          </div>
          <div className="flex gap-1.5">
            {["Chest", "Back", "Legs", "Shoulders"].map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMuscle(m)}
                className={`text-[9px] px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  selectedMuscle === m
                    ? "bg-cyan-500 text-neutral-950 shadow-md shadow-cyan-500/30"
                    : "bg-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "3",
      icon: Mic,
      color: "from-amber-400 via-orange-500 to-amber-600",
      shadow: "shadow-orange-500/25",
      spotlight: "rgba(255, 152, 0, 0.16)",
      interactive: (
        <div className="mt-4 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-neutral-400">Audio Voice:</span>
            </div>
            <span className="text-orange-400 font-bold">{selectedCoach}</span>
          </div>
          <div className="flex items-center justify-between gap-1.5">
            {["Aggressive", "Supportive", "Zen"].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCoach(c)}
                className={`text-[9px] px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer flex-1 ${
                  selectedCoach === c
                    ? "bg-orange-500 text-neutral-950 shadow-md shadow-orange-500/30"
                    : "bg-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "4",
      icon: CreditCard,
      color: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/25",
      spotlight: "rgba(76, 175, 80, 0.16)",
      interactive: (
        <div className="mt-4 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-[10px] font-black border border-emerald-500/40">
              ID
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white leading-none">GOLD PASS #9482</span>
              <span className="text-[8px] text-neutral-400">NFC & Barcode Ready</span>
            </div>
          </div>
          <Badge variant="outline" className="text-[9px] border-emerald-500/40 text-emerald-300 bg-emerald-500/10">
            TAP READY
          </Badge>
        </div>
      ),
    },
    {
      id: "5",
      icon: TrendingUp,
      color: "from-yellow-400 via-amber-500 to-yellow-600",
      shadow: "shadow-yellow-500/25",
      spotlight: "rgba(249, 192, 35, 0.16)",
      interactive: (
        <div className="mt-4 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-neutral-400 block">Calculated 1RM</span>
            <span className="text-sm font-black text-amber-400">{Math.round(currentWeight * 1.33)} kg</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white font-mono">{currentWeight} kg</span>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentWeight((w) => Math.max(20, w - 2.5))}
                className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center cursor-pointer active:scale-95 border border-neutral-700"
              >
                -
              </button>
              <button
                onClick={() => setCurrentWeight((w) => w + 2.5)}
                className="w-7 h-7 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center cursor-pointer active:scale-95 shadow-sm"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "6",
      icon: Smartphone,
      color: "from-purple-500 to-indigo-500",
      shadow: "shadow-purple-500/25",
      spotlight: "rgba(156, 39, 176, 0.16)",
      interactive: (
        <div className="mt-4 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs">⚡</span>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white leading-none">AMOLED True Black</span>
              <span className="text-[8px] text-neutral-400">Zero Battery Waste</span>
            </div>
          </div>
          <button
            onClick={() => setFpsMode((prev) => (prev === "120" ? "60" : "120"))}
            className="text-[10px] px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono font-bold cursor-pointer transition-colors"
          >
            {fpsMode} FPS
          </button>
        </div>
      ),
    },
  ];

  return (
    <SectionWrapper sectionId="features" dark className="relative overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════
          FLOATING MOTIVATION CARD
         ═══════════════════════════════════════════════════════════════ */}
      <div className="relative max-w-7xl mx-auto mb-12">
        <div className="hidden lg:flex absolute -top-4 right-0 z-30 floating-glass-card rounded-2xl p-4 max-w-sm items-center gap-3.5 animate-float-slow" id="features-floating-message">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl flex-shrink-0 border border-amber-500/40 shadow-inner">
            💡
          </div>
          <div className="flex flex-col text-left rtl:text-right">
            <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
              Athlete Intelligence
            </span>
            <span className="text-[11px] text-neutral-300 font-medium leading-tight mt-0.5">
              Progressive overload compounds with proof. Log every set with zero latency.
            </span>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENGINEERED FOR POWER</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-sans tracking-tight mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </div>

      {/* Feature Cards Grid with MotionSites-inspired Spotlight & 3D Tilt */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 [perspective:1000px]">
        {featureItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="h-full"
            >
              <SpotlightCard
                spotlightColor={item.spotlight}
                enableTilt={true}
                borderBeam={true}
                className="h-full p-6 sm:p-7 group"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-neutral-950 font-bold mb-5 shadow-lg ${item.shadow} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2.5 font-sans group-hover:text-amber-400 transition-colors">
                    {t(`items.${item.id}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`items.${item.id}.description`)}
                  </p>
                </div>
                {item.interactive}
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
