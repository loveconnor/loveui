import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cn } from '@/lib/cn';
import { DecorIcon } from '@/registry/default/blocks/auth2/components/ui/decor-icon';
import { LoginForm } from '@/components/auth/login-form';
import { auth } from '@/lib/auth';
import { getSafeCallbackUrl } from '@/lib/auth-redirect';

export const metadata: Metadata = {
  title: 'Log in',
  description: 'Log in to your LoveUI account.',
  robots: {
    index: false,
    follow: false,
  },
};

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const callbackUrl = getSafeCallbackUrl(
    Array.isArray(params.callbackUrl) ? params.callbackUrl[0] : params.callbackUrl,
  );
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect(callbackUrl);
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-6 md:px-8">
      <div
        className={cn(
          'relative flex w-full max-w-sm flex-col justify-between p-6 md:p-8',
          'dark:bg-[radial-gradient(50%_80%_at_20%_0%,--theme(--color-foreground/.1),transparent)]',
        )}
      >
        <div className="absolute -inset-y-6 -left-px w-px bg-border" />
        <div className="absolute -inset-y-6 -right-px w-px bg-border" />
        <div className="absolute -inset-x-6 -top-px h-px bg-border" />
        <div className="absolute -inset-x-6 -bottom-px h-px bg-border" />
        <DecorIcon position="top-left" />
        <DecorIcon position="bottom-right" />

        <div className="w-full max-w-sm animate-in space-y-8">
          <div className="flex flex-col space-y-1">
            <h1 className="text-2xl font-bold tracking-wide">Log in</h1>
            <p className="text-base text-muted-foreground">
              Continue to your LoveUI account.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
