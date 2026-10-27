import * as React from "react";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { AppScreenshots } from "@/components/sections/app-screenshots";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { DownloadCta } from "@/components/sections/download-cta";
import { FAQ } from "@/components/sections/faq";
import { setRequestLocale } from "next-intl/server";
import { getStaticPageDoc } from "@/lib/static-pages/static-pages-service";
import { getStoreProducts } from "@/lib/pricing/catalogue";

// ISR: the FAQ and prices come from Supabase and are refreshed every 5 minutes
// (the dashboard can also revalidate on save) instead of on every request.
export const revalidate = 300;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [liveFaq, products] = await Promise.all([getStaticPageDoc("faq", locale), getStoreProducts()]);

  return (
    <>
      <Hero />
      <Features />
      <AppScreenshots />
      <HowItWorks />
      <Pricing products={products} />
      <DownloadCta />
      <FAQ liveData={liveFaq} />
    </>
  );
}
