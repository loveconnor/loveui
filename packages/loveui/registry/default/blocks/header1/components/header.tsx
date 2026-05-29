"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { useScroll } from "../hooks/use-scroll";
import { Button } from "@/registry/default/ui/button";
import { MobileNav } from "./mobile-nav";

export const navLinks = [
	{
		label: "Features",
		href: "#",
	},
	{
		label: "Pricing",
		href: "#",
	},
	{
		label: "About",
		href: "#",
	},
];

export function Header() {
	const headerRef = React.useRef<HTMLElement>(null);
	const scrolled = useScroll(10, undefined, headerRef);

	return (
		<header
			ref={headerRef}
			className={cn("sticky top-0 z-20 w-full border-transparent border-b", {
				"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50":
					scrolled,
			})}
		>
			<nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
				<a
					className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50"
					href="#"
				>
					<Logo className="h-8 w-auto" />
				</a>
				<div className="hidden items-center gap-2 md:flex">
					{navLinks.map((link) => (
						<Button asChild key={link.label} size="sm" variant="ghost">
							<a href={link.href}>{link.label}</a>
						</Button>
					))}
					<Button size="sm" variant="outline">
						Sign In
					</Button>
					<Button size="sm">Get Started</Button>
				</div>
				<MobileNav />
			</nav>
		</header>
	);
}
