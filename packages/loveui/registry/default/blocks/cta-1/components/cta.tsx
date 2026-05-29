import { Button } from "@/registry/default/ui/button";
import { FullWidthDivider } from "./full-width-divider";

export function CallToAction() {
	return (
		<div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between border-x md:flex-row">
			<FullWidthDivider className="-top-px" />
			<div className="border-b p-4 md:border-b-0">
				<h2 className="text-center font-bold text-lg md:text-left md:text-2xl">
					Ship cleaner dashboards this week.
				</h2>
			</div>
			<div className="flex items-center justify-center gap-2 p-4 md:border-l">
				<Button variant="secondary">Book a Demo</Button>
				<Button>Start Building</Button>
			</div>
			<FullWidthDivider className="-bottom-px" />
		</div>
	);
}
