"use client";

import * as React from "react";
import { Globe, Check } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();

  function onSelectLocale(nextLocale: Locale) {
    if (nextLocale === currentLocale) return;
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isPending}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-foreground/80 hover:text-foreground hover:bg-muted font-medium transition-colors cursor-pointer text-xs uppercase tracking-wider outline-none focus-visible:ring-2 focus-visible:ring-primary",
          className
        )}
        aria-label="Switch Language"
      >
        <Globe className="h-4 w-4 text-primary" />
        <span className="font-semibold">{currentLocale}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 p-1 bg-card/95 backdrop-blur-xl border-border/80 shadow-2xl rounded-2xl"
      >
        <div className="px-3 py-2 text-xs font-semibold text-muted-foreground border-b border-border/50">
          Select Language
        </div>
        <ScrollArea className="h-64 py-1">
          {locales.map((loc) => {
            const isSelected = loc === currentLocale;
            return (
              <DropdownMenuItem
                key={loc}
                onClick={() => onSelectLocale(loc)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 text-xs rounded-xl cursor-pointer transition-colors",
                  isSelected
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-foreground hover:bg-muted/80"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="uppercase text-[10px] font-mono text-muted-foreground w-6">
                    {loc}
                  </span>
                  <span>{localeNames[loc]}</span>
                </div>
                {isSelected && <Check className="h-3.5 w-3.5 text-primary" />}
              </DropdownMenuItem>
            );
          })}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
