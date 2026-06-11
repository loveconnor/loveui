import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';

const nonSearchPaths = [
  '/api/',
  '/builder',
  '/init',
  '/login',
  '/pro/checkout',
  '/r/',
  '/teams',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          'Googlebot',
          'Google-Extended',
          'Bingbot',
          'DuckDuckBot',
          'Applebot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'GPTBot',
          'ClaudeBot',
          'Claude-User',
          'PerplexityBot',
          'Perplexity-User',
        ],
        allow: '/',
        disallow: nonSearchPaths,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: nonSearchPaths,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
