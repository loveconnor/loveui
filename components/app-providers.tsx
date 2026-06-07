import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';

import { AnalyticsProvider } from '@/components/analytics-provider';
import { FumadocsCommandSearch } from '@/components/fumadocs-command-search';
import { loveSans } from '@/lib/love-sans';
import { ToastProvider } from '@/registry/default/ui/toast';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <AnalyticsProvider />
      <div className={`${loveSans.variable} font-sans`}>
        <ToastProvider>
          <RootProvider
            search={{ SearchDialog: FumadocsCommandSearch }}
            theme={{ enabled: false }}
          >
            {children}
          </RootProvider>
        </ToastProvider>
      </div>
    </>
  );
}
