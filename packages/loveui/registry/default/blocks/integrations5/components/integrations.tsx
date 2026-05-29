import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import CursorLogo from "./logos/cursor.svg";
import GmailLogo from "./logos/gmail.svg";
import NotionLogo from "./logos/notion.svg";
import PlanetscaleLogo from "./logos/planetscale.svg";
import PolarLogo from "./logos/polar.svg";
import SupabaseLogo from "./logos/supabase.svg";
import VercelLogo from "./logos/vercel.svg";

type Integration = {
	src?: { src: string } | string;
	name: string;
	isInvertable?: boolean;
};

const getLogoSrc = (source: NonNullable<Integration["src"]>) =>
	typeof source === "string" ? source : source.src;

const data: Integration[] = [
	{
		name: "Empty 1",
	},
	{
		name: "Vercel",
		src: VercelLogo,
		isInvertable: true,
	},
	{
		name: "Cursor",
		src: CursorLogo,
		isInvertable: true,
	},
	{
		src: SupabaseLogo,
		name: "Supabase",
	},
	{
		name: "PlanetScale",
		src: PlanetscaleLogo,
		isInvertable: true,
	},
	{
		name: "Notion",
		src: NotionLogo,
	},
	{
		name: "Gmail",
		src: GmailLogo,
	},
	{
		name: "Polar",
		src: PolarLogo,
	},
	{
		name: "Cursor",
		src: CursorLogo,
		isInvertable: true,
	},
	{
		name: "Empty 2",
	},
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
								item.src ? "hover:z-10 hover:scale-110" : ""
							)}
							key={`${item.name}-${index}`}
						>
							<div className="flex size-12 items-center justify-center overflow-hidden rounded-full border bg-card shadow-sm md:size-16">
								{item.src && (
									<img
										alt={item.name}
										className={cn(
											"pointer-events-auto size-5 select-none object-contain md:size-6",
											item.isInvertable && "dark:invert"
										)}
										height="auto"
										src={getLogoSrc(item.src)}
										width="auto"
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
