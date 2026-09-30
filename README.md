# Ironix Landing Page

## Description
Production-ready, SEO-optimized, multilingual landing page for Ironix - Train with purpose. Progress with proof.

## Tech Stack
- Next.js 16 App Router (static generation + ISR)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- next-intl

## Setup Instructions

```bash
npm install
npm run dev
```

## Architecture Overview
- `src/app/[locale]/`: Main App router, localized pages
- `src/components/`: Reusable React components and shadcn/ui components
- `src/lib/`: Utility functions and shared helpers
- `src/i18n/`: next-intl configuration and localized text resources

## i18n
Published locales: English (`en`) and Arabic (`ar`, RTL). A locale is added to
`src/i18n/config.ts` only together with a complete translation of the marketing
copy **and** the legal pages.

## Configuration

All brand values come from env vars (see `.env.example`): `NEXT_PUBLIC_SITE_URL`,
`NEXT_PUBLIC_SUPPORT_EMAIL`, the Supabase anon settings and the store URLs. Store
badges stay hidden and the waitlist is shown until a store URL is set. Pro prices
are read from the Supabase `store_products` table (ISR, 5 minutes).

## Content rules

Every claim on the site must be true and verifiable: no download counts, ratings,
testimonials or competitor comparisons unless they are real, and no features the
app does not ship. `e2e/home.spec.ts` guards the claims that were removed.

## Deployment
Vercel-ready. Push to a branch to trigger a preview deployment, merge to main for production deployment.

## License
Proprietary
