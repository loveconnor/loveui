import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import { ToastProvider } from '@/registry/default/ui/toast';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <ToastProvider>
          <RootProvider theme={{ enabled: false }}>{children}</RootProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
