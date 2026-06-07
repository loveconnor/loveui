import { GithubIcon } from './github-icon';
import { LogoMark } from './logo-mark';

const navLinks = [
  { href: '/docs', label: 'Docs' },
  { href: '/components', label: 'Components' },
  { href: '/blocks', label: 'Blocks' },
  { href: '/docs/loveui-skills', label: 'LoveUI Skills' },
  { href: '/docs/contributing', label: 'Contributing' },
];

export function LandingFooter() {
  return (
    <footer className="mx-auto max-w-5xl px-4 md:px-6">
      <div className="flex flex-col gap-6 py-6">
        <div className="flex items-center justify-between gap-4">
          <a className="flex items-center gap-2" href="/">
            <LogoMark className="size-8 rounded-md" />
            <span className="font-medium">LoveUI</span>
          </a>
          <a
            aria-label="LoveUI on GitHub"
            className="inline-flex size-8 items-center justify-center rounded-lg border border-transparent transition-colors hover:bg-accent"
            href="https://github.com/loveconnor/loveui"
          >
            <GithubIcon className="size-4" />
          </a>
        </div>

        <nav>
          <ul className="flex flex-wrap gap-4 font-medium text-muted-foreground text-sm md:gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a className="hover:text-foreground" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex flex-col justify-between gap-2 border-t py-4 text-muted-foreground text-sm sm:flex-row sm:items-center">
        <p>&copy; {new Date().getFullYear()} LoveUI</p>
        <p>Documentation, components, and blocks for product teams.</p>
      </div>
    </footer>
  );
}
