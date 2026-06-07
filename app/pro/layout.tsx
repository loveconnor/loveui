import type { ReactNode } from 'react';
import '../route-shell.css';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { HomeHeader } from '@/components/home-header';
import { AppProviders } from '@/components/app-providers';

export default function ProLayout({ children }: { children: ReactNode }) {
  const layoutOptions = baseOptions();

  return (
    <AppProviders>
      <HomeLayout
        {...layoutOptions}
        slots={{ ...layoutOptions.slots, header: HomeHeader }}
      >
        {children}
      </HomeLayout>
    </AppProviders>
  );
}
