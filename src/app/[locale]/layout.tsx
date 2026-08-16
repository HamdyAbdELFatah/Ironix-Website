import * as React from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { locales, rtlLocales, type Locale } from "@/i18n/config";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/sections/footer";
import { GeoLanguageBanner } from "@/components/layout/geo-language-banner";
import {
  generateSoftwareAppSchema,
  generateOrganizationSchema,
  generateProductSchema
} from "@/lib/seo/structured-data";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale });
  return generateLocalizedMetadata(locale, 'home', t);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRtl = rtlLocales.includes(locale as Locale);
  const direction = isRtl ? "rtl" : "ltr";

  const appSchema = generateSoftwareAppSchema();
  const orgSchema = generateOrganizationSchema();
  const productSchema = generateProductSchema();

  return (
    <div lang={locale} dir={direction} className="flex flex-col min-h-screen">
      {/* Structured Data Scripts (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <NextIntlClientProvider messages={messages} locale={locale}>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <GeoLanguageBanner currentLocale={locale as Locale} />
      </NextIntlClientProvider>
    </div>
  );
}
