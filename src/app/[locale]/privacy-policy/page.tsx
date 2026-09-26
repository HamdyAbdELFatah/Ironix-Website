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
  const { title, description } = await getLegalMetadata("privacy", locale);
  return { title, description };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = await getLegalDocument("privacy", locale);
  return <LegalPage type="privacy" doc={doc} />;
}
