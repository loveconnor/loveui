"use client";
import { motion, useReducedMotion } from "motion/react";
import type React from "react";
import type { ReactNode } from "react";
import { FacebookIcon } from "./icons/facebook-icon";
import { InstagramIcon } from "./icons/instagram-icon";
import { LinkedinIcon } from "./icons/linkedin-icon";
import { GithubIcon } from "./icons/github-icon";
import { Logo } from "./logo";
import { Button } from "@/registry/default/ui/button";

type FooterLink = {
	title: string;
	href: string;
	icon?: ReactNode;
};
type FooterLinkGroup = {
	label: string;
	links: FooterLink[];
};

type StickyFooterProps = {
	preview?: boolean;
};

export function StickyFooter({ preview = false }: StickyFooterProps) {
	return (
		<footer
			className="relative h-(--footer-height) w-full border-t [--footer-height:520px]"
			style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
		>
			<div
				className={
					preview
						? "absolute bottom-0 left-0 h-(--footer-height) w-full"
						: "fixed bottom-0 h-(--footer-height) w-full"
				}
			>
				<div
					className={
						preview
							? "h-full overflow-y-auto"
							: "sticky top-[calc(100vh-var(--footer-height))] h-full overflow-y-auto"
					}
				>
					<div
						aria-hidden
						className="absolute inset-0 isolate z-0 opacity-50 contain-strict dark:opacity-60"
					>
						<div className="absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)]" />
						<div className="absolute top-0 left-0 h-320 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] [translate:5%_-50%]" />
						<div className="absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)]" />
					</div>
					<div className="relative mx-auto flex size-full max-w-6xl flex-col justify-between gap-5">
						<div className="grid grid-cols-1 gap-8 px-4 pt-12 md:grid-cols-2 lg:grid-cols-4">
							<AnimatedContainer className="w-full space-y-4">
								<Logo className="h-8 w-auto" />
								<p className="mt-8 text-muted-foreground text-sm md:mt-0">
									Build polished interfaces with LoveUI.
								</p>
								<div className="flex gap-2">
									{socialLinks.map((link, index) => (
										<Button
											asChild
											key={`social-${link.href}-${index}`}
											size="icon-sm"
											variant="outline"
										>
											<a href={link.href}>{link.icon}</a>
										</Button>
									))}
								</div>
							</AnimatedContainer>
							{footerLinkGroups.map((group, index) => (
								<AnimatedContainer
									className="w-full"
									delay={0.1 + index * 0.1}
									key={group.label}
								>
									<div className="mb-10 md:mb-0">
										<h3 className="text-sm uppercase">{group.label}</h3>
										<ul className="mt-4 space-y-2 text-muted-foreground text-sm md:text-xs lg:text-sm">
											{group.links.map((link) => (
												<li key={link.title}>
													<a
														className="inline-flex items-center hover:text-foreground [&_svg]:me-1 [&_svg]:size-4"
														href={link.href}
													>
														{link.icon}
														{link.title}
													</a>
												</li>
											))}
										</ul>
									</div>
								</AnimatedContainer>
							))}
						</div>
						<div className="flex flex-col items-center justify-between gap-2 border-t p-4 text-muted-foreground text-sm md:flex-row">
							<p>
								&copy; {new Date().getFullYear()} LoveUI, All rights reserved.
							</p>
							<a className="hover:text-foreground" href="#">
								License
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

const socialLinks = [
	{
		title: "Facebook",
		href: "#",
		icon: <FacebookIcon />,
	},
	{
		title: "Instagram",
		href: "#",
		icon: <InstagramIcon />,
	},
	{
		title: "Github",
		href: "#",
		icon: <GithubIcon />,
	},
	{
		title: "LinkedIn",
		href: "#",
		icon: <LinkedinIcon />,
	},
];

const footerLinkGroups: FooterLinkGroup[] = [
	{
		label: "Product",
		links: [
			{ title: "Payments", href: "#" },
			{ title: "Cards & Issuing", href: "#" },
			{ title: "Lending & Credit", href: "#" },
			{ title: "Wealth Management", href: "#" },
			{ title: "Insurance", href: "#" },
			{ title: "Crypto Wallets", href: "#" },
			{ title: "Treasury Management", href: "#" },
			{ title: "Merchant Services", href: "#" },
			{ title: "Point of Sale", href: "#" },
			{ title: "Embedded Finance", href: "#" },
			{ title: "Open Banking API", href: "#" },
			{ title: "SDKs & Integrations", href: "#" },
			{ title: "Pricing", href: "/pricing" },
		],
	},
	{
		label: "Resources",
		links: [
			{ title: "Blog", href: "#" },
			{ title: "Case Studies", href: "#" },
			{ title: "Documentation", href: "#" },
			{ title: "API Reference", href: "#" },
			{ title: "Developer Tools", href: "#" },
			{ title: "Whitepapers", href: "#" },
			{ title: "Reports & Research", href: "#" },
			{ title: "Events & Webinars", href: "#" },
			{ title: "E-books", href: "#" },
			{ title: "Community Forum", href: "#" },
			{ title: "Release Notes", href: "#" },
			{ title: "System Status", href: "#" },
		],
	},
	{
		label: "Company",
		links: [
			{ title: "About Us", href: "#" },
			{ title: "Leadership", href: "#" },
			{ title: "Careers", href: "#" },
			{ title: "Press", href: "#" },
			{ title: "Sustainability", href: "#" },
			{ title: "Diversity & Inclusion", href: "#" },
			{ title: "Investor Relations", href: "#" },
			{ title: "Partners", href: "#" },
			{ title: "Legal & Compliance", href: "#" },
			{ title: "Privacy Policy", href: "#" },
			{ title: "Cookie Policy", href: "#" },
			{ title: "Terms of Service", href: "#" },
			{ title: "AML & KYC Policy", href: "#" },
		],
	},
];

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
	children?: React.ReactNode;
	delay?: number;
};

function AnimatedContainer({
	delay = 0.1,
	children,
	...props
}: AnimatedContainerProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
			transition={{ delay, duration: 0.8 }}
			viewport={{ once: true }}
			whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
			{...props}
		>
			{children}
		</motion.div>
	);
}
