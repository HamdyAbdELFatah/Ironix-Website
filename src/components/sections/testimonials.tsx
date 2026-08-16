"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, Quote, CheckCircle2, Sparkles, Flame, Zap, Trophy, ShieldCheck } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const shouldReduceMotion = useReducedMotion();

  const reviews = [
    { id: "1", avatar: "/assets/user_avatar_1.png", tag: "Powerlifter", stat: "185kg Bench PR" },
    { id: "2", avatar: "/assets/user_avatar_2.png", tag: "Bodybuilder", stat: "14-Day Streak 🔥" },
    { id: "3", avatar: "/assets/user_avatar_3.png", tag: "CrossFit Coach", stat: "Zero-Lag Room DB" },
    { id: "4", avatar: "/assets/user_avatar_4.png", tag: "Fitness Athlete", stat: "GymID NFC Active" },
  ];

  const liveTickerItems = [
    { name: "Markus R.", action: "Logged Push Day (14,200 kg volume)", time: "2m ago", icon: Flame },
    { name: "Sarah L.", action: "Set PR on Incline Press (+5 kg)", time: "4m ago", icon: Trophy },
    { name: "David K.", action: "Unlocked 7-Day Streak Badge", time: "7m ago", icon: Zap },
    { name: "Elena V.", action: "Logged 100% Offline in Basement Gym", time: "11m ago", icon: ShieldCheck },
  ];

  return (
    <SectionWrapper sectionId="testimonials" className="relative overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════
          LIVE ATHLETE ACTIVITY TICKER (Animated Marquee)
         ═══════════════════════════════════════════════════════════════ */}
      <div className="mb-14 -mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-marquee flex items-center gap-4 py-2 select-none">
          {[...liveTickerItems, ...liveTickerItems].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-card/70 border border-border/80 backdrop-blur-md text-xs whitespace-nowrap shadow-sm hover:border-amber-500/40 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center">
                  <Icon className="w-3 h-3" />
                </div>
                <span className="font-bold text-foreground">{item.name}</span>
                <span className="text-muted-foreground">{item.action}</span>
                <span className="text-[10px] text-amber-400/80 font-mono">({item.time})</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>PROVEN RESULTS</span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {reviews.map((item, index) => (
          <motion.div
            key={item.id}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full border-border/80 bg-card/80 backdrop-blur-sm hover:border-amber-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 rounded-3xl overflow-hidden group">
              <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        {item.stat}
                      </span>
                      <Quote className="w-5 h-5 text-amber-500/20 group-hover:text-amber-500/60 transition-colors" />
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-sm sm:text-base text-foreground/90 leading-relaxed italic">
                    &ldquo;{t(`reviews.${item.id}.content`)}&rdquo;
                  </p>
                </div>

                {/* Author Info with Authentic Avatar */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-border/50">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-amber-500/40 shadow-md">
                    <Image
                      src={item.avatar}
                      alt={t(`reviews.${item.id}.name`)}
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <span>{t(`reviews.${item.id}.name`)}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                      <span>{t(`reviews.${item.id}.role`)}</span>
                      <span className="w-1 h-1 rounded-full bg-border inline-block" />
                      <span className="text-amber-400/90">{item.tag}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
