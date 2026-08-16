import * as React from "react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Shield, Calendar, Mail, CheckCircle2 } from "lucide-react";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo/structured-data";
import { getStaticPageDoc } from "@/lib/static-pages/static-pages-service";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  const liveDoc = await getStaticPageDoc("privacy-policy", locale);

  const title = liveDoc?.title || t("title");
  const description = liveDoc?.summary || t("metadata.description");

  return {
    title,
    description,
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  // 1. Fetch live document managed from Ironix Dashboard
  const liveDoc = await getStaticPageDoc("privacy-policy", locale);

  const sectionIds = ["1", "2", "3", "4", "5", "6", "7", "8"];

  // Use live dashboard sections or fallback to local next-intl dictionary
  const title = liveDoc?.title || t("title");
  const lastUpdatedText = liveDoc?.lastUpdated
    ? `Last Updated: ${liveDoc.lastUpdated}`
    : t("lastUpdated");
  const contactEmail = liveDoc?.contactEmail || "privacy@ironix.app";
  const summaryText = liveDoc?.summary || null;

  const sections = liveDoc?.sections && liveDoc.sections.length > 0
    ? liveDoc.sections
    : sectionIds.map((id) => ({
        id,
        heading: t(`sections.${id}.heading`),
        content: t(`sections.${id}.content`),
      }));

  const breadcrumbLd = generateBreadcrumbSchema([
    { name: "Home", url: `https://ironix.app/${locale}` },
    { name: title, url: `https://ironix.app/${locale}/privacy-policy` },
  ]);

  const webPageLd = generateWebPageSchema(
    title,
    summaryText || t("metadata.description"),
    `https://ironix.app/${locale}/privacy-policy`
  );

  return (
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="border-b border-border/60 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>LEGAL DOCUMENT {liveDoc?.version ? `• v${liveDoc.version}` : ""}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground font-sans tracking-tight mb-3">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>{lastUpdatedText}</span>
          </div>
          {summaryText && (
            <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed p-4 rounded-xl bg-card/40 border border-border/50">
              {summaryText}
            </p>
          )}
        </div>

        {/* Policy Sections */}
        <div className="space-y-8 text-foreground/90">
          {sections.map((sec, index) => (
            <section
              key={sec.id || index}
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

          {/* Contact Box */}
          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">
                Questions about your privacy?
              </div>
              <div className="text-xs text-muted-foreground">
                Email our Data Protection team at{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-primary hover:underline font-semibold"
                >
                  {contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
