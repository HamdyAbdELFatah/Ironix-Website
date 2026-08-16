"use client";

import * as React from "react";
import Image from "next/image";
import { Download, Sparkles } from "lucide-react";
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
    { label: t("splitCalculator"), sectionId: "split-calculator", href: "/#split-calculator" },
    { label: t("comparison"), sectionId: "comparison", href: "/#comparison" },
    { label: t("howItWorks"), sectionId: "how-it-works", href: "/#how-it-works" },
    { label: t("pricing"), sectionId: "pricing", href: "/#pricing" },
    { label: t("testimonials"), sectionId: "testimonials", href: "/#testimonials" },
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
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/80 py-3 shadow-xl shadow-black/20"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Authentic Mobile App Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl p-1"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-amber-500/20 border border-amber-500/30 group-hover:scale-105 group-hover:border-amber-400 transition-all duration-200 bg-neutral-950 flex items-center justify-center p-1">
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
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse" />
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-bold">
                WORKOUT OS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-card/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/80 shadow-inner">
            {navLinks.map((link) =>
              isHome ? (
                <button
                  key={link.sectionId}
                  onClick={(e) => handleLinkClick(e, link.sectionId)}
                  className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-full transition-all cursor-pointer"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.sectionId}
                  href={link.href}
                  className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-full transition-all"
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
              className="gap-2 px-5 rounded-full bg-primary hover:bg-amber-400 text-primary-foreground font-bold shadow-lg shadow-amber-500/25 transition-transform hover:scale-105 active:scale-95 cursor-pointer relative overflow-hidden"
            >
              <Download className="w-4 h-4" />
              <span>{t("download")}</span>
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
