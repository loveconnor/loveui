import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import {
  appName,
  blocksRoute,
  chartsRoute,
  componentsRoute,
  docsRoute,
  gitConfig,
} from './shared';
import { ThemeSwitch } from '@/components/theme-switch';
import {
  SearchCommandFull,
  SearchCommandSmall,
} from '@/components/search-command';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: (
        <span className="inline-flex items-center gap-2">
          <img
            alt=""
            className="size-6 rounded-md"
            height={24}
            src="/logo.png"
            width={24}
          />
          <span>{appName}</span>
        </span>
      ),
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
      {
        text: 'Charts',
        url: chartsRoute,
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
