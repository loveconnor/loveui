import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, componentsRoute, docsRoute, gitConfig } from './shared';
import { ThemeSwitch } from '@/components/theme-switch';

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
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    slots: {
      themeSwitch: ThemeSwitch,
    },
  };
}
