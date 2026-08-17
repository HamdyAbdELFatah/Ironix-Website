import * as React from "react";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Showcase } from "@/components/sections/showcase";
import { SplitCalculator } from "@/components/sections/split-calculator";
import { Comparison } from "@/components/sections/comparison";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { DownloadCta } from "@/components/sections/download-cta";
import { FAQ } from "@/components/sections/faq";
import { getStaticPageDoc } from "@/lib/static-pages/static-pages-service";

export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const liveFaq = await getStaticPageDoc("faq", locale);

  return (
    <>
      <Hero />
      <Features />
      <Showcase />
      <SplitCalculator />
      <Comparison />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <DownloadCta />
      <FAQ liveData={liveFaq} />
    </>
  );
}
