import type { ReactNode } from 'react';
import '../route-shell.css';
import { loveSans } from '@/lib/love-sans';

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <div className={`${loveSans.variable} font-sans`}>{children}</div>;
}
