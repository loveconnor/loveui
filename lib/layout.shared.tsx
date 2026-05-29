import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, blocksRoute, componentsRoute, docsRoute, gitConfig } from './shared';
import { ThemeSwitch } from '@/components/theme-switch';
import {
  SearchCommandFull,
  SearchCommandSmall,
} from '@/components/search-command';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: appName,
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
