import { Button } from "@/registry/default/ui/button";
import { FullWidthDivider } from "./full-width-divider";
import { ArrowRightIcon } from "lucide-react";

export function CallToAction() {
	return (
		<div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between border-x">
			<FullWidthDivider className="-top-px" />
			<div className="border-b px-2 py-8">
				<h2 className="text-center font-semibold text-lg md:text-2xl">
					Turn scattered work into one clear launch plan.
				</h2>
				<p className="text-balance text-center text-muted-foreground text-sm md:text-base">
					Bring tasks, owners, and decisions together before the next sprint.
				</p>
			</div>
			<div className="flex items-center justify-center gap-2 bg-secondary/80 p-4 dark:bg-secondary/40">
				<Button variant="outline">See Plans</Button>
				<Button>
					Create Workspace{" "}
					<ArrowRightIcon data-icon="inline-end" />
				</Button>
			</div>
			<FullWidthDivider className="-bottom-px" />
		</div>
	);
}
