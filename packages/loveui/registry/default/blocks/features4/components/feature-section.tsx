import { cn } from "@/lib/utils";
import type React from "react";
import { DecorIcon } from "./decor-icon";
import { LayoutDashboardIcon, TerminalIcon, ShieldCheckIcon, FileTextIcon } from "lucide-react";

type FeatureType = {
	title: string;
	icon: React.ReactNode;
	description: string;
};

export function FeatureSection() {
	return (
		<div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-12 px-4 py-12 md:px-8">
			<div className="mx-auto max-w-2xl space-y-2 text-center">
				<h2 className="font-medium text-3xl tracking-tight md:text-5xl">
					Build apps faster
				</h2>
				<p className="text-muted-foreground text-sm leading-relaxed md:text-base">
					The complete platform for secure, scalable apps. You code, we handle
					the rest.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
				{features.map((feature) => (
					<FeatureCard feature={feature} key={feature.title} />
				))}
			</div>
		</div>
	);
}

function FeatureCard({
	feature,
	className,
	...props
}: React.ComponentProps<"div"> & {
	feature: FeatureType;
}) {
	return (
		<div
			className={cn(
				"relative flex flex-col justify-between gap-6 bg-background px-6 pt-8 pb-6 shadow-xs",
				// Gradient inspired by testimonials
				"dark:bg-[radial-gradient(50%_80%_at_25%_0%,--theme(--color-foreground/.1),transparent)]",
				className
			)}
			{...props}
		>
			{/* Extended Borders */}
			<div className="absolute -inset-y-4 -left-px w-px bg-border" />
			<div className="absolute -inset-y-4 -right-px w-px bg-border" />
			<div className="absolute -inset-x-4 -top-px h-px bg-border" />
			<div className="absolute -right-4 -bottom-px -left-4 h-px bg-border" />

			{/* Corner Decor */}
			<DecorIcon className="size-3.5" position="top-left" />

			<div
				className={cn(
					"relative z-10 flex w-fit items-center justify-center rounded-lg border bg-muted/20 p-3",
					"[&_svg]:size-5 [&_svg]:stroke-[1.5] [&_svg]:text-foreground"
				)}
			>
				{feature.icon}
			</div>

			<div className="relative z-10 space-y-2">
				<h3 className="font-medium text-base text-foreground">
					{feature.title}
				</h3>
				<p className="text-muted-foreground text-xs leading-relaxed">
					{feature.description}
				</p>
			</div>
		</div>
	);
}

const features: FeatureType[] = [
	{
		title: "Interactive Dashboard",
		icon: (
			<LayoutDashboardIcon
			/>
		),
		description: "Visualize your data with drag-and-drop widgets.",
	},
	{
		title: "Instant API",
		icon: (
			<TerminalIcon
			/>
		),
		description: "Auto-generate REST and GraphQL APIs instantly.",
	},
	{
		title: "Role-Based Access",
		icon: (
			<ShieldCheckIcon
			/>
		),
		description: "Secure resources with granular permission controls.",
	},
	{
		title: "Audit Trails",
		icon: (
			<FileTextIcon
			/>
		),
		description: "Track every change with comprehensive logs.",
	},
];
