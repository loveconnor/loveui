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

import { cn } from "@/lib/utils";
import { DecorIcon } from "./decor-icon";

type LogoComponent = ElementType<SVGProps<SVGSVGElement>>;

type Logo = {
	Component: LogoComponent;
	alt: string;
	className?: string;
};

function LogoAsset({ logo, className }: { logo: Logo; className: string }) {
	const Component = logo.Component;

	return (
		<Component
			aria-label={logo.alt}
			className={cn(className, logo.className)}
			role="img"
		/>
	);
}

export function LogoCloud() {
	return (
		<div className="grid grid-cols-2 border md:grid-cols-4">
			<LogoCard
				className="relative border-r border-b bg-secondary dark:bg-secondary/30"
				logo={{ Component: NextjsLogo, alt: "Next.js Logo" }}
			>
				<DecorIcon className="z-10" position="bottom-right" />
			</LogoCard>

			<LogoCard
				className="border-b md:border-r"
				logo={{ Component: ResendLogo, alt: "Resend Logo" }}
			/>

			<LogoCard
				className="relative border-r border-b md:bg-secondary dark:md:bg-secondary/30"
				logo={{ Component: GithubLogo, alt: "GitHub Logo" }}
			>
				<DecorIcon className="z-10" position="bottom-right" />
				<DecorIcon className="z-10 hidden md:block" position="bottom-left" />
			</LogoCard>

			<LogoCard
				className="relative border-b bg-secondary md:bg-background dark:bg-secondary/30 md:dark:bg-background"
				logo={{ Component: OpenAILogo, alt: "OpenAI Logo" }}
			/>

			<LogoCard
				className="relative border-r border-b bg-secondary md:border-b-0 md:bg-background dark:bg-secondary/30 md:dark:bg-background"
				logo={{ Component: IBMLogo, alt: "IBM Logo" }}
			>
				<DecorIcon className="z-10 md:hidden" position="bottom-right" />
			</LogoCard>

			<LogoCard
				className="border-b bg-background md:border-r md:border-b-0 md:bg-secondary dark:md:bg-secondary/30"
				logo={{ Component: ClerkLogo, alt: "Clerk Logo" }}
			/>

			<LogoCard
				className="border-r"
				logo={{ Component: ClaudeLogo, alt: "Claude AI Logo" }}
			/>

			<LogoCard
				className="bg-secondary dark:bg-secondary/30"
				logo={{ Component: VercelLogo, alt: "Vercel Logo" }}
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
				"flex min-h-28 items-center justify-center bg-background px-4 py-8 md:p-8",
				className
			)}
			{...props}
		>
			<LogoAsset
				className="pointer-events-none h-9 w-36 select-none text-foreground md:h-11 md:w-44"
				logo={logo}
			/>
			{children}
		</div>
	);
}
