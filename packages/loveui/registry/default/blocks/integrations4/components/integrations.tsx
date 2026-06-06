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

type LogoComponent = ElementType<SVGProps<SVGSVGElement>>;

type LogoType = {
	Component: LogoComponent;
	alt: string;
	isInvertable?: boolean;
};
type TileData = { row: number; col: number; logo?: LogoType };

export function Integrations() {
	return (
		<div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 p-4 md:grid-cols-2 md:items-center">
			<div className="max-w-xl space-y-5">
				<h2 className="font-medium text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl">
					LoveUI fits your product stack
				</h2>
				<p className="text-lg text-muted-foreground leading-8">
					Bring LoveUI blocks into the tools you already use for deployment,
					data, docs, billing, and design collaboration.
				</p>
			</div>
			<div className="place-items-end">
				<div className=" relative size-90">
					{tiles.map((tile) => (
						<IntegrationCard
							key={String(tile.row) + "_" + String(tile.col)}
							{...tile}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function IntegrationCard({ row, col, logo }: TileData) {
	return (
		<div
			className={cn(
				"absolute flex size-18 items-center justify-center rounded-md border",
				logo ? "bg-card shadow-xs dark:bg-card/60" : "bg-secondary/30 dark:bg-background"
			)}
			style={{ left: col * 72, top: row * 72 }}
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
		row: 0,
		col: 1,
		logo: { Component: VercelLogo, alt: "Vercel Logo", isInvertable: true },
	},
	{
		row: 0,
		col: 3,
		logo: { Component: CursorLogo, alt: "Cursor Logo", isInvertable: true },
	},
	{ row: 1, col: 2, logo: { Component: NeonLogo, alt: "Neon Logo" } },
	{ row: 1, col: 4, logo: { Component: GmailLogo, alt: "Gmail Logo" } },
	{
		row: 2,
		col: 1,
		logo: {
			Component: PlanetscaleLogo,
			alt: "Planetscale Logo",
			isInvertable: true,
		},
	},
	{ row: 3, col: 2, logo: { Component: PolarLogo, alt: "Polar Logo" } },
	{
		row: 3,
		col: 4,
		logo: { Component: VercelLogo, alt: "Vercel Logo", isInvertable: true },
	},
	{ row: 4, col: 1, logo: { Component: NeonLogo, alt: "Neon Logo" } },
	{
		row: 4,
		col: 3,
		logo: { Component: CursorLogo, alt: "Cursor Logo", isInvertable: true },
	},
];
