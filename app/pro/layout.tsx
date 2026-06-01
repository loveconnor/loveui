import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { HomeHeader } from '@/components/home-header';

export default function ProLayout({ children }: { children: ReactNode }) {
  const layoutOptions = baseOptions();

  return (
    <HomeLayout
      {...layoutOptions}
      slots={{ ...layoutOptions.slots, header: HomeHeader }}
    >
      {children}
    </HomeLayout>
  );
}
