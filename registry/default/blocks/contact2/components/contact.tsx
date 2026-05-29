import { cn } from "@/lib/utils";
import { XIcon } from "./icons/x-icon";
import { Button } from "@/registry/default/ui/button";
import { Mail, Users } from "lucide-react";

const APP_EMAIL = "hello@loveui.dev";

const data = [
	{
		title: "Email LoveUI",
		description: "Ask about components, blocks, registry setup, or implementation details.",
		icon: (
			<Mail
			/>
		),
		href: `mailto:${APP_EMAIL}`,
		label: APP_EMAIL,
	},
	{
		title: "Send a DM",
		description: "Reach out on X with LoveUI questions, ideas, or bug reports.",
		icon: <XIcon />,
		href: "#",
		label: "@connorlove",
	},
	{
		title: "Join the community",
		description: "Connect with builders using LoveUI in real product interfaces.",
		icon: (
			<Users
			/>
		),
		href: "#",
		label: "Join Discord",
	},
];

export function Contact() {
	return (
		<div className="mx-auto max-w-4xl">
			<div className="mb-12 flex max-w-md flex-col justify-center gap-2">
				<h1 className="font-bold text-2xl md:text-3xl">Contact Us</h1>
				<p className="text-base text-muted-foreground">
					Get help with LoveUI components, blocks, registry installs, and
					source-first UI workflows.
				</p>
			</div>
			<div className="grid gap-0.5 overflow-hidden rounded-lg bg-muted p-0.5 md:grid-cols-3 dark:bg-muted/50">
				{data.map((item) => (
					<div
						className="flex flex-col gap-3 rounded-lg bg-background px-6 py-6 shadow-xs"
						key={item.title}
					>
						<div
							className={cn(
								"flex items-center gap-x-2",
								"[&_svg]:size-4 [&_svg]:text-muted-foreground"
							)}
						>
							{item.icon}
							<h2 className="text-sm">{item.title}</h2>
						</div>
						<p className="text-muted-foreground text-sm">{item.description}</p>
						<div className="mt-1 flex items-center gap-x-2">
							<Button asChild variant="link">
								<a href={item.href}>{item.label}</a>
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
