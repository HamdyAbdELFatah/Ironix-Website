const APP_BUNDLE_ID = 'com.ironix';
const APP_STORE_SEARCH_URL = 'https://apps.apple.com/search?term=Ironix';

interface AppStoreSearchResult {
  bundleId?: string;
  trackViewUrl?: string;
}

interface AppStoreSearchResponse {
  results?: AppStoreSearchResult[];
}

function isAppleStoreUrl(value: string): boolean {
  try {
    const hostname = new URL(value).hostname;
    return hostname === 'apps.apple.com' || hostname === 'itunes.apple.com';
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const country = request.headers.get('x-vercel-ip-country')?.toLowerCase();
  const searchUrl = new URL('https://itunes.apple.com/search');
  searchUrl.searchParams.set('term', 'Ironix');
  searchUrl.searchParams.set('media', 'software');
  searchUrl.searchParams.set('limit', '50');
  if (country && /^[a-z]{2}$/.test(country)) {
    searchUrl.searchParams.set('country', country);
  }

  try {
    const response = await fetch(searchUrl, { next: { revalidate: 3600 } });
    if (response.ok) {
      const data = (await response.json()) as AppStoreSearchResponse;
      const listing = data.results?.find(
        (result) => result.bundleId === APP_BUNDLE_ID && result.trackViewUrl
      );

      if (listing?.trackViewUrl && isAppleStoreUrl(listing.trackViewUrl)) {
        return Response.redirect(listing.trackViewUrl, 307);
      }
    }
  } catch {
    // Fall back to App Store search when the listing is not indexed yet or
    // Apple's lookup service is temporarily unavailable.
  }

  return Response.redirect(APP_STORE_SEARCH_URL, 307);
}
