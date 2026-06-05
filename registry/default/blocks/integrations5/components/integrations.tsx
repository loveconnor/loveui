import type { ElementType, SVGProps } from "react";
import {
	Cursor as CursorLogo,
	GoogleGmail as GmailLogo,
	Neon as NeonLogo,
	Notion as NotionLogo,
	PlanetScale as PlanetscaleLogo,
	Polar as PolarLogo,
	Vercel as VercelLogo,
} from "love-ui/logos";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { ArrowUpRight as ArrowUpRightIcon } from "love-ui/icons";

type LogoComponent = ElementType<SVGProps<SVGSVGElement>>;

type Integration = {
	Component?: LogoComponent;
	name: string;
	isInvertable?: boolean;
};
const data: Integration[] = [
	{ name: "Empty 1" },
	{ name: "Vercel", Component: VercelLogo, isInvertable: true },
	{ name: "Cursor", Component: CursorLogo, isInvertable: true },
	{ name: "Neon", Component: NeonLogo },
	{ name: "PlanetScale", Component: PlanetscaleLogo, isInvertable: true },
	{ name: "Notion", Component: NotionLogo },
	{ name: "Gmail", Component: GmailLogo },
	{ name: "Polar", Component: PolarLogo },
	{ name: "Cursor", Component: CursorLogo, isInvertable: true },
	{ name: "Empty 2" },
];

export function Integrations() {
	return (
		<div className="flex flex-col items-center justify-center gap-6 py-24">
			<div className="max-w-xl space-y-2 px-4 text-center">
				<h2 className="font-semibold text-4xl tracking-tight">
					LoveUI works with your stack
				</h2>
				<p className="text-base text-muted-foreground md:text-lg">
					Use familiar tools around your copied components, blocks, and docs.
				</p>
			</div>
			<div className="flex flex-col justify-center rounded-full border bg-secondary dark:bg-secondary/10">
				<div className="mask-l-from-90 mask-r-from-90 flex items-center justify-center -space-x-4 p-1">
					{data.map((item, index) => (
						<div
							className={cn(
								"relative z-0 transition-transform",
								item.Component ? "hover:z-10 hover:scale-110" : ""
							)}
							key={item.name + "-" + String(index)}
						>
							<div className="flex size-12 items-center justify-center overflow-hidden rounded-full border bg-card shadow-sm md:size-16">
								{item.Component && (
									<LogoAsset
										className="pointer-events-auto size-6 select-none object-contain md:size-7"
										integration={item}
									/>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
			<Button className="rounded-full px-5!">
				See LoveUI integrations{" "}
				<ArrowUpRightIcon data-icon="inline-end" />
			</Button>
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
	if (!integration.Component) return null;

	const Component = integration.Component;

	return (
		<Component
			aria-label={integration.name}
			className={cn(className, integration.isInvertable && "dark:invert")}
			role="img"
		/>
	);
}
