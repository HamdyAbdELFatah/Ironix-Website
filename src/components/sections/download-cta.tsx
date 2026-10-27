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
        <div className="download-panel relative isolate overflow-hidden rounded-[2rem] px-6 py-14 text-center ring-1 ring-white/[0.06] sm:rounded-[2.5rem] sm:px-12 sm:py-20 lg:px-20 lg:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(249,192,35,0.1),transparent_58%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent sm:inset-x-16" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5">
            <span aria-hidden="true" className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/10 text-amber-300"><span className="h-2.5 w-2.5 rounded-full bg-current shadow-[0_0_18px_currentColor]" /></span>
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
