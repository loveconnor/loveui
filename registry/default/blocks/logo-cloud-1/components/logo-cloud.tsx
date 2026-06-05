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
		<div className="grid grid-cols-2 rounded-lg bg-border shadow md:grid-cols-4">
			{logos.map((logo) => (
				<div
					className="flex min-h-28 items-center justify-center rounded-lg border bg-background p-6"
					key={logo.alt}
				>
					<LogoAsset
						className="pointer-events-none h-9 w-36 select-none text-foreground md:h-11 md:w-44"
						logo={logo}
					/>
				</div>
			))}
		</div>
	);
}
