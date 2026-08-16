"use client";

import * as React from "react";
import Image from "next/image";
import { Send, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { scrollToSection } from "@/lib/utils/helpers";

export function Footer() {
  const t = useTranslations("footer");
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="bg-card/90 border-t border-border/80 text-foreground transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-neutral-950 border border-amber-500/30 shadow-md shadow-amber-500/15 group-hover:scale-105 transition-transform duration-200 flex items-center justify-center p-1">
                <Image
                  src="/assets/logo.png"
                  alt="Ironix Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-black tracking-widest text-foreground font-sans">
                {t("brand")}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {t("tagline")}
            </p>
            
            {/* Live SQLite Engine Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border text-[11px] font-mono text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Room DB v2.4 • 100% Offline Ready</span>
            </div>

            <div className="text-xs text-muted-foreground pt-1">
              <span>Contact: </span>
              <a
                href="mailto:support@ironix.app"
                className="text-primary hover:underline font-semibold"
              >
                support@ironix.app
              </a>
            </div>
          </div>

          {/* Column 2: Product Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-sans">
              {t("productLinks")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={() => scrollToSection("features")}
                  className="hover:text-primary transition-colors cursor-pointer text-left rtl:text-right"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("showcase")}
                  className="hover:text-primary transition-colors cursor-pointer text-left rtl:text-right"
                >
                  Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("split-calculator")}
                  className="hover:text-primary transition-colors cursor-pointer text-left rtl:text-right"
                >
                  Split Predictor
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("comparison")}
                  className="hover:text-primary transition-colors cursor-pointer text-left rtl:text-right"
                >
                  Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="hover:text-primary transition-colors cursor-pointer text-left rtl:text-right"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="hover:text-primary transition-colors cursor-pointer text-left rtl:text-right"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("download")}
                  className="hover:text-primary transition-colors cursor-pointer text-left rtl:text-right"
                >
                  Download
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-sans">
              {t("legalLinks")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-primary transition-colors block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-primary transition-colors block"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="hover:text-primary transition-colors cursor-pointer text-left rtl:text-right"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-sans">
              Stay Connected
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("newsletter")}
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Thank you! You are subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="athlete@example.com"
                  className="bg-background/80 text-xs rounded-xl border-border/80 focus-visible:ring-primary h-10"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-primary hover:bg-amber-400 text-primary-foreground rounded-xl px-4 h-10 flex-shrink-0 font-bold cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
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
