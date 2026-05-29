import { cn } from "@/lib/utils";
import type React from "react";
import { FullWidthDivider } from "./full-width-divider";
import { ZapIcon, ShieldCheckIcon, ActivityIcon, GlobeIcon } from "lucide-react";

type FeatureType = {
	title: string;
	icon: React.ReactNode;
	description: string;
};

export function FeatureSection() {
	return (
		<div className="mx-auto min-h-screen w-full max-w-5xl place-content-center space-y-12 border-x py-4">
			<div className="relative grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
				<FullWidthDivider position="top" />
				{features.map((feature) => (
					<FeatureCard feature={feature} key={feature.title} />
				))}
				<FullWidthDivider position="bottom" />
			</div>
		</div>
	);
}

export function FeatureCard({
	feature,
	className,
	...props
}: React.ComponentProps<"div"> & {
	feature: FeatureType;
}) {
	return (
		<div
			className={cn(
				"relative flex flex-col justify-between overflow-hidden bg-background p-4 md:p-6",
				className
			)}
			{...props}
		>
			<div
				className={cn(
					"relative z-10 flex items-center pt-4 pb-6",
					"[&_svg]:size-5 [&_svg]:text-primary"
				)}
			>
				{feature.icon}
			</div>

			<div className="relative z-10 space-y-2">
				<h3 className="font-medium text-foreground text-lg">{feature.title}</h3>
				<p className="text-muted-foreground text-xs leading-relaxed">
					{feature.description}
				</p>
			</div>
		</div>
	);
}

const features: FeatureType[] = [
	{
		title: "Lightning Fast",
		icon: (
			<ZapIcon
			/>
		),
		description: "Blazing fast performance with edge network optimizations.",
	},
	{
		title: "Secure by Design",
		icon: (
			<ShieldCheckIcon
			/>
		),
		description: "Enterprise-grade security, zero configuration required.",
	},
	{
		title: "Real-time Sync",
		icon: (
			<ActivityIcon
			/>
		),
		description: "Real-time data sync across all devices efficiently.",
	},
	{
		title: "Global Scale",
		icon: (
			<GlobeIcon
			/>
		),
		description: "Instant global deployment to 35+ regions worldwide.",
	},
];
