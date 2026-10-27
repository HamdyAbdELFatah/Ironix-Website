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
  const activeLabel = activeScreenshot ? t(`items.${activeScreenshot}.label`) : "";
  const activeAlt = activeScreenshot ? t(`items.${activeScreenshot}.alt`) : "";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeScreenshot && !dialog.open) dialog.showModal();
    if (!activeScreenshot && dialog.open) dialog.close();
  }, [activeScreenshot]);

  return (
    <SectionWrapper sectionId="screenshots" className="bg-card/35">
      <div className="mx-auto mb-11 max-w-3xl text-center sm:mb-14">
        <p className="mb-4 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold tracking-wide text-primary">
          {t("eyebrow")}
        </p>
        <h2 className="mb-4 text-balance text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("subtitle")}
        </p>
      </div>

      <ul className="mx-auto grid max-w-5xl items-start gap-5 sm:grid-cols-2 lg:gap-8">
        {SCREEN_IDS.map((id) => (
          <li key={id} className="min-w-0">
            <article className="h-full overflow-hidden rounded-[2rem] border border-border/80 bg-card p-3 shadow-lg shadow-black/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
              <button
                type="button"
                aria-label={t("openScreenshot", { screen: t(`items.${id}.label`) })}
                aria-haspopup="dialog"
                onClick={() => setActiveScreenshot(id)}
                className="group relative flex min-h-[390px] w-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:min-h-[480px]"
              >
                <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(249,192,35,0.16),transparent_55%)]" />
                <span className="relative rounded-[2rem] border-[5px] border-neutral-950 bg-neutral-950 p-1 shadow-2xl shadow-black/40 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-[1.015]">
                  <Image
                    src={SCREENSHOT_FILES[locale][id]}
                    alt={t(`items.${id}.alt`)}
                    width={411}
                    height={891}
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 42vw, 28vw"
                    className="h-auto max-h-[470px] w-auto max-w-[min(70vw,270px)] rounded-[1.55rem] object-contain sm:max-h-[540px]"
                  />
                </span>
                <span className="absolute bottom-4 end-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-neutral-950/80 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                  <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("zoom")}
                </span>
              </button>
              <div className="px-2 pb-2 pt-4 text-start">
                <h3 className="text-lg font-extrabold text-foreground">{t(`items.${id}.label`)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(`items.${id}.summary`)}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-6 flex max-w-3xl items-start justify-center gap-2 text-center text-sm leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
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
        className="fixed inset-0 m-auto max-h-[92dvh] max-w-[94vw] overflow-visible bg-transparent p-0 text-foreground backdrop:bg-neutral-950/85 backdrop:backdrop-blur-sm"
      >
        {activeScreenshot && (
          <div className="relative rounded-[2.5rem] border-[6px] border-neutral-900 bg-neutral-950 p-2 shadow-2xl shadow-black/50">
            <h2 id="screenshot-dialog-title" className="sr-only">{activeLabel}</h2>
            <button
              type="button"
              autoFocus
              aria-label={t("closeScreenshot")}
              onClick={() => setActiveScreenshot(null)}
              className="absolute -end-3 -top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-neutral-900 text-white shadow-lg transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
