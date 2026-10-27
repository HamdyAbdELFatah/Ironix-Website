"use client";

import * as React from "react";
import { APP_CONFIG } from "@/lib/utils/constants";
import { AppStoreBadge } from "@/components/shared/app-store-badge";
import { GooglePlayBadge } from "@/components/shared/google-play-badge";
import { WaitlistForm } from "@/components/shared/waitlist-form";
import { cn } from "@/lib/utils";

/** Store badges when destinations are configured; use the waitlist if disabled. */
export function GetTheApp({ section, className }: { section: string; className?: string }) {
  if (!APP_CONFIG.hasAnyStoreListing()) {
    return <WaitlistForm source={section} className={className} />;
  }
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <AppStoreBadge section={section} />
      <GooglePlayBadge section={section} />
    </div>
  );
}
