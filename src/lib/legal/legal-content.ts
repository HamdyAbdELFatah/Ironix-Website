import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { APP_CONFIG } from '@/lib/utils/constants';

/**
 * Legal documents (Privacy Policy and Terms of Service).
 *
 * Full text exists only in English and Arabic. Every other locale renders the
 * English text, preceded by a localized notice, so that a legal statement is
 * never shown in an outdated or machine-translated form.
 */
export type LegalDocType = 'privacy' | 'terms';

export const NATIVE_LEGAL_LOCALES = ['en', 'ar'] as const;
export type NativeLegalLocale = (typeof NATIVE_LEGAL_LOCALES)[number];

export interface LegalSection {
  id: string;
  heading: string;
  content: string;
}

export interface LegalChrome {
  backToHome: string;
  badge: string;
  contactTitle: string;
  contactText: string;
  contactEmail: string;
}

export interface LegalDocument {
  locale: Locale;
  contentLocale: NativeLegalLocale;
  isFallback: boolean;
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
  chrome: LegalChrome;
  /** Localized "provided in English" notice; null when no fallback is used. */
  notice: string | null;
}

export interface LegalMetadata {
  title: string;
  description: string;
}

type Messages = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

/** Legal copy writes the contact address as `{email}`; it is filled from APP_CONFIG. */
function withContactEmail(text: string): string {
  return text.replaceAll('{email}', APP_CONFIG.support.email);
}

function normalizeLocale(locale: string): Locale {
  return (locales as readonly string[]).includes(locale) ? (locale as Locale) : defaultLocale;
}

export function resolveLegalContentLocale(locale: string): NativeLegalLocale {
  return (NATIVE_LEGAL_LOCALES as readonly string[]).includes(locale)
    ? (locale as NativeLegalLocale)
    : 'en';
}

async function loadMessages(locale: string): Promise<Messages> {
  return (await import(`../../i18n/messages/${locale}.json`)).default;
}

/** Metadata stays localized (each locale file keeps its own title/description). */
export async function getLegalMetadata(
  doc: LegalDocType,
  locale: string
): Promise<LegalMetadata> {
  const safeLocale = normalizeLocale(locale);
  const messages = await loadMessages(safeLocale);
  return {
    title: messages[doc].title,
    description: messages[doc].metadata.description,
  };
}

export async function getLegalDocument(
  doc: LegalDocType,
  locale: string
): Promise<LegalDocument> {
  const safeLocale = normalizeLocale(locale);
  const contentLocale = resolveLegalContentLocale(safeLocale);
  const isFallback = contentLocale !== safeLocale;

  const content = await loadMessages(contentLocale);
  const section = content[doc];
  const legal = content.legal;

  const sections: LegalSection[] = Object.keys(section.sections)
    .sort((a, b) => Number(a) - Number(b))
    .map((id) => ({
      id,
      heading: section.sections[id].heading,
      content: withContactEmail(section.sections[id].content),
    }));

  let notice: string | null = null;
  if (isFallback) {
    const localized = await loadMessages(safeLocale);
    notice = localized.legal?.englishNotice ?? 'This document is provided in English.';
  }

  return {
    locale: safeLocale,
    contentLocale,
    isFallback,
    title: section.title,
    lastUpdated: section.lastUpdated,
    sections,
    chrome: {
      backToHome: legal.backToHome,
      badge: legal.badge,
      contactTitle: legal[`${doc}ContactTitle`],
      contactText: legal[`${doc}ContactText`],
      contactEmail: APP_CONFIG.support.email,
    },
    notice,
  };
}
