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
		<div className="grid grid-cols-2 rounded-lg bg-border shadow md:grid-cols-4">
			{logos.map((logo) => (
				<div
					className="flex items-center justify-center rounded-lg border bg-background p-8"
					key={logo.alt}
				>
					<img
						alt={logo.alt}
						className="pointer-events-none block h-4 select-none md:h-5 dark:brightness-0 dark:invert"
						height="auto"
						loading="lazy"
						src={getLogoSrc(logo.src)}
						width="auto"
					/>
				</div>
			))}
		</div>
	);
}

const logos = [
	{
		src: NvidiaLogo,
		alt: "Nvidia Logo",
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
		src: VercelLogo,
		alt: "Vercel Logo",
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
		src: ClerkLogo,
		alt: "Clerk Logo",
	},
];
