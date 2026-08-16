"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Dumbbell, ShieldCheck, Zap, Sparkles, QrCode, ArrowDown } from "lucide-react";
import { AppStoreBadge } from "@/components/shared/app-store-badge";
import { GooglePlayBadge } from "@/components/shared/google-play-badge";
import { AppGalleryBadge } from "@/components/shared/app-gallery-badge";

export function DownloadCta() {
  const t = useTranslations("downloadCta");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="download" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.96 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl lg:rounded-[40px] bg-gradient-to-br from-card via-card to-amber-500/10 border border-amber-500/30 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl shadow-amber-500/15"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-amber-500/15 rounded-full blur-[110px] pointer-events-none -z-10 animate-pulse-glow" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: CTA Pitch */}
            <div className="lg:col-span-8 text-center lg:text-left rtl:lg:text-right space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 text-xs sm:text-sm font-bold backdrop-blur-md">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>UNLIMITED ATHLETIC POTENTIAL</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-sans tracking-tight leading-tight">
                {t("title")}
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
                {t("subtitle")}
              </p>

              {/* Badges List with Hover Glow */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <AppStoreBadge section="cta" />
                <GooglePlayBadge section="cta" />
                <AppGalleryBadge section="cta" />
              </div>

              {/* Guarantees */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-semibold text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Privacy Protected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Works 100% Offline</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Dumbbell className="w-4 h-4 text-amber-400" />
                  <span>Free Tier Available</span>
                </div>
              </div>
            </div>

            {/* Right Column: QR Quick Scan Card with Laser Scan Animation */}
            <div className="lg:col-span-4 flex justify-center relative">
              <div className="bg-card/90 border border-border/80 backdrop-blur-md rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center max-w-[280px] relative overflow-hidden group">
                <div className="w-44 h-44 bg-white p-3.5 rounded-2xl shadow-inner flex flex-col items-center justify-center mb-4 relative overflow-hidden">
                  <QrCode className="w-full h-full text-neutral-950" />
                  
                  {/* Animated Laser Scanning Line */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_8px_#f9c023] animate-scan-line pointer-events-none" />

                  {/* Centered App Logo in QR */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-lg bg-black flex items-center justify-center p-0.5">
                      <Image
                        src="/assets/logo.png"
                        alt="Ironix"
                        width={36}
                        height={36}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <span>Scan to Install Ironix</span>
                  <ArrowDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                </div>
                <span className="text-[10px] text-muted-foreground mt-0.5">
                  Instant scan for iOS, Android & Huawei devices
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
