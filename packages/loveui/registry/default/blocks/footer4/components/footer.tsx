import { cn } from "@/lib/utils";
import { GithubIcon } from "./icons/github-icon";
import { InstagramIcon } from "./icons/instagram-icon";
import { XIcon } from "./icons/x-icon";
import { LinkedinIcon } from "./icons/linkedin-icon";
import { ArrowRightIcon } from "lucide-react";

export function Footer() {
	return (
		<footer
			className={cn(
				"border-t",
				"dark:bg-[radial-gradient(35%_128px_at_50%_0%,--theme(--color-foreground/.08),transparent)]"
			)}
		>
			<div className="relative mx-auto max-w-5xl px-4">
				<div className="relative grid grid-cols-1 border-x md:grid-cols-4 md:divide-x">
					<div>
						<SocialCard
							className="border-t-0"
							href="#"
							icon={<GithubIcon />}
							title="Github"
						/>
						<LinksGroup
							links={[
								{ title: "Pricing", href: "#" },
								{ title: "Testimonials", href: "#" },
								{ title: "FAQs", href: "#" },
								{ title: "Contact Us", href: "#" },
								{ title: "Blog", href: "#" },
							]}
							title="About Us"
						/>
					</div>
					<div>
						<SocialCard href="#" icon={<LinkedinIcon />} title="Linkdln" />
						<LinksGroup
							links={[
								{ title: "Help Center", href: "#" },
								{ title: "Terms", href: "#" },
								{ title: "Privacy", href: "#" },
								{ title: "Security", href: "#" },
								{ title: "Cookie Policy", href: "#" },
							]}
							title="Support"
						/>
					</div>

					<div>
						<SocialCard href="#" icon={<XIcon />} title="Twitter" />
						<LinksGroup
							links={[
								{ title: "Forum", href: "#" },
								{ title: "Events", href: "#" },
								{ title: "Partners", href: "#" },
								{ title: "Affiliates", href: "#" },
								{ title: "Career", href: "#" },
							]}
							title="Community"
						/>
					</div>
					<div>
						<SocialCard href="#" icon={<InstagramIcon />} title="Instagram" />
						<LinksGroup
							links={[
								{ title: "Investors", href: "#" },
								{ title: "Terms of Use", href: "#" },
								{ title: "Privacy Policy", href: "#" },
								{ title: "Cookie Policy", href: "#" },
								{ title: "Legal", href: "#" },
							]}
							title="Press"
						/>
					</div>
				</div>
			</div>
			<div className="flex justify-center border-t p-3">
				<p className="text-muted-foreground text-xs">
					&copy; {new Date().getFullYear()} LoveUI, All rights reserved
				</p>
			</div>
		</footer>
	);
}

type LinksGroupProps = {
	title: string;
	links: { title: string; href: string }[];
};
function LinksGroup({ title, links }: LinksGroupProps) {
	return (
		<div className="p-2">
			<h3 className="mt-2 mb-3 font-light text-[10px] text-muted-foreground uppercase tracking-wider">
				{title}
			</h3>
			<ul>
				{links.map((link) => (
					<li key={link.title}>
						<a
							className="text-muted-foreground text-sm hover:text-foreground"
							href={link.href}
						>
							{link.title}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

function SocialCard({
	title,
	href,
	className,
	icon,
}: React.ComponentProps<"a"> & {
	title: string;
	icon?: React.ReactNode;
}) {
	return (
		<a
			className={cn(
				"flex items-center justify-between border-y p-2 text-sm hover:bg-muted md:border-t-0 dark:hover:bg-muted/50",
				className
			)}
			href={href}
		>
			<span className="flex items-center gap-2 font-medium [&>svg]:size-3.5 [&>svg]:shrink-0">
				{icon}
				{title}
			</span>
			<ArrowRightIcon className="size-4" />
		</a>
	);
}
