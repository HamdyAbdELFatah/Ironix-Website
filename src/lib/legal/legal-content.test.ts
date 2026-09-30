import { describe, it, expect } from 'vitest';
import { locales } from '@/i18n/config';
import { APP_CONFIG } from '@/lib/utils/constants';
import {
  getLegalDocument,
  getLegalMetadata,
  resolveLegalContentLocale,
  type LegalDocType,
} from './legal-content';

const DOCS: LegalDocType[] = ['privacy', 'terms'];

describe('legal content resolution', () => {
  it('serves every published locale natively', () => {
    expect(resolveLegalContentLocale('en')).toBe('en');
    expect(resolveLegalContentLocale('ar')).toBe('ar');
    for (const l of locales) expect(resolveLegalContentLocale(l)).toBe(l);
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
    }
  });

  it('describes the real product and avoids unsupported claims', async () => {
    const privacy = (await getLegalDocument('privacy', 'en')).sections.map((s) => s.content).join('\n');
    for (const term of ['Supabase', 'RevenueCat', 'PostHog', 'Firebase', '180 days', APP_CONFIG.support.email, 'Standard Contractual Clauses']) {
      expect(privacy).toContain(term);
    }
    const terms = (await getLegalDocument('terms', 'en')).sections.map((s) => s.content).join('\n');
    for (const term of ['auto-renew', APP_CONFIG.support.email, '[Governing law and jurisdiction]', 'Settings > Delete account']) {
      expect(terms.toLowerCase()).toContain(term.toLowerCase());
    }
  });

  it.each(['en', 'ar'])('%s: never mentions features the app does not ship or a domain we do not own', async (locale) => {
    for (const doc of DOCS) {
      const text = (await getLegalDocument(doc, locale)).sections.map((s) => s.content).join('\n');
      expect(text).not.toMatch(/Gemini|AI coach|مدرب الذكاء الاصطناعي|ironix\.app|\{email\}/);
    }
  });
});
