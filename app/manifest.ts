import type { MetadataRoute } from 'next';
import { appName } from '@/lib/shared';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appName,
    short_name: appName,
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
