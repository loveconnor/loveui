import { cn } from "@/lib/utils";
import { DecorIcon } from "./decor-icon";
import CursorLogo from "./logos/cursor.svg";
import GmailLogo from "./logos/gmail.svg";
import NotionLogo from "./logos/notion.svg";
import SupabaseLogo from "./logos/supabase.svg";
import VercelLogo from "./logos/vercel.svg";
import PlanetscaleLogo from "./logos/planetscale.svg";

type Integration = {
	src: { src: string } | string;
	name: string;
	description: string;
	isInvertable?: boolean;
	icon?: React.ReactNode;
};

const getLogoSrc = (source: Integration["src"]) =>
	typeof source === "string" ? source : source.src;

const data: Integration[] = [
	{
		src: VercelLogo,
		name: "Vercel",
		description:
			"Deploy LoveUI block previews, docs, and production product pages.",
		isInvertable: true,
	},
	{
		src: CursorLogo,
		name: "Cursor",
		description:
			"Use LoveUI Skills to give AI agents concrete interface guidance.",
		isInvertable: true,
		icon: <DecorIcon position="bottom-left" />,
	},
	{
		src: SupabaseLogo,
		name: "Supabase",
		description:
			"Connect polished LoveUI surfaces to auth, storage, and application data.",
	},
	{
		src: PlanetscaleLogo,
		name: "PlanetScale",
		description:
			"Back product screens with schema changes your team can review.",
		isInvertable: true,
	},
	{
		src: NotionLogo,
		name: "Notion",
		description:
			"Track component decisions, block adoption, and design system notes.",
	},
	{
		src: GmailLogo,
		name: "Gmail",
		description:
			"Send product notifications from interfaces built with LoveUI forms.",
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
}: React.ComponentProps<"div"> & {
	integration: Integration;
}) {
	return (
		<div
			className={cn(
				"relative flex flex-col items-start gap-4 bg-background p-4 text-start md:p-6 md:even:bg-background/75",
				className
			)}
			{...props}
		>
			<img
				alt={integration.name}
				className={cn(
					"pointer-events-none size-8 shrink-0 select-none object-contain",
					integration.isInvertable && "dark:invert"
				)}
				height={32}
				src={getLogoSrc(integration.src)}
				width={32}
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
