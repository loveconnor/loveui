import type { ElementType, SVGProps } from "react";
import {
	Cursor as CursorLogo,
	GoogleGmail as GmailLogo,
	Neon as NeonLogo,
	PlanetScale as PlanetscaleLogo,
	Polar as PolarLogo,
	Vercel as VercelLogo,
} from "love-ui/logos";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { FullWidthDivider } from "./full-width-divider";

type LogoComponent = ElementType<SVGProps<SVGSVGElement>>;

type LogoType = {
	Component: LogoComponent;
	alt: string;
	isInvertable?: boolean;
};
type TileData = { x: number; y: number; logo: LogoType };

export function Integrations() {
	return (
		<div className="relative mx-auto grid max-w-4xl grid-cols-1 gap-12 border-x md:grid-cols-2 md:items-center">
			<FullWidthDivider className="-top-px" />
			<div className="p-4 md:p-6">
				<div className="space-y-4">
					<h2 className="font-medium text-3xl text-foreground tracking-tight sm:text-4xl">
						Connect LoveUI to your workflow
					</h2>
					<p className="text-muted-foreground text-sm md:text-base">
						Use LoveUI alongside deployment, data, communication, and AI coding
						tools your team already trusts.
					</p>
					<Button size="sm">Explore LoveUI integrations</Button>
				</div>
			</div>
			<div className="place-items-center px-8 py-12">
				<div className="relative h-52 w-full">
					{tiles.map((tile) => (
						<IntegrationCard
							key={String(tile.x) + "_" + String(tile.y)}
							{...tile}
						/>
					))}
				</div>
			</div>
			<FullWidthDivider className="-bottom-px" />
		</div>
	);
}

function IntegrationCard({ x, y, logo }: TileData) {
	return (
		<div
			className={cn(
				"absolute z-10 flex size-14 items-center justify-center rounded-md border",
				logo ? "bg-card shadow-xs" : ""
			)}
			style={{
				left: `calc(${x}% - 1.75rem)`,
				top: `calc(${y}% - 1.75rem)`,
			}}
		>
			{logo && (
				<LogoAsset
					className="pointer-events-none size-9 select-none object-contain p-1"
					logo={logo}
				/>
			)}
		</div>
	);
}

function LogoAsset({
	logo,
	className,
}: {
	logo: LogoType;
	className: string;
}) {
	const Component = logo.Component;

	return (
		<Component
			aria-label={logo.alt}
			className={cn(className, logo.isInvertable && "text-foreground")}
			role="img"
		/>
	);
}

const tiles: TileData[] = [
	{
		x: 14,
		y: 22,
		logo: { Component: VercelLogo, alt: "Vercel Logo", isInvertable: true },
	},
	{
		x: 60,
		y: 22,
		logo: { Component: CursorLogo, alt: "Cursor Logo", isInvertable: true },
	},
	{ x: 36, y: 42, logo: { Component: NeonLogo, alt: "Neon Logo" } },
	{ x: 84, y: 42, logo: { Component: GmailLogo, alt: "Gmail Logo" } },
	{
		x: 14,
		y: 64,
		logo: {
			Component: PlanetscaleLogo,
			alt: "Planetscale Logo",
			isInvertable: true,
		},
	},
	{ x: 36, y: 84, logo: { Component: PolarLogo, alt: "Polar Logo" } },
	{
		x: 84,
		y: 82,
		logo: { Component: VercelLogo, alt: "Vercel Logo", isInvertable: true },
	},
	{
		x: 60,
		y: 64,
		logo: { Component: CursorLogo, alt: "Cursor Logo", isInvertable: true },
	},
];
