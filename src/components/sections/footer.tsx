"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { WaitlistForm } from "@/components/shared/waitlist-form";
import { scrollToSection } from "@/lib/utils/helpers";
import { APP_CONFIG } from "@/lib/utils/constants";

const SECTION_LINKS = [
  { key: "features", sectionId: "features" },
  { key: "howItWorks", sectionId: "how-it-works" },
  { key: "pricing", sectionId: "pricing" },
  { key: "faq", sectionId: "faq" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const email = APP_CONFIG.support.email;

  return (
    <footer className="bg-card/90 border-t border-border/80 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-950 border border-amber-500/30 flex items-center justify-center p-1">
                <Image src="/assets/logo.png" alt="" width={36} height={36} className="w-full h-full object-contain" />
              </span>
              <span className="text-2xl font-black tracking-widest">{t("brand")}</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">{t("tagline")}</p>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground block mb-1">{t("contact")}</span>
              <a href={`mailto:${email}`} dir="ltr" className="text-primary hover:underline font-semibold break-all">
                {email}
              </a>
            </div>
          </div>

          <nav className="lg:col-span-2 space-y-3" aria-label={t("product")}>
            <h4 className="text-xs font-bold uppercase tracking-wider">{t("product")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {SECTION_LINKS.map(({ key, sectionId }) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(sectionId)}
                    className="hover:text-primary transition-colors cursor-pointer text-start"
                  >
                    {t(`links.${key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2 space-y-3" aria-label={t("legal")}>
            <h4 className="text-xs font-bold uppercase tracking-wider">{t("legal")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                  {t("links.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-primary transition-colors">
                  {t("links.terms")}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider">{t("waitlistTitle")}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{t("waitlistText")}</p>
            <WaitlistForm source="footer" compact />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>{t("copyright")}</div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
