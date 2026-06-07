import { DecorIcon } from './decor-icon';
import { GithubIcon } from './github-icon';
import { ArrowRightIcon } from './landing-icons';

export function LandingCta() {
  return (
    <section className="px-4 pb-20 md:pb-28">
      <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-4 border-y px-4 py-8 dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)]">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <div className="pointer-events-none absolute -inset-y-6 -left-px w-px border-l" />
        <div className="pointer-events-none absolute -inset-y-6 -right-px w-px border-r" />
        <div className="absolute top-0 left-1/2 -z-10 h-full border-l border-dashed" />

        <h2 className="text-center font-semibold text-xl md:text-3xl">
          Start with the docs, then copy the block you need.
        </h2>
        <p className="text-balance text-center font-medium text-muted-foreground text-sm md:text-base">
          The landing page now points people into the docs without skipping the
          stronger overview of components, blocks, and agent-ready workflow.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <a
            className="inline-flex min-h-8 items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium leading-none shadow-xs transition-colors hover:bg-accent/50"
            href="https://github.com/loveconnor/loveui"
          >
            <GithubIcon className="size-4" />
            GitHub
          </a>
          <a
            className="inline-flex min-h-8 items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-3 py-1.5 text-primary-foreground text-sm font-medium leading-none shadow-primary/24 shadow-xs transition-colors hover:bg-primary/90"
            href="/docs"
          >
            Open docs
            <ArrowRightIcon className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
