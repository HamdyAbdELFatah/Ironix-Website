"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Flame,
  Activity,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Trophy,
  ChevronRight,
  Gauge,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
} from "lucide-react";
import { AppStoreBadge } from "@/components/shared/app-store-badge";
import { GooglePlayBadge } from "@/components/shared/google-play-badge";
import { AppGalleryBadge } from "@/components/shared/app-gallery-badge";
import { SocialProof } from "@/components/shared/social-proof";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const t = useTranslations("hero");
  const shouldReduceMotion = useReducedMotion();

  // Interactive Live Workout Set State
  const [completedSets, setCompletedSets] = React.useState<number>(2);
  const [isTimerRunning, setIsTimerRunning] = React.useState<boolean>(true);
  const [timerSeconds, setTimerSeconds] = React.useState<number>(45);
  const [workoutStarted, setWorkoutStarted] = React.useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = React.useState<boolean>(false);
  const [lastLoggedWeight, setLastLoggedWeight] = React.useState<number>(40);
  const [flashSuccess, setFlashSuccess] = React.useState<boolean>(false);

  // 3D Tilt Spring Physics for Phone Stage
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handlePhoneMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePhoneMouseLeave = () => {
    if (shouldReduceMotion) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 1 ? prev - 1 : 60));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleLogSet = () => {
    setCompletedSets((prev) => (prev < 4 ? prev + 1 : 1));
    setTimerSeconds(60);
    setLastLoggedWeight((prev) => (completedSets === 3 ? 42.5 : prev));
    setFlashSuccess(true);
    setTimeout(() => setFlashSuccess(false), 800);
  };

  const handleStartWorkout = () => {
    setWorkoutStarted((prev) => !prev);
    if (!workoutStarted) {
      setTimerSeconds(60);
    }
  };

  const titleWords = t("title").split(" ");

  return (
    <SectionWrapper
      sectionId="hero"
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden noise-overlay"
    >
      {/* Dynamic Background Animated Ambient Glows & Mesh Waves */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[550px] bg-gradient-to-tr from-amber-500/20 via-yellow-600/15 to-blue-500/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/2 right-4 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[130px] pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute -bottom-10 left-10 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-float-reverse" />

      {/* Decorative Grid Lines Overlay with subtle fade */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left rtl:lg:text-right">
          {/* Persona Badge with Glowing Border */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 15, filter: "blur(6px)" }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/15 backdrop-blur-md hover:border-amber-400 transition-colors"
          >
            <div className="relative w-4 h-4 rounded-full overflow-hidden border border-amber-400 bg-neutral-950 flex items-center justify-center p-0.5 shadow-sm">
              <Image
                src="/assets/logo.png"
                alt="Ironix"
                width={16}
                height={16}
                className="w-full h-full object-contain"
              />
            </div>
            <span>{t("badge")}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping ml-1" />
          </motion.div>

          {/* Kinetic Main Title with Staggered Word Reveal */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-foreground font-sans tracking-tight leading-[1.08] mb-6">
            <span className="inline-block">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 25, filter: "blur(8px)" }}
                  animate={shouldReduceMotion ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.08 * i, ease: "easeOut" }}
                  className="inline-block mr-2.5 rtl:ml-2.5 rtl:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </span>{" "}
            <motion.span
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              className="text-ironix-gold-gradient block sm:inline animate-gradient-shift"
            >
              {t("titleAccent")}
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8 sm:mb-10 font-normal"
          >
            {t("subtitle")}
          </motion.p>

          {/* 3 App Download Badges (Apple + Google Play + Huawei AppGallery) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-10 w-full sm:w-auto"
          >
            <AppStoreBadge section="hero" />
            <GooglePlayBadge section="hero" />
            <AppGalleryBadge section="hero" />
          </motion.div>

          {/* Social Proof Counters */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={shouldReduceMotion ? {} : { opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full pt-8 border-t border-border/70"
          >
            <SocialProof />
          </motion.div>
        </div>

        {/* Right Column: Smartphone Mockup with 3D Spring Tilt & 4 Floating Interactive Widgets */}
        <div
          onMouseMove={handlePhoneMouseMove}
          onMouseLeave={handlePhoneMouseLeave}
          className="lg:col-span-5 flex justify-center relative select-none py-6 [perspective:1200px]"
        >
          {/* Ambient Glow behind Smartphone */}
          <div className="absolute -inset-6 bg-gradient-to-tr from-amber-500/25 via-yellow-500/15 to-blue-500/15 rounded-[60px] blur-3xl -z-10 animate-pulse-glow" />

          {/* ═══════════════════════════════════════════════════════════
              FLOATING WIDGET 1: 7-Day Streak & Progress Circle (Top Left)
             ═══════════════════════════════════════════════════════════ */}
          <div
            className="hidden sm:flex absolute -top-4 -left-10 z-40 floating-glass-card rounded-2xl p-3.5 items-center gap-3 animate-float-slow transition-transform hover:scale-105"
            id="hero-floating-goal"
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-12 h-12 -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-neutral-800"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-amber-400"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset="62.8"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[11px] font-black text-amber-400 leading-none">75%</span>
              </div>
            </div>
            <div className="flex flex-col text-left rtl:text-right">
              <div className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
                <span className="text-xs font-black text-white">7-Day Streak</span>
              </div>
              <span className="text-[10px] text-neutral-400 font-medium">
                4 of 5 Workouts Done
              </span>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              FLOATING WIDGET 2: Offline SQLite Status & Radar (Bottom Right)
             ═══════════════════════════════════════════════════════════ */}
          <div
            className="hidden sm:flex absolute -bottom-6 -right-8 z-40 floating-glass-card rounded-2xl p-3 items-center gap-2.5 animate-float-reverse transition-transform hover:scale-105"
            id="hero-floating-offline"
          >
            <div className="relative w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Zap className="w-4 h-4 fill-emerald-400" />
              <div className="absolute inset-0 rounded-xl bg-emerald-400/20 animate-radar pointer-events-none" />
            </div>
            <div className="flex flex-col text-left rtl:text-right">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-black text-white">100% Offline Ready</span>
              </div>
              <span className="text-[10px] text-neutral-400 font-medium">
                0ms Local SQLite Sync
              </span>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              FLOATING WIDGET 3: Biomechanics & Recovery (Top Right)
             ═══════════════════════════════════════════════════════════ */}
          <div
            className="hidden md:flex absolute top-20 -right-12 z-30 floating-glass-card rounded-2xl p-2.5 px-3.5 items-center gap-2.5 animate-float-slow transition-transform hover:scale-105"
            id="hero-floating-recovery"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Activity className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left rtl:text-right">
              <span className="text-[9px] uppercase font-black text-amber-400 tracking-wider">Muscle Readiness</span>
              <span className="text-xs font-black text-white">94% Optimal</span>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              FLOATING WIDGET 4: Rep Velocity & Barbell Tracker (Bottom Left)
             ═══════════════════════════════════════════════════════════ */}
          <div
            className="hidden lg:flex absolute bottom-24 -left-12 z-30 floating-glass-card rounded-2xl p-2.5 px-3.5 items-center gap-2.5 animate-float-reverse transition-transform hover:scale-105"
            id="hero-floating-velocity"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-cyan-400">
              <Gauge className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left rtl:text-right">
              <span className="text-[9px] uppercase font-black text-cyan-400 tracking-wider">Rep Velocity</span>
              <span className="text-xs font-mono font-black text-white">0.68 m/s Explode</span>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              AUTHENTIC IRONIX MOBILE SCREEN MOCKUP with 3D Spring Physics
             ═══════════════════════════════════════════════════════════ */}
          <motion.div
            style={
              shouldReduceMotion
                ? {}
                : {
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }
            }
            className="w-[300px] sm:w-[340px] rounded-[48px] p-3 bg-neutral-950 border-[3px] border-neutral-700/80 shadow-2xl shadow-black/90 relative transition-transform duration-200"
          >
            {/* Dynamic Island Notch with Interactive Soundwave & Timer */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-30 flex items-center justify-between px-3 shadow-md border border-neutral-800">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-[10px] font-mono text-white font-bold">
                  {timerSeconds}s
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-0.5 h-3">
                  <div className="w-0.5 h-2 bg-amber-400 rounded-full animate-pulse" />
                  <div className="w-0.5 h-3 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <div className="w-0.5 h-1.5 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                </div>
                <Activity className="w-3 h-3 text-amber-400 ml-1" />
              </div>
            </div>

            {/* Inner Phone Screen */}
            <div className="rounded-[40px] bg-black text-white p-4 pt-12 flex flex-col gap-3.5 overflow-hidden relative border border-neutral-900 min-h-[580px]">
              {/* Screen Flash on Set Logged */}
              {flashSuccess && (
                <div className="absolute inset-0 bg-amber-400/20 z-50 pointer-events-none animate-in fade-in duration-200" />
              )}

              {/* Screen Top Bar matching HomeScreen.kt */}
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-amber-400/40 bg-neutral-950 flex items-center justify-center p-0.5">
                    <Image
                      src="/assets/logo.png"
                      alt="Ironix App"
                      width={28}
                      height={28}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 block leading-none">
                      GOOD MORNING
                    </span>
                    <span className="text-xs font-black tracking-wider text-amber-400">
                      ATHLETE • LVL 12
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className="text-[9px] border-amber-500/40 text-amber-400 px-2 py-0.5 bg-amber-500/10 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                  <span>OFFLINE</span>
                </Badge>
              </div>

              {/* ── TODAY'S WORKOUT GLASSCARD ────────────────── */}
              <div className="rounded-2xl p-3.5 bg-gradient-to-br from-neutral-900/95 to-neutral-950 border border-neutral-800 space-y-2.5 shadow-inner relative overflow-hidden group">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase font-black tracking-wider text-amber-400 block">
                      TODAY'S WORKOUT
                    </span>
                    <h4 className="text-sm font-black text-white">
                      Push Day Hypertrophy
                    </h4>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">
                      45 MIN • ADVANCED • 8 EXERCISES
                    </span>
                  </div>
                </div>

                {/* Start Workout / Interactive Pill Button */}
                <button
                  onClick={handleStartWorkout}
                  className="w-full h-11 px-4 rounded-full bg-[#F9C023] hover:bg-[#E0A800] text-black font-black text-xs tracking-wider uppercase transition-all duration-200 shadow-xl shadow-amber-500/40 hover:shadow-amber-500/60 flex items-center justify-between cursor-pointer active:scale-95 border-0"
                >
                  <span className="font-black text-neutral-950 text-xs tracking-wider">
                    {workoutStarted ? "WORKOUT IN PROGRESS" : "START WORKOUT"}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-neutral-950 text-[#F9C023] flex items-center justify-center shadow-md">
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </div>
                </button>
              </div>

              {/* ── LIVE SET LOGGER INTERACTIVE CARD ────────────────── */}
              <div className="rounded-2xl p-3.5 bg-neutral-900/95 border border-amber-500/30 space-y-2.5 shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[11px] font-bold text-white">Incline Dumbbell Press</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">
                    Set {completedSets} of 4
                  </span>
                </div>

                {/* Set Bars Progress */}
                <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden flex gap-1">
                  {[1, 2, 3, 4].map((set) => (
                    <div
                      key={set}
                      className={`h-full flex-1 rounded-full transition-all duration-500 ${
                        set <= completedSets ? "bg-amber-400 shadow-sm shadow-amber-400" : "bg-neutral-800"
                      }`}
                    />
                  ))}
                </div>

                {/* Log Button with Particle Sparkle Effect */}
                <button
                  onClick={handleLogSet}
                  className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-extrabold text-[11px] tracking-wider transition-all border border-neutral-700 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-md"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Log Set {completedSets < 4 ? completedSets + 1 : 1} ({lastLoggedWeight}kg × 8 reps)</span>
                </button>

                <div className="flex items-center justify-between text-[9px] text-neutral-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3 h-3" /> Synced to Local Room DB
                  </span>
                  <span className="font-mono text-amber-400">Rest: {timerSeconds}s</span>
                </div>
              </div>

              {/* ── WEEKLY PROGRESS 7-DAY PILL STRIP ── */}
              <div className="rounded-2xl p-3 bg-neutral-900/60 border border-neutral-800 space-y-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-neutral-300">Weekly Progress</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-amber-400" /> 7-Day Streak
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  {[
                    { day: "M", done: true },
                    { day: "T", done: true },
                    { day: "W", done: true },
                    { day: "T", done: true },
                    { day: "F", done: true },
                    { day: "S", done: false },
                    { day: "S", done: false },
                  ].map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div
                        className={`w-3.5 h-7 rounded-full flex items-center justify-center transition-all ${
                          d.done ? "bg-amber-400 text-neutral-950" : "bg-neutral-800 text-transparent"
                        }`}
                      >
                        {d.done && <CheckCircle2 className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                      <span className="text-[8px] font-bold text-neutral-400">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── MOUNTAIN CHALLENGE BANNER ── */}
              <div className="rounded-xl p-2.5 bg-gradient-to-r from-amber-500/15 via-yellow-600/10 to-neutral-900 border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="text-[10px] font-black text-white block leading-none">
                      UNLOCK POTENTIAL
                    </span>
                    <span className="text-[8px] text-neutral-400">Monthly Hypertrophy Challenge</span>
                  </div>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950">
                  JOIN
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
