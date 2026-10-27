"use client";

import { useTranslations } from "next-intl";
import { APP_CONFIG } from "@/lib/utils/constants";
import { GetTheApp } from "@/components/shared/get-the-app";

export function DownloadCta() {
  const t = useTranslations("downloadCta");
  const live = APP_CONFIG.hasAnyStoreListing();

  return (
    <section id="download" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#11110f] px-6 py-12 text-center sm:rounded-[2.5rem] sm:px-12 sm:py-16 lg:px-20 lg:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(249,192,35,0.18),transparent_55%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent sm:inset-x-16" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5">
            <h2 className="text-balance text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {live ? t("titleLive") : t("title")}
            </h2>
            <p className="max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              {live ? t("subtitleLive") : t("subtitle")}
            </p>
            <GetTheApp
              section="cta"
              className="justify-center [&_input]:border-white/15 [&_input]:bg-white/10 [&_input]:text-white [&_input]:placeholder:text-white/40 [&_p]:text-white/55"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
