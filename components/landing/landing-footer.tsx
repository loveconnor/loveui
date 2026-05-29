import { Button } from '@/registry/default/ui/button';

import { GithubIcon } from './github-icon';

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
            <img
              alt="LoveUI"
              className="size-8 rounded-md"
              height={32}
              src="/logo.png"
              width={32}
            />
            <span className="font-medium">LoveUI</span>
          </a>
          <Button asChild size="icon" variant="ghost">
            <a
              aria-label="LoveUI on GitHub"
              href="https://github.com/loveconnor/loveui"
            >
              <GithubIcon />
            </a>
          </Button>
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
