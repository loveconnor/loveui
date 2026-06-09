import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import {
  appName,
  blocksRoute,
  chartsRoute,
  componentsRoute,
  docsRoute,
  iconsRoute,
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
          <Image
            alt=""
            className="size-6 rounded-md"
            height={24}
            sizes="24px"
            src="/icon.svg"
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
      {
        text: 'Icons',
        url: iconsRoute,
        active: 'nested-url',
        on: 'nav',
      },
      /*{
        text: 'Builder',
        url: '/builder',
        active: 'nested-url',
        on: 'nav',
      },*/
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
