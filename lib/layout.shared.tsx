import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Link from 'fumadocs-core/link';
import { appName, blocksRoute, componentsRoute, docsRoute, gitConfig } from './shared';
import { ThemeSwitch } from '@/components/theme-switch';
import {
  SearchCommandFull,
  SearchCommandSmall,
} from '@/components/search-command';
import { cn } from '@/lib/cn';

function isEnabled(value: string | undefined) {
  return value?.trim().toLowerCase() === 'true';
}

function isProEnabled() {
  const key = ['pro', 'enabled'].join('_');
  return isEnabled(process.env[key]);
}

export function ProNavActions() {
  if (!isProEnabled()) {
    return null;
  }

  return (
    <div
      data-pro-nav-actions=""
      className="flex items-center gap-1.5 max-sm:hidden"
    >
      <Link
        href="/login"
        className={cn(
          'inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground',
        )}
      >
        Log in
      </Link>
      <Link
        href="/pro/checkout"
        className={cn(
          'inline-flex h-8 items-center justify-center rounded-md bg-fd-primary px-3 text-sm font-medium text-fd-primary-foreground shadow-sm transition-colors hover:bg-fd-primary/90',
        )}
      >
        Get Access
      </Link>
    </div>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: appName,
      children: <ProNavActions />,
    },
    links: [
      {
        text: 'Docs',
        url: docsRoute,
        active: 'nested-url',
        on: 'nav',
      },
      {
        text: 'Components',
        url: componentsRoute,
        active: 'nested-url',
        on: 'nav',
      },
      {
        text: 'Blocks',
        url: blocksRoute,
        active: 'nested-url',
        on: 'nav',
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    slots: {
      searchTrigger: {
        full: SearchCommandFull,
        sm: SearchCommandSmall,
      },
      themeSwitch: ThemeSwitch,
    },
  };
}
