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
		<div className="relative flex flex-wrap items-center justify-center gap-x-8 gap-y-8 py-6 sm:gap-x-12 sm:gap-y-10">
			{logos.map((logo) => (
				<LogoAsset
					className="pointer-events-none h-8 w-32 select-none text-foreground sm:h-9 sm:w-36"
					key={logo.alt}
					logo={logo}
				/>
			))}
		</div>
	);
}
