import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import { ToastProvider } from '@/registry/default/ui/toast';
import { appName } from '@/lib/shared';

const loveSans = localFont({
  src: [
    {
      path: '../public/fonts/LoveSans-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/LoveSans-LightItalic.woff',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/LoveSans-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/LoveSans-RegularItalic.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/LoveSans-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/LoveSans-MediumItalic.woff',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/LoveSans-Semibold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/LoveSans-SemiboldItalic.woff',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../public/fonts/LoveSans-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/LoveSans-BoldItalic.woff',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-love-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  applicationName: appName,
  title: appName,
  icons: {
    icon: [{ url: '/favicon.ico' }],
    shortcut: ['/favicon.ico'],
    apple: [
      {
        url: '/logo.png',
        sizes: '1254x1254',
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
  return (
    <html lang="en" className={loveSans.variable} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <ToastProvider>
          <RootProvider theme={{ enabled: false }}>{children}</RootProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
