import { Button } from "@/registry/default/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/registry/default/ui/input-group";
import { FullWidthDivider } from "./full-width-divider";
import { AtSign as AtSignIcon, ArrowRight as ArrowRightIcon } from "love-ui/icons";

export function CallToAction() {
	return (
		<div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 border-x bg-secondary/80 px-2 py-8 md:px-4 dark:bg-secondary/40">
			<FullWidthDivider className="-top-px" />

			<div className="space-y-1">
				<h2 className="text-center font-semibold text-2xl tracking-tight md:text-4xl">
					Get the field notes before everyone else
				</h2>
				<p className="text-balance text-center text-muted-foreground text-sm md:text-base">
					Monthly product lessons, interface patterns, and teardown notes.
				</p>
			</div>
			<div className="flex items-center justify-center gap-2">
				<InputGroup className="max-w-[280px] bg-card">
					<InputGroupInput placeholder="you@company.com" />
					<InputGroupAddon>
						<AtSignIcon data-icon="inline-start" />
					</InputGroupAddon>
				</InputGroup>

				<Button>
					Join List{" "}
					<ArrowRightIcon data-icon="inline-end" />
				</Button>
			</div>
			<div className="flex items-center justify-center gap-2">
				<p className="text-muted-foreground text-sm">
					Read by{" "}
					<span className="font-medium text-foreground">4,200 builders</span>.
				</p>
				<div className="flex -space-x-[0.45rem] *:rounded-full *:ring-2 *:ring-background">
					<img
						alt="Avatar 01"
						height={24}
						src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80"
						width={24}
					/>
					<img
						alt="Avatar 02"
						height={24}
						src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=96&h=96&dpr=2&q=80"
						width={24}
					/>
					<img
						alt="Avatar 03"
						height={24}
						src="https://images.unsplash.com/photo-1655874819398-c6dfbec68ac7?w=96&h=96&dpr=2&q=80"
						width={24}
					/>
				</div>
			</div>

			<FullWidthDivider className="-bottom-px" />
		</div>
	);
}
