import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import { ToastProvider } from '@/registry/default/ui/toast';
import { AnalyticsProvider } from '@/components/analytics-provider';
import { FumadocsCommandSearch } from '@/components/fumadocs-command-search';
import { appName } from '@/lib/shared';
import {
  seo,
  siteKeywords,
  softwareSourceCodeJsonLd,
  webSiteJsonLd,
} from '@/lib/seo';

const loveSans = localFont({
  src: [
    {
      path: '../public/fonts/LoveSans-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/LoveSans-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/LoveSans-Semibold.woff',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-love-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  applicationName: appName,
  metadataBase: new URL(seo.url),
  title: {
    default: seo.title,
    template: `%s - ${appName}`,
  },
  description: seo.description,
  keywords: siteKeywords,
  authors: [{ name: 'Connor Love', url: seo.githubUrl }],
  creator: 'Connor Love',
  publisher: appName,
  category: 'technology',
  alternates: {
    canonical: '/',
    types: {
      'text/plain': [
        { url: '/llms.txt', title: 'LLM index' },
        { url: '/llms-full.txt', title: 'Full LLM context' },
      ],
    },
  },
  openGraph: {
    type: 'website',
    siteName: appName,
    title: seo.title,
    description: seo.description,
    url: '/',
    images: [
      {
        url: '/logo.png',
        width: 1254,
        height: 1254,
        alt: `${appName} logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: ['/icon.svg'],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: appName,
    statusBarStyle: 'default',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  const jsonLd = [webSiteJsonLd(), softwareSourceCodeJsonLd()];

  return (
    <html
      lang="en"
      className={loveSans.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <AnalyticsProvider />
        <ToastProvider>
          <RootProvider
            search={{ SearchDialog: FumadocsCommandSearch }}
            theme={{ enabled: false }}
          >
            {children}
          </RootProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
