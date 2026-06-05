// https://motion-primitives.com/docs/infinite-slider
import { InfiniteSlider } from "./infinite-slider";
// https://motion-primitives.com/docs/progressive-blur
import { ProgressiveBlur } from "./progressive-blur";
import type { ElementType, SVGProps } from "react";
import {
	ClaudeAIWordmark as ClaudeLogo,
	ClerkWordmark as ClerkLogo,
	GithubWordmark as GithubLogo,
	IBMWordmark as IBMLogo,
	NextjsWordmark as NextjsLogo,
	OpenAIWordmark as OpenAILogo,
	ResendWordmark as ResendLogo,
	VercelWordmark as VercelLogo,
} from "love-ui/logos";

type LogoComponent = ElementType<SVGProps<SVGSVGElement>>;

type Logo = {
	Component: LogoComponent;
	alt: string;
	className?: string;
};

function LogoAsset({ logo, className }: { logo: Logo; className: string }) {
	const Component = logo.Component;
	const logoClassName = [className, logo.className].filter(Boolean).join(" ");

	return <Component aria-label={logo.alt} className={logoClassName} role="img" />;
}

const logos: Logo[] = [
	{ Component: VercelLogo, alt: "Vercel Logo" },
	{ Component: NextjsLogo, alt: "Next.js Logo" },
	{ Component: OpenAILogo, alt: "OpenAI Logo" },
	{ Component: ResendLogo, alt: "Resend Logo" },
	{ Component: GithubLogo, alt: "GitHub Logo" },
	{ Component: ClaudeLogo, alt: "Claude AI Logo" },
	{ Component: IBMLogo, alt: "IBM Logo" },
	{ Component: ClerkLogo, alt: "Clerk Logo" },
];

export function LogoCloud() {
	return (
		<div className="relative border-x border-y bg-linear-to-r from-secondary via-transparent to-secondary py-7">
			<InfiniteSlider gap={56} reverse speed={60} speedOnHover={20}>
				{logos.map((logo) => (
					<LogoAsset
						className="pointer-events-none h-9 w-36 select-none text-foreground md:h-10 md:w-40"
						key={logo.alt}
						logo={logo}
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
