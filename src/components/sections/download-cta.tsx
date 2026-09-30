"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { APP_CONFIG } from "@/lib/utils/constants";
import { GetTheApp } from "@/components/shared/get-the-app";

export function DownloadCta() {
  const t = useTranslations("downloadCta");
  const live = APP_CONFIG.hasAnyStoreListing();

  return (
    <section id="download" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl lg:rounded-[40px] bg-gradient-to-br from-card via-card to-amber-500/10 border border-amber-500/30 p-8 sm:p-12 text-center flex flex-col items-center gap-5 shadow-2xl shadow-amber-500/10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight text-balance">
            {live ? t("titleLive") : t("title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            {live ? t("subtitleLive") : t("subtitle")}
          </p>
          <GetTheApp section="cta" className="justify-center" />
        </div>
      </div>
    </section>
  );
}
