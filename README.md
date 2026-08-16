# Ironix Landing Page

## Description
Production-ready, SEO-optimized, multilingual landing page for Ironix - Train with purpose. Progress with proof.

## Tech Stack
- Next.js 15+ App Router
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
19 locales supported: Arabic (ar), Czech (cs), Danish (da), German (de), English (en), Spanish (es), Finnish (fi), French (fr), Hebrew (he), Hindi (hi), Italian (it), Japanese (ja), Korean (ko), Portuguese (pt), Romanian (ro), Russian (ru), Swedish (sv), Turkish (tr), Chinese (zh).

## Deployment
Vercel-ready. Push to a branch to trigger a preview deployment, merge to main for production deployment.

## License
Proprietary
