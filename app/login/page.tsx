import type { Metadata } from 'next';
import { cn } from '@/lib/cn';
import { Button } from '@/registry/default/ui/button';
import { GithubIcon } from '@/registry/default/blocks/auth2/components/icons/github-icon';
import { GoogleIcon } from '@/registry/default/blocks/auth2/components/icons/google-icon';
import { DecorIcon } from '@/registry/default/blocks/auth2/components/ui/decor-icon';

export const metadata: Metadata = {
  title: 'Log in',
  description: 'Log in to your LoveUI account.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
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
          <div className="grid grid-cols-2 gap-2">
            <Button className="h-11 w-full" type="button" variant="outline">
              <GoogleIcon data-icon="inline-start" />
              Google
            </Button>
            <Button className="h-11 w-full" type="button" variant="outline">
              <GithubIcon data-icon="inline-start" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
