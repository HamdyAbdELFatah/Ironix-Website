import * as React from "react";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Shield, Scale, Calendar, Mail, Languages } from "lucide-react";
import type { LegalDocument, LegalDocType } from "@/lib/legal/legal-content";

const ICONS = { privacy: Shield, terms: Scale } as const;

export function LegalPage({ type, doc }: { type: LegalDocType; doc: LegalDocument }) {
  const Icon = ICONS[type];
  // Body text may be in a different language than the surrounding page (fallback locales).
  const bodyLang = doc.isFallback ? doc.contentLocale : undefined;

  return (
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          lang={bodyLang}
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
          <span>{doc.chrome.backToHome}</span>
        </Link>

        {doc.notice && (
          <div
            role="note"
            data-testid="legal-english-notice"
            className="flex items-center gap-2.5 text-sm text-muted-foreground mb-6 p-4 rounded-xl bg-card/40 border border-border/50"
          >
            <Languages className="w-4 h-4 text-primary flex-shrink-0" />
            <span lang={doc.locale}>{doc.notice}</span>
          </div>
        )}

        <div lang={bodyLang}>
          <div className="border-b border-border/60 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Icon className="w-3.5 h-3.5" />
              <span>{doc.chrome.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-foreground font-sans tracking-tight mb-3">
              {doc.title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>{doc.lastUpdated}</span>
            </div>
          </div>

          <div className="space-y-8 text-foreground/90">
            {doc.sections.map((sec, index) => (
              <section
                key={sec.id}
                className="p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-sm space-y-3 transition-all hover:border-primary/30"
              >
                <h2 className="text-xl font-bold text-foreground font-sans flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-primary/20 text-primary text-xs flex items-center justify-center font-mono font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span>{sec.heading}</span>
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {sec.content}
                </p>
              </section>
            ))}

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">{doc.chrome.contactTitle}</div>
                <div className="text-xs text-muted-foreground">
                  {doc.chrome.contactText}{" "}
                  <a
                    href={`mailto:${doc.chrome.contactEmail}`}
                    className="text-primary hover:underline font-semibold"
                  >
                    {doc.chrome.contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
