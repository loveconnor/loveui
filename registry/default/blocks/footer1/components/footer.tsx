import { GithubIcon } from "./icons/github-icon";
import { XIcon } from "./icons/x-icon";
import { Logo } from "./logo";
import { Button } from "@/registry/default/ui/button";

const navLinks = [
	{ href: "#", label: "Features" },
	{ href: "#", label: "Blog" },
	{ href: "#", label: "About" },
	{ href: "#", label: "Contact" },
	{ href: "#", label: "Licence" },
	{ href: "#", label: "Privacy" },
];

const socialLinks = [
	{
		href: "#",
		label: "X",
		icon: <XIcon />,
	},
	{
		href: "#",
		label: "Github",
		icon: <GithubIcon />,
	},
];

export function Footer() {
	return (
		<footer className="mx-auto max-w-5xl *:px-4 *:md:px-6">
			<div className="flex flex-col gap-6 py-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Logo className="h-8 w-auto" />
					</div>
					<div className="flex items-center">
						{socialLinks.map(({ href, label, icon }) => (
							<Button asChild key={label} size="icon" variant="ghost">
								<a aria-label={label} href={href}>
									{icon}
								</a>
							</Button>
						))}
					</div>
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

			<div className="flex items-center justify-between gap-4 border-t py-4 text-muted-foreground text-sm">
				<p>&copy; {new Date().getFullYear()} LoveUI</p>

				<p className="inline-flex items-center gap-1">
					<span>Built by</span>
					<a
						aria-label="portfolio"
						className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground hover:underline"
						href={"https://connorlove.com"}
						rel="noreferrer"
						target="_blank"
					>
						<img
							alt="Connor Love"
							className="size-4 rounded-full"
							height="auto"
							src="https://github.com/loveconnor.png"
							width="auto"
						/>
						Connor Love
					</a>
				</p>
			</div>
		</footer>
	);
}
