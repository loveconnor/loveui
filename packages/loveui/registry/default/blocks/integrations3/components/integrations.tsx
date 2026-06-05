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
type TileData = { row: number; col: number; logo?: LogoType };

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
			<div className="place-items-end">
				<div className="relative size-80">
					<div
						className={cn(
							"absolute inset-0 size-full",
							"bg-[linear-gradient(to_right,theme(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,theme(--color-border)_1px,transparent_1px)]",
							"bg-size-[64px_64px]",
							"mask-[radial-gradient(ellipse_at_center,black,black,transparent)]"
						)}
					/>
					{tiles.map((tile) => (
						<IntegrationCard
							key={String(tile.row) + "_" + String(tile.col)}
							{...tile}
						/>
					))}
				</div>
			</div>
			<FullWidthDivider className="-bottom-px" />
		</div>
	);
}

function IntegrationCard({ row, col, logo }: TileData) {
	return (
		<div
			className={cn(
				"absolute flex size-16 items-center justify-center",
				logo ? "bg-secondary/40" : ""
			)}
			style={{ left: col * 64, top: row * 64 }}
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
			className={cn(className, logo.isInvertable && "dark:invert")}
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
	{ row: 1, col: 0 },
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
	{ row: 2, col: 3 },
	{ row: 3, col: 0 },
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
