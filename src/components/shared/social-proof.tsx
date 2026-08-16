"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, Download, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function SocialProof({ className }: { className?: string }) {
  const t = useTranslations("socialProof");
  const shouldReduceMotion = useReducedMotion();

  const stats = [
    {
      icon: <Download className="w-5 h-5 text-primary" />,
      value: t("downloads"),
      label: t("downloadsLabel"),
    },
    {
      icon: <Star className="w-5 h-5 fill-amber-400 text-amber-400" />,
      value: t("rating"),
      label: t("ratingLabel"),
    },
    {
      icon: <Users className="w-5 h-5 text-primary" />,
      value: t("users"),
      label: t("usersLabel"),
    },
  ];

  return (
    <div
      className={cn(
        "py-6 px-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md shadow-lg shadow-black/5",
        className
      )}
    >
      <div className="grid grid-cols-3 gap-6 sm:gap-12 divide-x divide-border/60 rtl:divide-x-reverse">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center justify-center text-center px-2 first:ps-0 last:pe-0"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
                {stat.icon}
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight font-sans">
                {stat.value}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
