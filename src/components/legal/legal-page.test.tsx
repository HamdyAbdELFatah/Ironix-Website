import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

import PrivacyPage from '@/app/[locale]/privacy-policy/page';
import TermsPage from '@/app/[locale]/terms-of-service/page';

const pages = [
  { name: 'privacy', Page: PrivacyPage, en: 'Privacy Policy', ar: 'سياسة الخصوصية', enHeading: /Information we collect/i, arHeading: 'المعلومات التي نجمعها', email: 'privacy@ironix.app' },
  { name: 'terms', Page: TermsPage, en: 'Terms of Service', ar: 'شروط الاستخدام والخدمة', enHeading: /Subscriptions, free trials/i, arHeading: 'الاشتراكات والتجارب المجانية والفوترة والإلغاء والاسترداد', email: 'legal@ironix.app' },
];

type PageComponent = (props: { params: Promise<{ locale: string }> }) => Promise<React.ReactElement>;

async function renderPage(Page: PageComponent, locale: string) {
  const ui = await Page({ params: Promise.resolve({ locale }) });
  return render(ui);
}

afterEach(cleanup);

describe.each(pages)('$name page', ({ Page, en, ar, enHeading, arHeading, email }) => {
  it('renders in English without a notice', async () => {
    await renderPage(Page, 'en');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(en);
    expect(screen.getByRole('heading', { name: enHeading })).toBeInTheDocument();
    expect(screen.getByText('Last updated: September 25, 2026')).toBeInTheDocument();
    expect(screen.queryByTestId('legal-english-notice')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: email })).toHaveAttribute('href', `mailto:${email}`);
  });

  it('renders in Arabic with Arabic headings and chrome', async () => {
    await renderPage(Page, 'ar');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(ar);
    expect(screen.getByRole('heading', { name: new RegExp(arHeading) })).toBeInTheDocument();
    expect(screen.getByText('العودة إلى الصفحة الرئيسية')).toBeInTheDocument();
    expect(screen.getByText('آخر تحديث: 25 سبتمبر 2026')).toBeInTheDocument();
    expect(screen.queryByTestId('legal-english-notice')).not.toBeInTheDocument();
  });

  it('falls back to English with a localized notice for es', async () => {
    const { container } = await renderPage(Page, 'es');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(en);
    expect(screen.getByRole('heading', { name: enHeading })).toBeInTheDocument();
    expect(screen.getByTestId('legal-english-notice')).toHaveTextContent('Este documento se ofrece en inglés.');
    expect(container.querySelector('[lang="en"]')).not.toBeNull();
  });
});
