import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
const posthogIngestPath = (
  process.env.NEXT_PUBLIC_POSTHOG_INGEST_PATH ?? '/_lui'
).replace(/\/+$/, '');
const posthogApiHost = process.env.POSTHOG_API_HOST ?? 'https://us.i.posthog.com';
const posthogAssetsHost =
  process.env.POSTHOG_ASSETS_HOST ?? 'https://us-assets.i.posthog.com';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  async headers() {
    return [
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source:
          '/:asset(page-light.webp|page-dark.webp|logo.png|icon.svg|apple-icon.png|favicon.ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: `${posthogIngestPath}/static/:path*`,
        destination: `${posthogAssetsHost}/static/:path*`,
      },
      {
        source: `${posthogIngestPath}/array/:path*`,
        destination: `${posthogAssetsHost}/array/:path*`,
      },
      {
        source: `${posthogIngestPath}/:path*`,
        destination: `${posthogApiHost}/:path*`,
      },
    ];
  },
  outputFileTracingIncludes: {
    '/blocks/*': [
      './packages/loveui-pro/components/**/*',
      './packages/loveui-pro/registry/**/*',
      './packages/loveui-pro/types/**/*',
    ],
    '/charts/*': [
      './packages/loveui-pro/components/**/*',
      './packages/loveui-pro/registry/**/*',
      './packages/loveui-pro/public/r/**/*',
    ],
    '/pro/r/*': ['./packages/loveui-pro/public/r/**/*'],
  },
  experimental: {
    lockDistDir: false,
  },
};

export default withMDX(config);
