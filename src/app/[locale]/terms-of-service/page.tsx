import * as React from "react";
import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { getLegalDocument, getLegalMetadata } from "@/lib/legal/legal-content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { title, description } = await getLegalMetadata("terms", locale);
  return { title, description };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = await getLegalDocument("terms", locale);
  return <LegalPage type="terms" doc={doc} />;
}
