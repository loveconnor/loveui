// https://motion-primitives.com/docs/infinite-slider
import { InfiniteSlider } from "./infinite-slider";
// https://motion-primitives.com/docs/progressive-blur
import { ProgressiveBlur } from "./progressive-blur";
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
		<div className="relative border-x border-y bg-linear-to-r from-secondary via-transparent to-secondary py-6">
			<InfiniteSlider gap={42} reverse speed={60} speedOnHover={20}>
				{logos.map((logo) => (
					<img
						alt={logo.alt}
						className="pointer-events-none h-4 select-none md:h-5 dark:brightness-0 dark:invert"
						height="auto"
						key={`logo-${logo.alt}`}
						loading="lazy"
						src={getLogoSrc(logo.src)}
						width="auto"
					/>
				))}
			</InfiniteSlider>

			<ProgressiveBlur
				blurIntensity={1}
				className="pointer-events-none absolute top-0 left-0 h-full w-[100px] md:w-[160px]"
				direction="left"
			/>
			<ProgressiveBlur
				blurIntensity={1}
				className="pointer-events-none absolute top-0 right-0 h-full w-[100px] md:w-[160px]"
				direction="right"
			/>
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
