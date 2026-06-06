"use client";

import { Instagram as InstagramIcon, LinkedIn as LinkedinIcon, X as XIcon, Facebook as FacebookIcon } from "love-ui/logos";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";

export function Footer() {
	return (
		<footer className="border-t">
			<div className="mx-auto max-w-6xl px-4 lg:px-6">
				{/* Grid container with headings and links */}
				<div className="grid grid-cols-2 gap-8 py-8 md:grid-cols-4">
					{footerLinks.map((item) => (
						<div key={item.title}>
							<h3 className="mb-4 text-xs">{item.title}</h3>
							<ul className="space-y-2 text-muted-foreground text-sm">
								{item.links.map((link) => (
									<li key={link.label}>
										<a className="hover:text-foreground" href={link.href}>
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<div className="h-px bg-border" />
				{/* Social buttons + newsletter */}
				<div className="flex flex-wrap items-center justify-between gap-6 py-5">
					<div className="flex items-center gap-2">
						{socialLinks.map(({ icon, href }, index) => (
							<Button
								asChild
								key={`social-${href}-${index}`}
								size="icon"
								variant="outline"
							>
								<a href={href}>{icon}</a>
							</Button>
						))}
					</div>

					<div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
						<div className="max-w-xs">
							<p className="font-medium text-sm">Stay in the loop</p>
							<p className="text-muted-foreground text-xs">
								Product notes and resources, sent occasionally.
							</p>
						</div>
						<form className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
							<label className="sr-only" htmlFor="footer-email">
								Email address
							</label>
							<Input
								className="sm:w-56"
								id="footer-email"
								placeholder="Email address"
								size="sm"
								type="email"
							/>
							<Button className="w-full sm:w-auto" size="sm" type="submit">
								Subscribe
							</Button>
						</form>
					</div>
				</div>
				<div className="h-px bg-border" />
				<div className="py-4 text-center text-muted-foreground text-xs">
					<p>&copy; {new Date().getFullYear()} LoveUI, All rights reserved</p>
				</div>
			</div>
		</footer>
	);
}

const footerLinks = [
	{
		title: "Company",
		links: [
			{ href: "#", label: "Engineering Blog" },
			{ href: "#", label: "Marketplace" },
			{ href: "#", label: "What’s New" },
			{ href: "#", label: "About" },
			{ href: "#", label: "Press" },
			{ href: "#", label: "Careers" },
			{ href: "#", label: "Social Good" },
		],
	},
	{
		title: "Community",
		links: [
			{ href: "#", label: "Linktree for Enterprise" },
			{ href: "#", label: "2023 Creator Report" },
			{ href: "#", label: "2022 Creator Report" },
			{ href: "#", label: "Charities" },
			{ href: "#", label: "What’s Trending" },
			{ href: "#", label: "Creator Profile Directory" },
			{ href: "#", label: "Explore Templates" },
		],
	},
	{
		title: "Support",
		links: [
			{ href: "#", label: "Help Topics" },
			{ href: "#", label: "Getting Started" },
			{ href: "#", label: "Linoree Pro" },
			{ href: "#", label: "Features & How-tos" },
			{ href: "#", label: "FAQs" },
			{ href: "#", label: "Report a Violation" },
		],
	},
	{
		title: "Legal",
		links: [
			{ href: "#", label: "Terms & Conditions" },
			{ href: "#", label: "Privacy Notice" },
			{ href: "#", label: "Cookie Notice" },
			{ href: "#", label: "Trust Center" },
			{ href: "#", label: "Cookie Preferences" },
			{ href: "#", label: "Transparency Report" },
			{ href: "#", label: "Law Enforcement Access Policy" },
		],
	},
];

const socialLinks = [
	{
		icon: <FacebookIcon />,
		href: "#",
	},
	{
		icon: <InstagramIcon />,
		href: "#",
	},
	{
		icon: <LinkedinIcon />,
		href: "#",
	},
	{
		icon: <XIcon />,
		href: "#",
	},
];
