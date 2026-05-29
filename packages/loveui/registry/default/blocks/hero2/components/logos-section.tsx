import { LogoCloud } from "./logo-cloud";
import { DecorIcon } from "./decor-icon";
import { FullWidthDivider } from "./full-width-divider";

export function LogosSection() {
	return (
		<section className="mb-12">
			<h2 className="py-6 text-center font-medium text-lg text-muted-foreground tracking-tight md:text-xl">
				Trusted by <span className="text-foreground">experts</span>
			</h2>
			<div className="relative *:border-0">
				<DecorIcon className="size-4" position="top-left" />
				<DecorIcon className="size-4" position="top-right" />
				<DecorIcon className="size-4" position="bottom-left" />
				<DecorIcon className="size-4" position="bottom-right" />

				<FullWidthDivider className="-top-px" />
				<LogoCloud />
				<FullWidthDivider className="-bottom-px" />
			</div>
		</section>
	);
}
