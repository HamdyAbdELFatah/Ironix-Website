"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { joinWaitlist, readUtm, type WaitlistResult } from "@/lib/waitlist/join-waitlist";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; error: Extract<WaitlistResult, { ok: false }>["error"] };

interface WaitlistFormProps {
  /** Where the form sits on the page, stored with the sign-up (hero, cta, footer). */
  source: string;
  className?: string;
  compact?: boolean;
}

export function WaitlistForm({ source, className, compact = false }: WaitlistFormProps) {
  const t = useTranslations("waitlist");
  const locale = useLocale();
  const inputId = React.useId();
  const messageId = React.useId();
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>({ kind: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "sending" });
    const result = await joinWaitlist({
      email,
      locale,
      source,
      utm: typeof window === "undefined" ? {} : readUtm(window.location.search),
    });
    if (result.ok) {
      setStatus({ kind: "done" });
      setEmail("");
    } else {
      setStatus({ kind: "error", error: result.error });
    }
  }

  if (status.kind === "done") {
    return (
      <div
        role="status"
        className={cn(
          "flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 text-sm font-semibold",
          className
        )}
      >
        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
        <span>{t("success")}</span>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("w-full max-w-md space-y-2", className)}>
      <label htmlFor={inputId} className="sr-only">
        {t("label")}
      </label>
      <div className="flex gap-2">
        <Input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          dir="ltr"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status.kind === "error") setStatus({ kind: "idle" });
          }}
          placeholder={t("placeholder")}
          aria-invalid={status.kind === "error"}
          aria-describedby={messageId}
          className={cn("bg-background/80 rounded-xl border-border/80 focus-visible:ring-primary", compact ? "h-10 text-xs" : "h-12 text-sm")}
        />
        <Button
          type="submit"
          disabled={sending}
          className={cn(
            "bg-primary hover:bg-amber-400 text-primary-foreground rounded-xl px-5 flex-shrink-0 font-bold cursor-pointer",
            compact ? "h-10" : "h-12"
          )}
        >
          {sending ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden /> : null}
          <span>{sending ? t("submitting") : t("submit")}</span>
        </Button>
      </div>
      <p
        id={messageId}
        aria-live="polite"
        className={cn("text-xs", status.kind === "error" ? "text-destructive font-medium" : "text-muted-foreground")}
      >
        {status.kind === "error" ? t(`errors.${status.error}`) : t("privacy")}
      </p>
    </form>
  );
}
