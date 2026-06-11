import { GithubIcon } from '@/components/landing/github-icon';
import { LogoMark } from '@/components/landing/logo-mark';
import {
  appName,
  blocksRoute,
  builderRoute,
  chartsRoute,
  componentsRoute,
  docsRoute,
  gitConfig,
  iconsRoute,
} from '@/lib/shared';

const navLinks = [
  { href: docsRoute, label: 'Docs' },
  { href: componentsRoute, label: 'Components' },
  { href: blocksRoute, label: 'Blocks' },
  { href: chartsRoute, label: 'Charts' },
  { href: iconsRoute, label: 'Icons' },
  { href: builderRoute, label: 'Builder' },
];

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-5 px-4">
          <a className="flex min-w-0 items-center gap-2 font-semibold" href="/">
            <LogoMark className="size-6 rounded-md" />
            <span>{appName}</span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-5 text-muted-foreground text-sm font-medium md:flex"
          >
            {navLinks.map((link) => (
              <a
                className="transition-colors hover:text-foreground"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <a
              aria-label="LoveUI on GitHub"
              className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              className="hidden h-9 items-center justify-center rounded-md px-3 text-muted-foreground text-sm font-medium transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
              href="https://cal.com/loveconnor"
              rel="noopener noreferrer"
              target="_blank"
            >
              Book a Call
            </a>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
