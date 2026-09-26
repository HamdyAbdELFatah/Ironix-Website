import { describe, it, expect } from 'vitest';
import { locales } from '@/i18n/config';
import {
  getLegalDocument,
  getLegalMetadata,
  resolveLegalContentLocale,
  type LegalDocType,
} from './legal-content';

const DOCS: LegalDocType[] = ['privacy', 'terms'];
const FALLBACK_LOCALES = locales.filter((l) => l !== 'en' && l !== 'ar');

describe('legal content resolution', () => {
  it('serves en and ar natively and everything else from English', () => {
    expect(resolveLegalContentLocale('en')).toBe('en');
    expect(resolveLegalContentLocale('ar')).toBe('ar');
    for (const l of FALLBACK_LOCALES) expect(resolveLegalContentLocale(l)).toBe('en');
    expect(FALLBACK_LOCALES).toHaveLength(17);
  });

  it.each(DOCS)('%s: English document is complete and ordered', async (doc) => {
    const d = await getLegalDocument(doc, 'en');
    expect(d.isFallback).toBe(false);
    expect(d.notice).toBeNull();
    expect(d.lastUpdated).toBe('Last updated: September 25, 2026');
    expect(d.sections.length).toBe(doc === 'privacy' ? 13 : 15);
    expect(d.sections.map((s) => s.id)).toEqual(d.sections.map((_, i) => String(i + 1)));
    for (const s of d.sections) {
      expect(s.heading.length).toBeGreaterThan(3);
      expect(s.content.length).toBeGreaterThan(40);
    }
  });

  it.each(DOCS)('%s: Arabic document mirrors the English structure', async (doc) => {
    const en = await getLegalDocument(doc, 'en');
    const ar = await getLegalDocument(doc, 'ar');
    expect(ar.isFallback).toBe(false);
    expect(ar.notice).toBeNull();
    expect(ar.sections.length).toBe(en.sections.length);
    expect(ar.lastUpdated).toContain('2026');
    expect(ar.sections[0].heading).toMatch(/[؀-ۿ]/);
    // Placeholders and contact emails must match across languages.
    const tokens = (d: typeof en) =>
      [...new Set(d.sections.flatMap((s) => s.content.match(/\[[A-Z][^\]]+\]/g) ?? []))].sort();
    expect(tokens(ar)).toEqual(tokens(en));
    expect(tokens(en).length).toBeGreaterThan(0);
  });

  it.each(DOCS)('%s: fallback locales render the English text with a notice', async (doc) => {
    const en = await getLegalDocument(doc, 'en');
    for (const l of FALLBACK_LOCALES) {
      const d = await getLegalDocument(doc, l);
      expect(d.isFallback).toBe(true);
      expect(d.contentLocale).toBe('en');
      expect(d.sections).toEqual(en.sections);
      expect(d.title).toBe(en.title);
      expect(d.notice).toBeTruthy();
    }
    expect((await getLegalDocument(doc, 'es')).notice).toBe('Este documento se ofrece en inglés.');
  });

  it('unknown locales fall back to English', async () => {
    const d = await getLegalDocument('privacy', 'xx');
    expect(d.locale).toBe('en');
    expect(d.isFallback).toBe(false);
  });

  it('keeps localized metadata for every locale', async () => {
    for (const doc of DOCS) {
      for (const l of locales) {
        const m = await getLegalMetadata(doc, l);
        expect(m.title).toBeTruthy();
        expect(m.description).toBeTruthy();
      }
    }
  });

  it('no locale still carries the obsolete template text', async () => {
    for (const l of locales) {
      const messages = (await import(`../../i18n/messages/${l}.json`)).default;
      expect(JSON.stringify(messages.privacy) + JSON.stringify(messages.terms)).not.toMatch(
        /on-demand services|facilitate payments|Last Updated: August/
      );
      if (l !== 'en' && l !== 'ar') {
        expect(messages.privacy.sections).toBeUndefined();
        expect(messages.terms.sections).toBeUndefined();
      }
    }
  });

  it('describes the real product and avoids unsupported claims', async () => {
    const privacy = (await getLegalDocument('privacy', 'en')).sections.map((s) => s.content).join('\n');
    for (const term of ['Supabase', 'RevenueCat', 'PostHog', 'Firebase', 'Strava', 'Gemini', '180 days', 'privacy@ironix.app', 'Standard Contractual Clauses']) {
      expect(privacy).toContain(term);
    }
    const terms = (await getLegalDocument('terms', 'en')).sections.map((s) => s.content).join('\n');
    for (const term of ['auto-renew', 'legal@ironix.app', '[Governing law and jurisdiction]', 'Settings > Delete account']) {
      expect(terms.toLowerCase()).toContain(term.toLowerCase());
    }
  });
});
