import { cn } from "@/lib/utils";
import { FullWidthDivider } from "./full-width-divider";
import { Phone, Mail, MapPin } from "lucide-react";

const data = [
	{
		title: "Ask about LoveUI",
		value: "+1 (555) 014-2026",
		icon: (
			<Phone
			/>
		),
	},
	{
		title: "Email the team",
		value: "hello@loveui.dev",
		icon: (
			<Mail
			/>
		),
	},
	{
		title: "Product studio",
		value: "Built by Connor Love",
		icon: (
			<MapPin
			/>
		),
	},
];

export function Contact() {
	return (
		<div className="mx-auto max-w-4xl">
			<h2 className="mb-6 font-medium text-lg md:text-2xl">
				Need help building with LoveUI?
			</h2>
			<div className="relative">
				<FullWidthDivider position="top" />
				<div className="grid gap-px overflow-hidden bg-border px-px md:grid-cols-3">
					{data.map((item) => (
						<div
							className="flex items-center gap-3 bg-background p-2 shadow-xs"
							key={item.title}
						>
							<div
								className={cn(
									"flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted/50",
									"[&_svg]:size-4 [&_svg]:text-muted-foreground"
								)}
							>
								{item.icon}
							</div>
							<div className={cn("flex flex-col gap-y-0.5")}>
								<h2 className="text-sm">{item.title}</h2>
								<p className="text-muted-foreground text-xs">{item.value}</p>
							</div>
						</div>
					))}
				</div>
				<FullWidthDivider position="bottom" />
			</div>
		</div>
	);
}
