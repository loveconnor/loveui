import { cn } from "@/lib/utils";
import type React from "react";
import { GridPattern } from "./grid-pattern";
import { ZapIcon, CpuIcon, FingerprintIcon, PencilIcon, Settings2Icon, SparklesIcon } from "lucide-react";

type FeatureType = {
	title: string;
	icon: React.ReactNode;
	description: string;
};

export function FeatureSection() {
	return (
		<div className="mx-auto w-full max-w-5xl space-y-8">
			<div className="mx-auto max-w-3xl text-center">
				<h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
					Power. Speed. Control.
				</h2>
				<p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
					Everything you need to build fast, secure, scalable apps.
				</p>
			</div>

			<div className="overflow-hidden rounded-lg border">
				<div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
					{features.map((feature) => (
						<FeatureCard feature={feature} key={feature.title} />
					))}
				</div>
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
			className={cn("relative overflow-hidden bg-background p-6", className)}
			{...props}
		>
			<div className="mask-[radial-gradient(farthest-side_at_top,white,transparent)] pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 size-full">
				<GridPattern
					className="absolute inset-0 size-full stroke-foreground/20"
					height={40}
					width={40}
					x={20}
				/>
			</div>
			<div className="[&_svg]:size-6 [&_svg]:text-foreground/75">
				{feature.icon}
			</div>
			<h3 className="mt-10 text-sm md:text-base">{feature.title}</h3>
			<p className="relative z-20 mt-2 font-light text-muted-foreground text-xs">
				{feature.description}
			</p>
		</div>
	);
}

const features: FeatureType[] = [
	{
		title: "Faaast",
		icon: (
			<ZapIcon
			/>
		),
		description: "It supports an entire helping developers and innovate.",
	},
	{
		title: "Powerful",
		icon: (
			<CpuIcon
			/>
		),
		description: "It supports an entire helping developers and businesses.",
	},
	{
		title: "Security",
		icon: (
			<FingerprintIcon
			/>
		),
		description: "It supports an helping developers businesses.",
	},
	{
		title: "Customization",
		icon: (
			<PencilIcon
			/>
		),
		description: "It supports helping developers and businesses innovate.",
	},
	{
		title: "Control",
		icon: (
			<Settings2Icon
			/>
		),
		description: "It supports helping developers and businesses innovate.",
	},
	{
		title: "Built for AI",
		icon: (
			<SparklesIcon
			/>
		),
		description: "It supports helping developers and businesses innovate.",
	},
];
