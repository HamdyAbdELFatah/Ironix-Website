import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const host = "https://ironix.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  // Create language alternate mappings
  const homeLanguages: Record<string, string> = {
    'x-default': `${host}/en`,
  };
  const privacyLanguages: Record<string, string> = {
    'x-default': `${host}/en/privacy-policy`,
  };
  const termsLanguages: Record<string, string> = {
    'x-default': `${host}/en/terms-of-service`,
  };

  locales.forEach((l) => {
    homeLanguages[l] = `${host}/${l}`;
    privacyLanguages[l] = `${host}/${l}/privacy-policy`;
    termsLanguages[l] = `${host}/${l}/terms-of-service`;
  });

  locales.forEach((locale) => {
    // Home page
    entries.push({
      url: `${host}/${locale}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: homeLanguages,
      },
    });

    // Privacy Policy
    entries.push({
      url: `${host}/${locale}/privacy-policy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: {
        languages: privacyLanguages,
      },
    });

    // Terms of Service
    entries.push({
      url: `${host}/${locale}/terms-of-service`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: {
        languages: termsLanguages,
      },
    });
  });

  return entries;
}
