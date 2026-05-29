import { ArrowRightIcon, BookOpenIcon, ComponentIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/registry/default/ui/button';

import { DecorIcon } from './decor-icon';
import { FullWidthDivider } from './full-width-divider';

export function LandingHero() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4">
      <div
        aria-hidden="true"
        className="absolute inset-0 isolate hidden overflow-hidden contain-strict lg:block"
      >
        <div className="absolute inset-0 -top-14 isolate -z-10 bg-[radial-gradient(35%_80%_at_49%_0%,--theme(--color-foreground/.08),transparent)] contain-strict" />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 mx-auto hidden min-h-screen w-full max-w-5xl lg:block"
      >
        <div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 left-0 z-10 h-full w-px bg-foreground/15" />
        <div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 right-0 z-10 h-full w-px bg-foreground/15" />
      </div>

      <div className="relative flex flex-col items-center justify-center gap-5 pt-24 pb-10 md:pt-32 md:pb-14">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-1 size-full overflow-hidden"
        >
          <div className="absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent via-border to-border md:left-8" />
          <div className="absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent via-border to-border md:right-8" />
          <div className="absolute inset-y-0 left-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:left-12" />
          <div className="absolute inset-y-0 right-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:right-12" />
        </div>

        <a
          className={cn(
            'group mx-auto flex w-fit items-center gap-3 rounded-full border bg-card px-3 py-1 shadow',
            'fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out'
          )}
          href="/docs/get-started"
        >
          <BookOpenIcon className="size-3 text-muted-foreground" />
          <span className="text-xs">LoveUI docs are ready</span>
          <span className="block h-5 border-l" />
          <ArrowRightIcon className="size-3 duration-150 ease-out group-hover:translate-x-1" />
        </a>

        <h1
          className={cn(
            'fade-in slide-in-from-bottom-10 animate-in text-balance fill-mode-backwards text-center text-4xl tracking-tight delay-100 duration-500 ease-out md:text-5xl lg:text-6xl',
            'text-shadow-[0_0px_50px_theme(--color-foreground/.2)]'
          )}
        >
          Build faster with LoveUI
        </h1>

        <p className="fade-in slide-in-from-bottom-10 mx-auto max-w-2xl animate-in fill-mode-backwards text-center text-base text-foreground/80 delay-200 duration-500 ease-out sm:text-lg md:text-xl">
          Docs for installing components, composing blocks, and using the
          LoveUI skill to ship polished interfaces without losing control of
          your codebase.
        </p>

        <div className="fade-in slide-in-from-bottom-10 flex animate-in flex-row flex-wrap items-center justify-center gap-3 fill-mode-backwards pt-2 delay-300 duration-500 ease-out">
          <Button asChild className="rounded-full" size="lg">
            <a href="/docs/get-started">
              Start reading
              <ArrowRightIcon data-icon="inline-end" />
            </a>
          </Button>
          <Button asChild className="rounded-full" size="lg" variant="secondary">
            <a href="/components">
              <ComponentIcon data-icon="inline-start" />
              Browse components
            </a>
          </Button>
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl overflow-hidden">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />
        <FullWidthDivider className="-top-px" position="top" />
        <div className="overflow-hidden border-x bg-card/60">
          <img
            alt="LoveUI documentation preview in light mode"
            className="block w-full dark:hidden"
            height={720}
            src="/page-light.webp"
            width={1280}
          />
          <img
            alt="LoveUI documentation preview in dark mode"
            className="hidden w-full dark:block"
            height={720}
            src="/page-dark.webp"
            width={1280}
          />
        </div>
        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}
