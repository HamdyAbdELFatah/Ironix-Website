"use client";

import * as React from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { GetTheApp } from "@/components/shared/get-the-app";
import { scrollToSection } from "@/lib/utils/helpers";

interface MobileNavProps {
  isHome?: boolean;
}

export function MobileNav({ isHome = true }: MobileNavProps) {
  const t = useTranslations("nav");
  const [open, setOpen] = React.useState(false);

  const navLinks = [
    { label: t("features"), sectionId: "features", href: "/#features" },
    { label: t("howItWorks"), sectionId: "how-it-works", href: "/#how-it-works" },
    { label: t("pricing"), sectionId: "pricing", href: "/#pricing" },
    { label: t("faq"), sectionId: "faq", href: "/#faq" },
  ];

  function handleNavClick(sectionId: string) {
    setOpen(false);
    if (isHome) {
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 150);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="w-10 h-10 rounded-full lg:hidden text-foreground hover:text-primary inline-flex items-center justify-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={t("openMenu")}
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[360px] bg-card/95 backdrop-blur-2xl border-border/80 flex flex-col justify-between p-6"
      >
        <div className="space-y-6">
          <SheetHeader className="text-left rtl:text-right pb-4 border-b border-border/50">
            <SheetTitle className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-amber-500/30 bg-neutral-950 flex items-center justify-center p-1">
                <Image
                  src="/assets/logo.png"
                  alt="Ironix Logo"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-extrabold tracking-widest text-foreground font-sans">
                IRONIX
              </span>
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) =>
              isHome ? (
                <button
                  key={link.sectionId}
                  onClick={() => handleNavClick(link.sectionId)}
                  className="flex items-center px-4 py-3 text-base font-semibold rounded-xl text-foreground/90 hover:text-primary hover:bg-muted/80 transition-colors text-left rtl:text-right cursor-pointer"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.sectionId}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-3 text-base font-semibold rounded-xl text-foreground/90 hover:text-primary hover:bg-muted/80 transition-colors text-left rtl:text-right"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
              {t("preferences")}
            </span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LocaleSwitcher />
            </div>
          </div>

          <GetTheApp section="mobile-menu" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
