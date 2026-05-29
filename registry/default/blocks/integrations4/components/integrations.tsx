import { cn } from "@/lib/utils";
import AdobeLogo from "./logos/adobe.svg";
import CanvaLogo from "./logos/canva.svg";
import CursorLogo from "./logos/cursor.svg";
import GmailLogo from "./logos/gmail.svg";
import NotionLogo from "./logos/notion.svg";
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
		<div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 p-4 md:grid-cols-2 md:items-center">
			{/* Left Content */}
			<div className="max-w-xl space-y-5">
				<h2 className="font-medium text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl">
					LoveUI fits your product stack
				</h2>
				<p className="text-lg text-muted-foreground leading-8">
					Bring LoveUI blocks into the tools you already use for deployment,
					data, docs, billing, and design collaboration.
				</p>
			</div>

			{/* Right Content - Visual */}
			<div className="place-items-end">
				<div className="mask-[radial-gradient(ellipse_at_center,black,black,transparent)] relative size-90">
					{tiles.map((tile) => (
						<IntegrationCard key={`${tile.row}_${tile.col}`} {...tile} />
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
				logo
					? "bg-card shadow-xs dark:bg-card/60"
					: "bg-secondary/30 dark:bg-background" // Styling for empty tiles
			)}
			style={{
				left: col * 72, // 72px cell
				top: row * 72,
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
// Grid 5x5.
const tiles: TileData[] = [
	// Row 0
	{
		row: 0,
		col: 1,
	},
	{
		row: 0,
		col: 3,
		logo: {
			src: NotionLogo,
			alt: "Notion Logo",
		},
	},

	// Row 1
	{ row: 1, col: 0 }, // Empty
	{
		row: 1,
		col: 2,
		logo: {
			src: CursorLogo,
			alt: "Cursor Logo",
			isInvertable: true,
		},
	},
	{
		row: 1,
		col: 4,
		logo: {
			src: VercelLogo,
			alt: "Vercel Logo",
			isInvertable: true,
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
	{
		row: 2,
		col: 3,
		logo: {
			src: GmailLogo,
			alt: "Gmail Logo",
		},
	}, // Empty

	// Row 3

	{ row: 3, col: 0 }, // Empty
	{
		row: 3,
		col: 2,
		logo: {
			src: SupabaseLogo,
			alt: "Supabase Logo",
		},
	},
	{
		row: 3,
		col: 4,
		logo: {
			src: CanvaLogo,
			alt: "Canva Logo",
		},
	},

	// Row 4
	{
		row: 4,
		col: 1,
		logo: {
			src: AdobeLogo,
			alt: "Adobe Logo",
		},
	},
	{
		row: 4,
		col: 3,
		logo: {
			src: PolarLogo,
			alt: "Polar Logo",
		},
	},
];
