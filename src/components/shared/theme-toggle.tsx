"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      data-testid="theme-toggle"
      aria-label={t("toggleTheme")}
      aria-pressed={isDark}
      onClick={toggleTheme}
      className={cn(
        "theme-toggle-button relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_22px_-10px_var(--primary)] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <Moon className="theme-toggle-icon theme-toggle-icon--moon h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
      <Sun className="theme-toggle-icon theme-toggle-icon--sun h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
    </button>
  );
}
