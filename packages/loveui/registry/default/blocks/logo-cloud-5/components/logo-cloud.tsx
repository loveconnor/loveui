import ClaudeLogo from "./logos/claude-wordmark.svg";
import ClerkLogo from "./logos/clerk-wordmark.svg";
import GithubLogo from "./logos/github-wordmark.svg";
import NvidiaLogo from "./logos/nvidia-wordmark.svg";
import OpenAILogo from "./logos/openai-wordmark.svg";
import SupabaseLogo from "./logos/supabase-wordmark.svg";
import TursoLogo from "./logos/turso-wordmark.svg";
import VercelLogo from "./logos/vercel-wordmark.svg";

type LogoSource = { src: string } | string;

const getLogoSrc = (source: LogoSource) =>
	typeof source === "string" ? source : source.src;

export function LogoCloud() {
	return (
		<div className="relative flex flex-wrap items-center justify-center gap-x-10 gap-y-8 py-6 sm:gap-x-12 sm:gap-y-12">
			{logos.map((logo) => (
				<img
					alt={logo.alt}
					className="pointer-events-none h-5 w-fit select-none dark:brightness-0 dark:invert"
					height="auto"
					key={logo.alt}
					loading="lazy"
					src={getLogoSrc(logo.src)}
					width="auto"
				/>
			))}
		</div>
	);
}

const logos = [
	{
		src: VercelLogo,
		alt: "Vercel Logo",
	},
	{
		src: SupabaseLogo,
		alt: "Supabase Logo",
	},
	{
		src: OpenAILogo,
		alt: "OpenAI Logo",
	},
	{
		src: TursoLogo,
		alt: "Turso Logo",
	},

	{
		src: GithubLogo,
		alt: "GitHub Logo",
	},
	{
		src: ClaudeLogo,
		alt: "Claude AI Logo",
	},
	{
		src: NvidiaLogo,
		alt: "Nvidia Logo",
	},
	{
		src: ClerkLogo,
		alt: "Clerk Logo",
	},
];
