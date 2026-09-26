/**
 * Static & Legal Pages Supabase Fetcher for Ironix-Website
 *
 * Fetches published documents (privacy-policy, terms-of-service, faq) from Supabase `app_content`.
 * Supports dynamic real-time fetching (`cache: 'no-store'`), generous timeout (4s),
 * Markdown/Structured section rendering, and robust graceful fallback to Next-Intl local messages.
 */

export interface StaticPageSection {
  id: string;
  heading: string;
  content: string;
}

export interface StaticPageMetadata {
  version?: string;
  last_updated?: string;
  effective_date?: string;
  summary?: string;
  contact_email?: string;
  sections?: StaticPageSection[];
  [key: string]: any;
}

export interface StaticPageData {
  id: string;
  contentType: string;
  locale: string;
  title: string;
  body: string | null;
  lastUpdated: string;
  version: string;
  effectiveDate: string;
  summary: string;
  contactEmail: string;
  isActive: boolean;
  sections: StaticPageSection[];
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tcvnfbrqxwsdpvfsrhaq.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjdm5mYnJxeHdzZHB2ZnNyaGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MzA1ODksImV4cCI6MjA4MjUwNjU4OX0.9GkPvHSm6MvOyRuAvl5ra1Rw9fCZEWYx5rbp-oCHtzo';

/**
 * Fetch a published static page document by contentType and locale.
 */
export async function getStaticPageDoc(
  contentType: 'privacy-policy' | 'terms-of-service' | 'faq' | string,
  locale: string
): Promise<StaticPageData | null> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/app_content?content_type=eq.${encodeURIComponent(contentType)}&locale=eq.${encodeURIComponent(locale)}&is_active=eq.true&select=*`;
    
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(4000),
    });

    if (!res.ok) {
      return null;
    }

    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      return null;
    }

    const row = rows[0];
    let metadata: StaticPageMetadata = {};
    if (row.metadata) {
      try {
        metadata = typeof row.metadata === 'string' ? JSON.parse(row.metadata) : row.metadata;
      } catch {
        metadata = {};
      }
    }

    let sections: StaticPageSection[] = [];
    if (metadata.sections && Array.isArray(metadata.sections) && metadata.sections.length > 0) {
      sections = metadata.sections;
    } else if (row.body) {
      sections = parseMarkdownToSections(row.body);
    }

    const defaultTitle =
      contentType === 'privacy-policy'
        ? (locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy')
        : contentType === 'faq'
        ? (locale === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions')
        : (locale === 'ar' ? 'شروط الخدمة' : 'Terms of Service');

    return {
      id: row.id,
      contentType: row.content_type,
      locale: row.locale,
      title: row.title || defaultTitle,
      body: row.body,
      lastUpdated: metadata.last_updated || (row.updated_at ? row.updated_at.split('T')[0] : '2026-08-17'),
      version: metadata.version || '1.0',
      effectiveDate: metadata.effective_date || '2026-08-17',
      summary: metadata.summary || '',
      contactEmail: metadata.contact_email || (contentType === 'privacy-policy' ? 'privacy@ironix.app' : contentType === 'faq' ? 'support@ironix.app' : 'legal@ironix.app'),
      isActive: row.is_active ?? true,
      sections,
    };
  } catch {
    return null;
  }
}

/**
 * Parse plain markdown body into section array
 */
function parseMarkdownToSections(md: string): StaticPageSection[] {
  const lines = md.split('\n');
  const parsed: StaticPageSection[] = [];
  let currentHeading = 'Overview';
  let currentContent: string[] = [];
  let sectionIdx = 1;

  for (const line of lines) {
    if (line.startsWith('#') || line.startsWith('##')) {
      if (currentContent.length > 0) {
        parsed.push({
          id: String(sectionIdx++),
          heading: currentHeading,
          content: currentContent.join('\n').trim(),
        });
        currentContent = [];
      }
      currentHeading = line.replace(/^#+\s*/, '').trim();
    } else {
      currentContent.push(line);
    }
  }

  if (currentContent.length > 0 || parsed.length === 0) {
    parsed.push({
      id: String(sectionIdx),
      heading: currentHeading,
      content: currentContent.join('\n').trim(),
    });
  }

  return parsed;
}
