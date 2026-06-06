import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { HomeHeader } from '@/components/home-header';
import { baseOptions } from '@/lib/layout.shared';

export default function TeamsLayout({ children }: { children: ReactNode }) {
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
