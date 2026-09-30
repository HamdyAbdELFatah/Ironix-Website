import { MetadataRoute } from 'next';
import { APP_CONFIG } from '@/lib/utils/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${APP_CONFIG.url}/sitemap.xml`,
  };
}
