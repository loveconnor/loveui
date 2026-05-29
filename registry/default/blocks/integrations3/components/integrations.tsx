import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { FullWidthDivider } from "./full-width-divider";
import CursorLogo from "./logos/cursor.svg";
import GmailLogo from "./logos/gmail.svg";
import PlanetscaleLogo from "./logos/planetscale.svg";
import PolarLogo from "./logos/polar.svg";
import SupabaseLogo from "./logos/supabase.svg";
import VercelLogo from "./logos/vercel.svg";

type LogoType = {
	src: { src: string } | string;
	alt: string;
	isInvertable?: boolean;
};

type TileData = {
	row: number;
	col: number;
	logo?: LogoType;
};

const getLogoSrc = (source: LogoType["src"]) =>
	typeof source === "string" ? source : source.src;

export function Integrations() {
	return (
		<div className="relative mx-auto grid max-w-4xl grid-cols-1 gap-12 border-x md:grid-cols-2 md:items-center">
			<FullWidthDivider className="-top-px" />

			{/* Left Content */}
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

			{/* Right Content - Visual */}
			<div className="place-items-end">
				<div className="relative size-80">
					{/* Grid Background */}
					<div
						className={cn(
							"absolute inset-0 size-full",
							"bg-[linear-gradient(to_right,theme(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,theme(--color-border)_1px,transparent_1px)]",
							"bg-size-[64px_64px]",
							"mask-[radial-gradient(ellipse_at_center,black,black,transparent)]"
						)}
					/>

					{tiles.map((tile) => (
						<IntegrationCard key={`${tile.row}_${tile.col}`} {...tile} />
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
				logo ? "bg-secondary/40" : "" // Styling for empty tiles
			)}
			style={{
				left: col * 64, // 64px cell
				top: row * 64,
			}}
		>
			{logo && (
				<img
					alt={logo.alt}
					className={cn(
						"pointer-events-none size-8 select-none object-contain p-1",
						logo.isInvertable && "dark:invert"
					)}
					height={40}
					src={getLogoSrc(logo.src)}
					width={40}
				/>
			)}
		</div>
	);
}

// Coordinate mapping to approximate the "scattered" look in the image.
// Grid 6x5.
const tiles: TileData[] = [
	// Row 0
	{
		row: 0,
		col: 1,
		logo: {
			src: VercelLogo,
			alt: "Vercel Logo",
			isInvertable: true,
		},
	},
	{
		row: 0,
		col: 3,
		logo: {
			src: CursorLogo,
			alt: "Cursor Logo",
			isInvertable: true,
		},
	},

	// Row 1
	{ row: 1, col: 0 }, // Empty
	{
		row: 1,
		col: 2,
		logo: {
			src: SupabaseLogo,
			alt: "Supabase Logo",
		},
	},
	{
		row: 1,
		col: 4,
		logo: {
			src: GmailLogo,
			alt: "Gmail Logo",
		},
	},

	// Row 2
	{
		row: 2,
		col: 1,
		logo: {
			src: PlanetscaleLogo,
			alt: "Planetscale Logo",
			isInvertable: true,
		},
	},
	{ row: 2, col: 3 }, // Empty

	// Row 3

	{ row: 3, col: 0 }, // Empty
	{
		row: 3,
		col: 2,
		logo: {
			src: PolarLogo,
			alt: "Polar Logo",
		},
	},
	{
		row: 3,
		col: 4,
		logo: {
			src: VercelLogo,
			alt: "Vercel Logo",
			isInvertable: true,
		},
	},

	// Row 4
	{
		row: 4,
		col: 1,
		logo: {
			src: SupabaseLogo,
			alt: "Supabase Logo",
		},
	},
	{
		row: 4,
		col: 3,
		logo: {
			src: CursorLogo,
			alt: "Cursor Logo",
			isInvertable: true,
		},
	},
];
