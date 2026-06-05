import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
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
