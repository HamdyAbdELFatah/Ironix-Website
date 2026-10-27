"use client";

import * as React from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils/helpers";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const { scrollY } = useScrollPosition();
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";

  const isScrolled = scrollY > 20;

  const navLinks = [
    { label: t("features"), sectionId: "features", href: "/#features" },
    { label: t("screenshots"), sectionId: "screenshots", href: "/#screenshots" },
    { label: t("howItWorks"), sectionId: "how-it-works", href: "/#how-it-works" },
    { label: t("pricing"), sectionId: "pricing", href: "/#pricing" },
    { label: t("faq"), sectionId: "faq", href: "/#faq" },
  ];

  function handleLinkClick(e: React.MouseEvent, sectionId: string) {
    if (isHome) {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 py-3 sm:py-4"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between rounded-full border border-border/80 bg-background/90 px-3 py-2 backdrop-blur-xl transition-shadow duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] sm:px-5",
            isScrolled ? "shadow-xl shadow-black/10" : "shadow-lg shadow-black/5"
          )}
        >
          {/* Authentic Mobile App Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl p-1"
          >
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-amber-500/30 bg-neutral-950 p-1 shadow-lg shadow-amber-500/20 transition-colors duration-200 group-hover:border-amber-400">
              <Image
                src="/assets/logo.png"
                alt="Ironix Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-widest text-foreground font-sans leading-none flex items-center gap-1">
                IRONIX
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) =>
              isHome ? (
                <button
                  key={link.sectionId}
                  onClick={(e) => handleLinkClick(e, link.sectionId)}
                  className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.sectionId}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <LocaleSwitcher />
            <Button
              size="sm"
              onClick={() => scrollToSection("download")}
              className="relative cursor-pointer gap-2 overflow-hidden rounded-full px-5 font-bold text-primary-foreground shadow-lg shadow-amber-500/20 transition-colors hover:bg-amber-400"
            >
              <Download className="w-4 h-4" />
              <span>{t("getApp")}</span>
            </Button>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <LocaleSwitcher />
            <MobileNav isHome={isHome} />
          </div>
        </div>
      </div>
    </header>
  );
}
