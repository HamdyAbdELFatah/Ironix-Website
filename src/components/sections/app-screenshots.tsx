"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Info, Maximize2, X } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";

const SCREEN_IDS = ["library", "calculator"] as const;
type ScreenshotId = (typeof SCREEN_IDS)[number];
type Locale = "en" | "ar";

const SCREENSHOT_FILES: Record<Locale, Record<ScreenshotId, string>> = {
  en: {
    library: "/assets/app-screenshots/programs-en.png",
    calculator: "/assets/app-screenshots/plate-calculator-en.png",
  },
  ar: {
    library: "/assets/app-screenshots/programs-ar.png",
    calculator: "/assets/app-screenshots/plate-calculator-ar.png",
  },
};

export function AppScreenshots() {
  const t = useTranslations("screenshots");
  const locale: Locale = useLocale() === "ar" ? "ar" : "en";
  const [activeScreenshot, setActiveScreenshot] = useState<ScreenshotId | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const activeLabel = activeScreenshot ? t("items." + activeScreenshot + ".label") : "";
  const activeAlt = activeScreenshot ? t("items." + activeScreenshot + ".alt") : "";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeScreenshot && !dialog.open) dialog.showModal();
    if (!activeScreenshot && dialog.open) dialog.close();
  }, [activeScreenshot]);

  return (
    <SectionWrapper sectionId="screenshots" className="showcase-surface text-white">
      <div className="mb-12 flex flex-col gap-5 sm:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="max-w-2xl text-start">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-amber-400 sm:text-sm">
            {t("eyebrow")}
          </p>
          <h2 className="text-balance text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
        </div>
        <p className="max-w-lg text-start text-sm leading-7 text-white/65 sm:text-base lg:pb-1">
          {t("subtitle")}
        </p>
      </div>

      <ul className="mx-auto grid max-w-6xl items-start gap-x-8 gap-y-12 lg:grid-cols-2 lg:gap-x-12">
        {SCREEN_IDS.map((id, index) => (
          <li key={id} className="min-w-0">
            <button
              type="button"
              aria-label={t("openScreenshot", { screen: t("items." + id + ".label") })}
              aria-haspopup="dialog"
              onClick={() => setActiveScreenshot(id)}
              className="screenshot-stage group relative flex h-[29rem] w-full items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_22px_60px_-48px_rgba(0,0,0,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#171819] sm:h-[34rem] sm:rounded-[2rem] sm:p-8"
            >
              <span aria-hidden="true" className="screenshot-stage__halo absolute inset-0" />
              <span aria-hidden="true" className="screenshot-stage__grid absolute inset-0 opacity-30" />
              <span className="screenshot-stage__device relative rounded-[2rem] border-[5px] border-black bg-black p-1.5 shadow-[0_30px_75px_-28px_rgba(0,0,0,0.9)] ring-1 ring-white/15 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
                <Image
                  src={SCREENSHOT_FILES[locale][id]}
                  alt={t("items." + id + ".alt")}
                  width={411}
                  height={891}
                  sizes="(max-width: 640px) 62vw, (max-width: 1024px) 34vw, 300px"
                  className="h-auto max-h-[24.5rem] w-auto max-w-[min(62vw,14rem)] rounded-[1.45rem] object-contain sm:max-h-[29rem] sm:max-w-[17rem]"
                />
              </span>
              <span className="absolute bottom-4 end-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-2 text-xs font-semibold text-white/85 backdrop-blur sm:bottom-5 sm:end-5">
                <Maximize2 className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                {t("zoom")}
              </span>
              <span dir="ltr" aria-hidden="true" className="absolute start-5 top-5 font-mono text-[11px] font-medium tracking-[0.16em] text-white/40 sm:start-7 sm:top-7">
                {String(index + 1).padStart(2, "0")} / 02
              </span>
            </button>

            <div className="mt-5 flex items-start justify-between gap-5 border-b border-white/15 pb-5">
              <div>
                <h3 className="text-lg font-bold text-white sm:text-xl">{t("items." + id + ".label")}</h3>
                <p className="mt-1.5 max-w-md text-sm leading-6 text-white/60">
                  {t("items." + id + ".summary")}
                </p>
              </div>
              <span aria-hidden="true" className="mt-1 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-amber-400 sm:inline-flex">
                <Maximize2 className="h-3.5 w-3.5" />
              </span>
            </div>
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-6 flex max-w-3xl items-start gap-2 text-start text-xs leading-6 text-white/50 sm:mt-8 sm:text-sm">
        <Info className="mt-1 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
        <span>{t("sampleDataNote")}</span>
      </p>

      <dialog
        ref={dialogRef}
        aria-modal="true"
        aria-labelledby="screenshot-dialog-title"
        onClose={() => setActiveScreenshot(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActiveScreenshot(null);
        }}
        className="screenshot-dialog fixed inset-0 m-auto max-h-[92dvh] max-w-[94vw] overflow-visible bg-transparent p-0 text-foreground backdrop:bg-neutral-950/90 backdrop:backdrop-blur-sm"
      >
        {activeScreenshot && (
          <div className="screenshot-dialog__content relative rounded-[2.5rem] border-[6px] border-neutral-900 bg-neutral-950 p-2 shadow-2xl shadow-black/60">
            <h2 id="screenshot-dialog-title" className="sr-only">{activeLabel}</h2>
            <button
              type="button"
              autoFocus
              aria-label={t("closeScreenshot")}
              onClick={() => setActiveScreenshot(null)}
              className="absolute -end-3 -top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-neutral-900 text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <Image
              src={SCREENSHOT_FILES[locale][activeScreenshot]}
              alt={activeAlt}
              width={411}
              height={891}
              sizes="90vw"
              className="max-h-[88dvh] w-auto max-w-[88vw] rounded-[2rem] object-contain"
            />
          </div>
        )}
      </dialog>
    </SectionWrapper>
  );
}
