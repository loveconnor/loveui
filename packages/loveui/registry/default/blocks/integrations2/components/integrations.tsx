import type { ElementType, SVGProps } from "react";
import {
	Cursor as CursorLogo,
	GoogleGmail as GmailLogo,
	Neon as NeonLogo,
	Notion as NotionLogo,
	PlanetScale as PlanetscaleLogo,
	Vercel as VercelLogo,
} from "love-ui/logos";

import { cn } from "@/lib/utils";
import { DecorIcon } from "./decor-icon";

type LogoComponent = ElementType<SVGProps<SVGSVGElement>>;

type Integration = {
	Component: LogoComponent;
	name: string;
	description: string;
	isInvertable?: boolean;
	logoClassName?: string;
	icon?: React.ReactNode;
};

const data: Integration[] = [
	{
		Component: VercelLogo,
		name: "Vercel",
		description:
			"Deploy LoveUI block previews, docs, and production product pages.",
		isInvertable: true,
	},
	{
		Component: CursorLogo,
		name: "Cursor",
		description:
			"Use LoveUI Skills to give AI agents concrete interface guidance.",
		isInvertable: true,
		icon: <DecorIcon position="bottom-left" />,
	},
	{
		Component: NeonLogo,
		name: "Neon",
		description:
			"Connect polished LoveUI surfaces to serverless Postgres and application data.",
	},
	{
		Component: PlanetscaleLogo,
		name: "PlanetScale",
		description: "Back product screens with schema changes your team can review.",
		isInvertable: true,
	},
	{
		Component: NotionLogo,
		name: "Notion",
		description: "Track component decisions, block adoption, and design system notes.",
		logoClassName: "text-black",
	},
	{
		Component: GmailLogo,
		name: "Gmail",
		description: "Send product notifications from interfaces built with LoveUI forms.",
		icon: <DecorIcon position="top-left" />,
	},
];

export function Integrations() {
	return (
		<div className="relative mx-auto max-w-5xl border">
			<div className="grid grid-cols-2 gap-px bg-border md:grid-cols-3">
				{data.map((item) => (
					<IntegrationCard integration={item} key={item.name}>
						{item.icon}
					</IntegrationCard>
				))}
			</div>
			<DecorIcon position="top-left" />
			<DecorIcon position="top-right" />
			<DecorIcon position="bottom-left" />
			<DecorIcon position="bottom-right" />
		</div>
	);
}

function IntegrationCard({
	integration,
	className,
	children,
	...props
}: React.ComponentProps<"div"> & { integration: Integration }) {
	return (
		<div
			className={cn(
				"relative flex flex-col items-start gap-4 bg-background p-4 text-start md:p-6 md:even:bg-background/75",
				className
			)}
			{...props}
		>
			<LogoAsset
				className="pointer-events-none size-9 shrink-0 select-none object-contain"
				integration={integration}
			/>
			<div className="space-y-1">
				<h3 className="font-semibold">{integration.name}</h3>
				<p className="text-muted-foreground text-xs md:text-sm">
					{integration.description}
				</p>
			</div>
			{children}
		</div>
	);
}

function LogoAsset({
	integration,
	className,
}: {
	integration: Integration;
	className: string;
}) {
	const Component = integration.Component;

	return (
		<Component
			aria-label={integration.name}
			className={cn(
				className,
				integration.isInvertable && "text-foreground",
				integration.logoClassName
			)}
			role="img"
		/>
	);
}
