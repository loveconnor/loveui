import type { ElementType, SVGProps } from "react";
import {
	Cursor as CursorLogo,
	Neon as NeonLogo,
	Notion as NotionLogo,
	Vercel as VercelLogo,
} from "love-ui/logos";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { ArrowUpRight as ArrowUpRightIcon } from "love-ui/icons";

type LogoComponent = ElementType<SVGProps<SVGSVGElement>>;

type Integration = {
	Component: LogoComponent;
	name: string;
	description: string;
	isInvertable?: boolean;
};

const data: Integration[] = [
	{
		Component: VercelLogo,
		name: "Vercel",
		description:
			"Deploy LoveUI examples, docs, and product pages with fast previews.",
		isInvertable: true,
	},
	{
		Component: CursorLogo,
		name: "Cursor",
		description:
			"Use LoveUI Skills to guide AI-assisted interface work in your editor.",
		isInvertable: true,
	},
	{
		Component: NeonLogo,
		name: "Neon",
		description: "Pair LoveUI app screens with serverless Postgres and product data.",
	},
	{
		Component: NotionLogo,
		name: "Notion",
		description:
			"Document component decisions, block usage, and product patterns.",
	},
];

export function Integrations() {
	return (
		<div
			className={cn(
				"mx-auto grid max-w-5xl gap-1 overflow-hidden rounded-md bg-secondary p-1 sm:grid-cols-2 lg:grid-cols-4 dark:bg-secondary/50"
			)}
		>
			{data.map((item) => (
				<div
					className={cn(
						"group relative flex flex-col justify-between gap-2 rounded-md bg-background p-6 shadow-sm"
					)}
					key={item.name}
				>
					<LogoAsset
						className="pointer-events-none size-9 shrink-0 select-none object-contain"
						integration={item}
					/>
					<div className="space-y-1">
						<h3 className="font-semibold">{item.name}</h3>
						<p className="text-muted-foreground text-xs md:text-sm">
							{item.description}
						</p>
					</div>
				</div>
			))}
			<div className="relative flex items-center justify-center p-1 sm:col-span-2 lg:col-span-4">
				<Button asChild className="group text-xs" size="sm" variant="link">
					<a href="#">
						View LoveUI integrations
						<ArrowUpRightIcon data-icon="inline-end" />
					</a>
				</Button>
			</div>
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
			className={cn(className, integration.isInvertable && "dark:invert")}
			role="img"
		/>
	);
}
