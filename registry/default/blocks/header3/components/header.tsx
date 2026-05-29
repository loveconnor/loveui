"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { useScroll } from "../hooks/use-scroll";
import { Button } from "@/registry/default/ui/button";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

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
				<div className="flex items-center gap-5">
					<a
						className="rounded-lg px-3 py-2.5 hover:bg-muted dark:hover:bg-muted/50"
						href="#"
					>
						<Logo className="h-8 w-auto" />
					</a>
					<DesktopNav />
				</div>
				<div className="hidden items-center gap-2 md:flex">
					<Button variant="outline">Sign In</Button>
					<Button>Get Started</Button>
				</div>
				<MobileNav />
			</nav>
		</header>
	);
}
