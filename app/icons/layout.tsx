import type { ReactNode } from 'react';
import '../route-shell.css';
import { AppProviders } from '@/components/app-providers';

export const dynamic = 'force-dynamic';

export default function Layout({ children }: { children: ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}
