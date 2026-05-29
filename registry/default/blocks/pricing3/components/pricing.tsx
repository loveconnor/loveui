import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import * as PricingCard from "./pricing-card";
import { CheckCircle2, Users, Briefcase, Building } from "lucide-react";

export function PricingSection() {
	return (
		<section className="w-full">
			<div className="mx-auto mb-4 max-w-md space-y-2">
				<div className="flex justify-center">
					<div className="rounded-md border px-4 py-1 text-sm">Pricing</div>
				</div>
				<h2 className="text-center font-bold text-2xl tracking-tight md:text-3xl lg:font-extrabold lg:text-4xl">
					Choose the LoveUI workflow that fits your team
				</h2>
				<p className="text-center text-muted-foreground text-sm md:text-base">
					Use the open-source foundation for free, then add more blocks and
					agent-ready workflows when your product surface grows.
				</p>
			</div>
			<div className="mx-auto grid w-full max-w-4xl gap-4 p-6 md:grid-cols-3">
				{plans.map((plan, index) => (
					<PricingCard.Card
						className={cn("w-full max-w-full", index === 1 && "md:scale-105")}
						key={plan.name}
					>
						<PricingCard.Header isPopular={index === 1}>
							<PricingCard.Plan>
								<PricingCard.PlanName>
									{plan.icon}
									<span>{plan.name}</span>
								</PricingCard.PlanName>
								{plan.badge && (
									<PricingCard.Badge>{plan.badge}</PricingCard.Badge>
								)}
							</PricingCard.Plan>
							<PricingCard.Price>
								<PricingCard.MainPrice>{plan.price}</PricingCard.MainPrice>
								<PricingCard.Period>{plan.period}</PricingCard.Period>
								{plan.original && (
									<PricingCard.OriginalPrice className="ml-auto">
										{plan.original}
									</PricingCard.OriginalPrice>
								)}
							</PricingCard.Price>
							<Button
								className={cn("w-full font-semibold")}
								variant={plan.variant as "outline" | "default"}
							>
								Start Building
							</Button>
						</PricingCard.Header>

						<PricingCard.Body>
							<PricingCard.Description>
								{plan.description}
							</PricingCard.Description>
							<PricingCard.List>
								{plan.features.map((item) => (
									<PricingCard.ListItem className="text-xs" key={item}>
										<CheckCircle2 aria-hidden="true" className="size-4 text-foreground" />
										<span>{item}</span>
									</PricingCard.ListItem>
								))}
							</PricingCard.List>
						</PricingCard.Body>
					</PricingCard.Card>
				))}
			</div>
		</section>
	);
}

const plans = [
	{
		icon: (
			<Users
			/>
		),
		description: "For individual builders exploring the registry",
		name: "Open Source",
		price: "Free",
		variant: "outline",
		features: [
			"Core UI components",
			"Copy-paste source files",
			"Tailwind CSS styling",
			"Accessible primitives",
			"Component documentation",
			"Starter examples",
			"Registry install command",
			"Community issue support",
			"Source you can edit",
		],
	},
	{
		icon: (
			<Briefcase
			/>
		),
		description: "For teams shipping polished product surfaces",
		name: "Team",
		badge: "Popular",
		price: "$29",
		original: "$39",
		period: "/month",
		variant: "default",
		features: [
			"Everything in Open Source",
			"Expanded block collection",
			"Full-page examples",
			"Agent workflow skills",
			"Priority component fixes",
			"Product UI patterns",
			"Reusable section templates",
			"Advanced registry examples",
			"Team onboarding notes",
		],
	},
	{
		icon: (
			<Building
			/>
		),
		name: "Studio",
		description: "For agencies and product teams standardizing UI",
		price: "$99",
		original: "$129",
		period: "/month",
		variant: "outline",
		features: [
			"Everything in Team",
			"Custom block planning",
			"Private registry guidance",
			"Design system alignment",
			"Implementation reviews",
			"Migration support",
			"Unlimited project usage",
			"Reusable team playbooks",
			"Priority roadmap input",
		],
	},
];
