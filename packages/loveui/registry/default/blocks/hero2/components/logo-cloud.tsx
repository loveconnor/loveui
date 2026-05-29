import { cn } from "@/lib/utils";
import { DecorIcon } from "./decor-icon";
import ClaudeLogo from "./logos/claude-wordmark.svg";
import ClerkLogo from "./logos/clerk-wordmark.svg";
import GithubLogo from "./logos/github-wordmark.svg";
import NvidiaLogo from "./logos/nvidia-wordmark.svg";
import OpenAILogo from "./logos/openai-wordmark.svg";
import SupabaseLogo from "./logos/supabase-wordmark.svg";
import TursoLogo from "./logos/turso-wordmark.svg";
import VercelLogo from "./logos/vercel-wordmark.svg";

type Logo = {
	src: { src: string } | string;
	alt: string;
};

const getLogoSrc = (source: Logo["src"]) =>
	typeof source === "string" ? source : source.src;

export function LogoCloud() {
	return (
		<div className="grid grid-cols-2 border md:grid-cols-4">
			<LogoCard
				className="relative border-r border-b bg-secondary dark:bg-secondary/30"
				logo={{
					src: NvidiaLogo,
					alt: "Nvidia Logo",
				}}
			>
				<DecorIcon className="z-10" position="bottom-right" />
			</LogoCard>

			<LogoCard
				className="border-b md:border-r"
				logo={{
					src: SupabaseLogo,
					alt: "Supabase Logo",
				}}
			/>

			<LogoCard
				className="relative border-r border-b md:bg-secondary dark:md:bg-secondary/30"
				logo={{
					src: GithubLogo,
					alt: "GitHub Logo",
				}}
			>
				<DecorIcon className="z-10" position="bottom-right" />
				<DecorIcon className="z-10 hidden md:block" position="bottom-left" />
			</LogoCard>

			<LogoCard
				className="relative border-b bg-secondary md:bg-background dark:bg-secondary/30 md:dark:bg-background"
				logo={{
					src: OpenAILogo,
					alt: "OpenAI Logo",
				}}
			/>

			<LogoCard
				className="relative border-r border-b bg-secondary md:border-b-0 md:bg-background dark:bg-secondary/30 md:dark:bg-background"
				logo={{
					src: TursoLogo,
					alt: "Turso Logo",
				}}
			>
				<DecorIcon className="z-10 md:hidden" position="bottom-right" />
			</LogoCard>

			<LogoCard
				className="border-b bg-background md:border-r md:border-b-0 md:bg-secondary dark:md:bg-secondary/30"
				logo={{
					src: ClerkLogo,
					alt: "Clerk Logo",
				}}
			/>

			<LogoCard
				className="border-r"
				logo={{
					src: ClaudeLogo,
					alt: "Claude AI Logo",
				}}
			/>

			<LogoCard
				className="bg-secondary dark:bg-secondary/30"
				logo={{
					src: VercelLogo,
					alt: "Vercel Logo",
				}}
			/>
		</div>
	);
}

type LogoCardProps = React.ComponentProps<"div"> & {
	logo: Logo;
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
	return (
		<div
			className={cn(
				"flex items-center justify-center bg-background px-4 py-8 md:p-8",
				className
			)}
			{...props}
		>
			<img
				alt={logo.alt}
				className="pointer-events-none h-4 select-none md:h-5 dark:brightness-0 dark:invert"
				height="auto"
				src={getLogoSrc(logo.src)}
				width="auto"
			/>
			{children}
		</div>
	);
}
