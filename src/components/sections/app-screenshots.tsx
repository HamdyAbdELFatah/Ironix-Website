"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Dumbbell, Info, Layers, Scale } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";

const SCREEN_OPTIONS = [
  { id: "library", icon: Layers },
  { id: "workout", icon: Dumbbell },
  { id: "calculator", icon: Scale },
] as const;

type ScreenshotId = (typeof SCREEN_OPTIONS)[number]["id"];
type Locale = "en" | "ar";

const SCREENSHOT_FILES: Record<Locale, Record<ScreenshotId, string>> = {
  en: {
    library: "/assets/app-screenshots/programs-en.png",
    workout: "/assets/app-screenshots/workout-en.png",
    calculator: "/assets/app-screenshots/plate-calculator-en.png",
  },
  ar: {
    library: "/assets/app-screenshots/programs-ar.png",
    workout: "/assets/app-screenshots/workout-ar.png",
    calculator: "/assets/app-screenshots/plate-calculator-ar.png",
  },
};

export function AppScreenshots() {
  const t = useTranslations("screenshots");
  const locale: Locale = useLocale() === "ar" ? "ar" : "en";
  const [selected, setSelected] = useState<ScreenshotId>("library");
  const selectedLabel = t(`items.${selected}.label`);

  return (
    <SectionWrapper sectionId="screenshots" className="bg-card/25">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold tracking-wide text-primary">
            {t("eyebrow")}
          </p>
          <h2 className="mb-4 text-balance text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1" role="group" aria-label={t("selectorLabel")}>
            {SCREEN_OPTIONS.map(({ id, icon: Icon }) => {
              const isSelected = selected === id;

              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelected(id)}
                  className={`group flex min-h-16 items-center gap-3 rounded-2xl border p-3 text-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isSelected
                      ? "border-primary/60 bg-primary/10"
                      : "border-border/80 bg-background/50 hover:border-primary/40 hover:bg-background"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-primary"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-bold text-foreground">{t(`items.${id}.label`)}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{t(`items.${id}.summary`)}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{t("sampleDataNote")}</span>
          </p>
        </div>

        <div className="relative flex min-h-[520px] items-center justify-center lg:min-h-[660px]">
          <div
            aria-hidden="true"
            className="absolute h-72 w-72 rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96"
          />
          <div className="relative rounded-[2.8rem] border border-neutral-700/70 bg-neutral-950 p-2.5 shadow-2xl shadow-black/30 ring-1 ring-black/10">
            <div className="overflow-hidden rounded-[2.2rem] bg-neutral-900">
              <Image
                key={`${locale}-${selected}`}
                src={SCREENSHOT_FILES[locale][selected]}
                alt={t(`items.${selected}.alt`)}
                width={411}
                height={891}
                sizes="(max-width: 768px) 72vw, 300px"
                className="h-auto max-h-[620px] w-auto max-w-[min(72vw,300px)] object-contain"
              />
            </div>
          </div>
          <span className="sr-only" aria-live="polite">{selectedLabel}</span>
        </div>
      </div>
    </SectionWrapper>
  );
}
