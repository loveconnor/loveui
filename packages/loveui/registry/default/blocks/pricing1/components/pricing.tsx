import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { DecorIcon } from "./decor-icon";
import { ShieldCheckIcon } from "lucide-react";

export function PricingSection() {
	return (
		<section className="w-full space-y-5">
			<div className="mx-auto max-w-lg">
				<div className="flex justify-center">
					<div className="rounded-md border px-4 py-1 text-sm">Pricing</div>
				</div>
				<h2 className="mt-4 text-center font-bold text-2xl tracking-tight md:text-3xl">
					Pricing for Building with LoveUI
				</h2>
				<p className="mt-2 text-center text-muted-foreground text-sm md:text-base">
					Start with the open registry, then upgrade when your team needs more
					blocks, examples, and agent-ready workflows.
				</p>
			</div>

			<div className="mx-auto w-full max-w-2xl space-y-2">
				<div className="relative grid border bg-background p-4 shadow-xs md:grid-cols-2">
					<DecorIcon className="size-3" position="top-left" />
					<DecorIcon className="size-3" position="top-right" />
					<DecorIcon className="size-3" position="bottom-left" />
					<DecorIcon className="size-3" position="bottom-right" />

					<div className="w-full px-4 pt-5 pb-4">
						<div className="space-y-1">
							<div className="flex items-center justify-between">
								<h3 className="font-semibold leading-none">Monthly</h3>
								<div className="flex items-center gap-x-1">
									<span className="text-muted-foreground text-sm line-through">
										$8.99
									</span>
									<Badge variant="secondary">11% off</Badge>
								</div>
							</div>
							<p className="text-muted-foreground text-sm">
								Best for exploring components and shipping a first screen.
							</p>
						</div>
						<div className="mt-10 space-y-4">
							<div className="flex items-end gap-0.5 text-muted-foreground text-xl">
								<span>$</span>
								<span className="-mb-0.5 font-extrabold text-4xl text-foreground tracking-tighter md:text-4xl">
									7.99
								</span>
								<span>/month</span>
							</div>
							<Button asChild className="w-full" variant="outline">
								<a href="#">Browse Registry</a>
							</Button>
						</div>
					</div>
					<div className="relative w-full rounded-md border bg-card p-4 shadow dark:bg-card/80">
						<div className="space-y-1">
							<div className="flex items-center justify-between">
								<h3 className="font-semibold leading-none">Yearly</h3>
								<div className="flex items-center gap-x-1">
									<span className="text-muted-foreground text-sm line-through">
										$8.99
									</span>
									<Badge>22% off</Badge>
								</div>
							</div>
							<p className="text-muted-foreground text-sm">
								Best for teams standardizing product UI with LoveUI.
							</p>
						</div>
						<div className="mt-10 space-y-4">
							<div className="flex items-end text-muted-foreground text-xl">
								<span>$</span>
								<span className="-mb-0.5 font-extrabold text-4xl text-foreground tracking-tighter md:text-4xl">
									6.99
								</span>
								<span>/month</span>
							</div>
							<Button asChild className="w-full">
								<a href="#">Upgrade Workspace</a>
							</Button>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-center gap-x-2 text-muted-foreground text-sm">
					<ShieldCheckIcon className="size-4" />
					<span>Editable source, reusable blocks, and no black-box UI package</span>
				</div>
			</div>
		</section>
	);
}
