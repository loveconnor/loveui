import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import NotionLogo from "./logos/notion.svg";
import SupabaseLogo from "./logos/supabase.svg";
import VercelLogo from "./logos/vercel.svg";
import CursorLogo from "./logos/cursor.svg";

type Integration = {
	src: { src: string } | string;
	name: string;
	description: string;
	isInvertable?: boolean;
};

const getLogoSrc = (source: Integration["src"]) =>
	typeof source === "string" ? source : source.src;

const data: Integration[] = [
	{
		src: VercelLogo,
		name: "Vercel",
		description: "Deploy LoveUI examples, docs, and product pages with fast previews.",
		isInvertable: true,
	},
	{
		src: CursorLogo,
		name: "Cursor",
		description: "Use LoveUI Skills to guide AI-assisted interface work in your editor.",
		isInvertable: true,
	},
	{
		src: SupabaseLogo,
		name: "Supabase",
		description: "Pair LoveUI app screens with auth, storage, and product data.",
	},
	{
		src: NotionLogo,
		name: "Notion",
		description: "Document component decisions, block usage, and product patterns.",
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
					<img
						alt={item.name}
						className={cn(
							"pointer-events-none size-8 shrink-0 select-none object-contain",
							item.isInvertable && "dark:invert"
						)}
						height={32}
						src={getLogoSrc(item.src)}
						width={32}
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
