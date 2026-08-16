"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Activity,
  CreditCard,
  QrCode,
  Sparkles,
  Mic,
  Shield,
  Layers,
  RotateCcw,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Showcase() {
  const t = useTranslations("showcase");
  const shouldReduceMotion = useReducedMotion();

  // Active Tab: 'anatomy' | 'gymid' | 'coach'
  const [activeTab, setActiveTab] = React.useState<"anatomy" | "gymid" | "coach">("anatomy");

  // Anatomy Interactive State
  const [selectedMuscle, setSelectedMuscle] = React.useState<"chest" | "back" | "quads" | "delts">("chest");
  const [anatomyView, setAnatomyView] = React.useState<"front" | "back">("front");

  // GymID Card Skin State
  const [cardSkin, setCardSkin] = React.useState<"gold" | "oled" | "cyan">("gold");

  // AI Coach Persona State
  const [selectedPersona, setSelectedPersona] = React.useState<"general" | "mentor" | "villain">("general");

  const muscleData = {
    chest: { name: "Pectorals (Chest)", load: "92%", status: "Fatigued", hours: "36h", color: "text-amber-400 bg-amber-500/10 border-amber-500/30", exercise: "Incline DB Press, Cable Flyes", view: "front" as const },
    back: { name: "Latissimus Dorsi", load: "45%", status: "Recovering", hours: "18h", color: "text-blue-400 bg-blue-500/10 border-blue-500/30", exercise: "Weighted Pull-ups, Barbell Rows", view: "back" as const },
    quads: { name: "Quadriceps & Glutes", load: "100%", status: "Fully Ready", hours: "0h", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30", exercise: "Barbell Back Squat, Leg Press", view: "front" as const },
    delts: { name: "Lateral Deltoids", load: "70%", status: "Near Optimal", hours: "8h", color: "text-amber-300 bg-amber-500/10 border-amber-500/30", exercise: "Overhead Press, DB Lateral Raises", view: "front" as const },
  };

  const personaData = {
    general: {
      title: "The General",
      tag: "Military Discipline",
      color: "border-amber-500/40 text-amber-400 bg-amber-500/10",
      quote: "“No excuses. You have 3 sets left. Drop the weight if you must, but never drop the discipline.”",
      stat: "Strict 1RM Progression",
    },
    mentor: {
      title: "The Mentor",
      tag: "Calm & Supportive",
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
      quote: "“Great control on the eccentric phase. Take your full 90 seconds rest and come back stronger.”",
      stat: "Longevity & Clean Form",
    },
    villain: {
      title: "The Villain",
      tag: "Ruthless & Sarcastic",
      color: "border-red-500/40 text-rose-400 bg-red-500/10",
      quote: "“Is that all you've got? Your previous self is laughing at that rep. Add 5kg or go home.”",
      stat: "Break Mental Limits",
    },
  };

  return (
    <SectionWrapper sectionId="showcase">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>INTERACTIVE MOBILE EXPERIENCE</span>
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

      {/* Tabs Switcher */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1.5 rounded-2xl bg-card border border-border/80 shadow-lg backdrop-blur-md">
          <button
            onClick={() => setActiveTab("anatomy")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer",
              activeTab === "anatomy"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Activity className="w-4 h-4" />
            <span>3D Anatomy Engine</span>
          </button>
          <button
            onClick={() => setActiveTab("gymid")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer",
              activeTab === "gymid"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <CreditCard className="w-4 h-4" />
            <span>GymID Wallet</span>
          </button>
          <button
            onClick={() => setActiveTab("coach")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer",
              activeTab === "coach"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Mic className="w-4 h-4" />
            <span>AI Coach Voice</span>
          </button>
        </div>
      </div>

      {/* Interactive Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "anatomy" && (
          <motion.div
            key="anatomy"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card/60 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-border/80 shadow-2xl"
          >
            {/* Visualizer Stage */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[380px] p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800">
              <div className="relative w-full max-w-[280px] h-[320px] flex items-center justify-center">
                <Image
                  src="/assets/ic_3d_body_dual_overview.png"
                  alt="Ironix 3D Anatomy Visualizer"
                  width={260}
                  height={320}
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(249,192,35,0.2)]"
                />
              </div>

              {/* View Rotation Control */}
              <div className="absolute bottom-4 flex gap-2">
                <button
                  onClick={() => setAnatomyView("front")}
                  className={cn(
                    "px-3 py-1 text-xs rounded-full font-bold transition-all cursor-pointer",
                    anatomyView === "front"
                      ? "bg-primary text-primary-foreground"
                      : "bg-neutral-800 text-neutral-400 hover:text-white"
                  )}
                >
                  Anterior (Front)
                </button>
                <button
                  onClick={() => setAnatomyView("back")}
                  className={cn(
                    "px-3 py-1 text-xs rounded-full font-bold transition-all cursor-pointer",
                    anatomyView === "back"
                      ? "bg-primary text-primary-foreground"
                      : "bg-neutral-800 text-neutral-400 hover:text-white"
                  )}
                >
                  Posterior (Back)
                </button>
              </div>
            </div>

            {/* Muscle Analytics Panel */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-primary">
                  Interactive Biomechanics
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-foreground font-sans mt-1">
                  Targeted Muscle Fatigue & Recovery
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Select any muscle group to view calculated cumulative strain, recovery time remaining, and recommended stimulus volume.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(muscleData) as Array<keyof typeof muscleData>).map((key) => {
                  const m = muscleData[key];
                  const isSelected = selectedMuscle === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedMuscle(key);
                        setAnatomyView(m.view);
                      }}
                      className={cn(
                        "p-3.5 rounded-xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between",
                        isSelected
                          ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                          : "border-border/80 bg-background/50 hover:bg-background hover:border-border"
                      )}
                    >
                      <span className="text-xs font-bold text-foreground block">{m.name}</span>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[11px] font-mono font-bold text-primary">{m.load} Load</span>
                        <span className={cn("text-[9px] font-extrabold px-1.5 py-0.5 rounded border", m.color)}>
                          {m.status}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Detail Box */}
              <div className="p-4 rounded-xl bg-background/80 border border-border/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-semibold">Recommended Exercises:</span>
                  <span className="text-primary font-bold">{muscleData[selectedMuscle].hours} until 100% Ready</span>
                </div>
                <p className="text-xs font-bold text-foreground">
                  {muscleData[selectedMuscle].exercise}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "gymid" && (
          <motion.div
            key="gymid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card/60 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-border/80 shadow-2xl"
          >
            {/* GymID Pass Card Visualizer */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-6">
              <div
                className={cn(
                  "w-full max-w-[340px] h-[200px] rounded-2xl p-5 flex flex-col justify-between shadow-2xl transition-all duration-500 relative overflow-hidden border",
                  cardSkin === "gold" && "bg-gradient-to-br from-amber-600 via-yellow-600 to-neutral-900 border-amber-400/50 shadow-amber-500/20 text-neutral-950",
                  cardSkin === "oled" && "bg-neutral-950 border-neutral-700 text-white shadow-black/80",
                  cardSkin === "cyan" && "bg-gradient-to-br from-cyan-600 via-blue-800 to-neutral-950 border-cyan-400/40 text-white"
                )}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md overflow-hidden bg-neutral-950 border border-amber-400/40 p-0.5 flex items-center justify-center">
                      <Image
                        src="/assets/logo.png"
                        alt="Ironix Logo"
                        width={24}
                        height={24}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xs font-black tracking-widest uppercase">
                      IRONIX GYMID PASS
                    </span>
                  </div>
                  <CreditCard className="w-4 h-4" />
                </div>

                <div className="flex items-center justify-between my-auto">
                  <div>
                    <div className="text-[10px] opacity-80 uppercase tracking-wider font-semibold">
                      Member Name
                    </div>
                    <div className="text-sm font-black tracking-wide">ALEX R. (ATHLETE)</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] opacity-80 uppercase tracking-wider font-semibold">
                      Barcode
                    </div>
                    <div className="text-xs font-mono font-black">#8849-2041-92</div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-current/20 text-[10px] font-bold">
                  <span>NFC TAP READY</span>
                  <span>100% OFFLINE</span>
                </div>
              </div>

              {/* Skin Chooser */}
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setCardSkin("gold")}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer",
                    cardSkin === "gold"
                      ? "bg-amber-400 text-neutral-950 ring-2 ring-amber-400 ring-offset-2 ring-offset-background"
                      : "bg-neutral-800 text-neutral-400"
                  )}
                >
                  Gold Metallic
                </button>
                <button
                  onClick={() => setCardSkin("oled")}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer",
                    cardSkin === "oled"
                      ? "bg-neutral-900 text-white ring-2 ring-white ring-offset-2 ring-offset-background"
                      : "bg-neutral-800 text-neutral-400"
                  )}
                >
                  Stealth OLED
                </button>
                <button
                  onClick={() => setCardSkin("cyan")}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer",
                    cardSkin === "cyan"
                      ? "bg-cyan-500 text-neutral-950 ring-2 ring-cyan-400 ring-offset-2 ring-offset-background"
                      : "bg-neutral-800 text-neutral-400"
                  )}
                >
                  Cyber Cyan
                </button>
              </div>
            </div>

            {/* Pitch */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs uppercase font-bold tracking-widest text-primary">
                Digital Wallet Convenience
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-foreground font-sans">
                Never Carry Physical Plastic Cards Again
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Scan your gym membership barcode or QR once. Ironix stores it securely in local encrypted storage, instantly accessible from your lockscreen or Apple/Google Wallet.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs font-bold text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Supports Code128, QR Code, PDF417 & EAN barcodes</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Lockscreen Quick Access Widget</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero internet requirement at the turnstile</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "coach" && (
          <motion.div
            key="coach"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card/60 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-border/80 shadow-2xl"
          >
            {/* Coach Card Visualizer */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-neutral-950/80 rounded-2xl border border-neutral-800">
              <div className="w-full max-w-sm rounded-2xl p-6 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
                      <Mic className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-white">{personaData[selectedPersona].title}</h4>
                      <span className="text-[10px] text-neutral-400">{personaData[selectedPersona].tag}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className={personaData[selectedPersona].color}>
                    ACTIVE COACH
                  </Badge>
                </div>

                <div className="p-4 rounded-xl bg-black/60 border border-neutral-800/80">
                  <p className="text-xs italic text-neutral-200 leading-relaxed font-serif">
                    {personaData[selectedPersona].quote}
                  </p>
                </div>

                {/* Animated Audio Waveform */}
                <div className="flex items-center justify-center gap-1 h-8">
                  {[40, 70, 90, 60, 100, 45, 85, 30, 95, 60, 80, 40].map((h, idx) => (
                    <div
                      key={idx}
                      className="w-1 rounded-full bg-amber-400 transition-all duration-300 animate-pulse"
                      style={{ height: `${h}%`, animationDelay: `${idx * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>

              {/* Persona Switcher */}
              <div className="flex gap-2 mt-6">
                {(Object.keys(personaData) as Array<keyof typeof personaData>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPersona(key)}
                    className={cn(
                      "px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer",
                      selectedPersona === key
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-neutral-800 text-neutral-400 hover:text-white"
                    )}
                  >
                    {personaData[key].title}
                  </button>
                ))}
              </div>
            </div>

            {/* Pitch */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs uppercase font-bold tracking-widest text-primary">
                Real-Time Audio Feedback
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-foreground font-sans">
                Choose Your Trainer's Voice & Persona
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Whether you need tough love to push past plateaus or supportive cues to maintain flawless form, Ironix delivers spoken cues right through your earbuds.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs font-bold text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>On-device text-to-speech with zero latency</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Customizable rep countdowns & rest timer whistles</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Works over Spotify, Apple Music & Podcast audio</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
