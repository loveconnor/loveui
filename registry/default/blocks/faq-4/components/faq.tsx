"use client";
import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/default/ui/accordion";
import { Button } from "@/registry/default/ui/button";
import { LayoutGridIcon, PowerIcon, FeatherIcon, CreditCardIcon, LifeBuoyIcon } from "lucide-react";

const categories = [
	{
		icon: (
			<LayoutGridIcon className="size-4" />
		),
		id: "all",
		label: "All Topics",
	},
	{
		icon: (
			<PowerIcon className="size-4" />
		),
		id: "getting-started",
		label: "Getting Started",
	},
	{
		icon: (
			<FeatherIcon className="size-4" />
		),
		id: "features",
		label: "Features",
	},
	{
		icon: (
			<CreditCardIcon className="size-4" />
		),
		id: "license",
		label: "License",
	},
	{
		icon: (
			<LifeBuoyIcon className="size-4" />
		),
		id: "support",
		label: "Support",
	},
];

export function FaqsSection() {
	const [activeCategory, setActiveCategory] = React.useState("all");

	const filtered = faqs.filter((faq) => {
		const matchesCategory =
			activeCategory === "all" || faq.category === activeCategory;
		return matchesCategory;
	});

	const currentCategory = React.useMemo(
		() => categories.find((cat) => cat.id === activeCategory),
		[activeCategory]
	);

	return (
		<section className="mx-auto min-h-screen w-full max-w-5xl">
			<div className="flex flex-col items-center justify-center gap-4 px-4 py-16">
				<h2 className="text-balance font-black font-mono text-4xl md:text-5xl lg:font-black">
					FAQs
				</h2>
				<p className="text-muted-foreground">Answers about using LoveUI.</p>
			</div>
			<div className="relative grid min-h-full grid-cols-1 py-12 md:grid-cols-3">
				<div className="flex h-full items-start justify-center border-b pb-2 md:border-b-0">
					<div className="flex w-max flex-wrap items-start justify-start gap-2 md:flex-col md:justify-center">
						{categories.map((cat) => (
							<Button
								key={cat.id}
								onClick={() => setActiveCategory(cat.id)}
								variant={activeCategory === cat.id ? "outline" : "ghost"}
							>
								{cat.icon}
								{cat.label}
							</Button>
						))}
					</div>
				</div>
				<div className="col-span-2 space-y-5 px-4 py-5">
					{currentCategory && (
						<div className="flex items-center gap-2">
							{currentCategory.icon}
							<span className="font-medium">{currentCategory.label}</span>
						</div>
					)}
					<Accordion className="space-y-2" collapsible type="single">
						{filtered.map((item) => (
							<AccordionItem
								className="border-b-0"
								key={item.id}
								value={item.id.toString()}
							>
								<AccordionTrigger className="bg-muted px-4 hover:no-underline dark:bg-muted/50">
									{item.title}
								</AccordionTrigger>

								<AccordionContent className="p-4">
									{item.content}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}

const faqs = [
	{
		id: 1,
		category: "getting-started",
		title: "How do I add my first component?",
		content:
			"Run npx love-ui@latest add loveui to install the shared setup, then add a component such as npx love-ui@latest add button.",
	},
	{
		id: 2,
		category: "getting-started",
		title: "What are the system requirements?",
		content:
			"LoveUI is designed for React projects that use Tailwind CSS. If your project uses a different import alias, update the copied imports after installation.",
	},
	{
		id: 3,
		category: "features",
		title: "Can I use LoveUI with a product team?",
		content:
			"Yes. Because LoveUI components live in your codebase, teams can review, edit, and version them like any other application source.",
	},
	{
		id: 4,
		category: "features",
		title: "What does the component library include?",
		content:
			"LoveUI includes primitives, examples, and full-page blocks for common product interfaces, from forms and dialogs to auth screens and FAQ sections.",
	},
	{
		id: 5,
		category: "features",
		title: "Does LoveUI include AI agent guidance?",
		content:
			"Yes. LoveUI Skills gives AI coding agents design rules, workflow steps, and quality checks for building better interfaces with LoveUI.",
	},
	{
		id: 6,
		category: "license",
		title: "Is LoveUI free to use?",
		content:
			"Yes. LoveUI is open source under the MIT license, so you can use it in personal, internal, and commercial projects.",
	},
	{
		id: 7,
		category: "license",
		title: "Do I have to keep the generated files unchanged?",
		content:
			"No. The source is copied into your app specifically so you can rename, restyle, and reshape it for your product.",
	},
	{
		id: 8,
		category: "support",
		title: "How do I report a bug?",
		content:
			"Open a GitHub issue with a small reproduction, the component name, and the behavior you expected to see.",
	},
	{
		id: 9,
		category: "support",
		title: "Where should I look for examples?",
		content:
			"Start with the component docs and block gallery. Each item shows the install command and source files you can copy or customize.",
	},
];
