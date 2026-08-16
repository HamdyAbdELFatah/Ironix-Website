import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, Locale } from './i18n/config';
import { detectBestLocale } from './lib/geo/geo-detector';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle root URL / directly with our advanced Geolocation & Device Language detector
  if (pathname === '/' || pathname === '') {
    const country =
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('cf-ipcountry') ||
      request.headers.get('cloudfront-viewer-country') ||
      request.headers.get('x-country-code') ||
      request.headers.get('geo-country');

    const acceptLanguage = request.headers.get('accept-language');
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

    const targetLocale: Locale = detectBestLocale(
      { country, acceptLanguage },
      cookieLocale
    );

    const redirectUrl = new URL(`/${targetLocale}`, request.url);
    const response = NextResponse.redirect(redirectUrl, 307);
    
    // Set headers for downstream geo awareness
    if (country) {
      response.headers.set('x-detected-country', country);
    }
    response.headers.set('x-detected-locale', targetLocale);
    return response;
  }

  // Allow next-intl to handle localized routes (/en, /ar, etc.)
  const response = intlMiddleware(request);

  // Propagate detected country header for client use
  const country =
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('cloudfront-viewer-country') ||
    request.headers.get('x-country-code');
  if (country && response) {
    response.headers.set('x-detected-country', country);
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|robots\\.txt|sitemap\\.xml|manifest\\.json|favicon\\.ico|.*\\..*).*)'],
};
