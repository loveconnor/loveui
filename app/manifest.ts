import type { MetadataRoute } from 'next';
import { appName } from '@/lib/shared';
import { seo } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appName,
    short_name: appName,
    description: seo.description,
    id: '/',
    start_url: '/docs',
    scope: '/',
    categories: ['developer tools', 'productivity', 'design'],
    icons: [
      {
        src: '/logo.png',
        sizes: '1254x1254',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo.png',
        sizes: '1254x1254',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
  };
}
