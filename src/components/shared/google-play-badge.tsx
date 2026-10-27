import * as React from "react";
import { cn } from "@/lib/utils";
import { APP_CONFIG } from "@/lib/utils/constants";

interface BadgeProps {
  section?: string;
  className?: string;
}

export function GooglePlayBadge({ section = "hero", className }: BadgeProps) {
  const url = APP_CONFIG.storeUrl("android", section);
  // An empty URL means this platform has been explicitly disabled.
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get Ironix on Google Play"
      className={cn(
        "inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border/80 bg-card/80 backdrop-blur-sm text-foreground hover:bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 group active:scale-[0.98]",
        className
      )}
    >
      <svg
        className="w-6 h-6 flex-shrink-0"
        viewBox="0 0 24 24"
      >
        <path
          fill="#4285F4"
          d="M3.609 1.814L13.792 12 3.61 22.186A2.37 2.37 0 0 1 3 20.5V3.5c0-.66.23-1.27.609-1.686z"
        />
        <path
          fill="#FBBC04"
          d="M17.556 8.236l-3.764 3.764 3.764 3.764 4.25-2.43a1.5 1.5 0 0 0 0-2.668l-4.25-2.43z"
        />
        <path
          fill="#EA4335"
          d="M3.609 1.814l10.183 10.186 3.764-3.764-11.66-6.663c-.76-.435-1.64-.176-2.287.241z"
        />
        <path
          fill="#34A853"
          d="M3.609 22.186c.647.417 1.527.676 2.287.241l11.66-6.663-3.764-3.764L3.609 22.186z"
        />
      </svg>
      <div className="flex flex-col text-left rtl:text-right">
        <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground leading-tight">
          GET IT ON
        </span>
        <span className="text-sm font-bold tracking-tight text-foreground leading-tight">
          Google Play
        </span>
      </div>
    </a>
  );
}
