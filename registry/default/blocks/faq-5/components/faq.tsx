"use client";
import { cn } from "@/lib/utils";

import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/default/ui/accordion";
import { Button } from "@/registry/default/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/registry/default/ui/empty";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/registry/default/ui/input-group";
import { FullWidthDivider } from "./full-width-divider";
import { SearchIcon, SearchSlashIcon } from "lucide-react";

export function FaqsSection() {
	const [searchTerm, setSearchTerm] = React.useState("");
	const [activeCategory, setActiveCategory] = React.useState("all");

	const categories = [
		{ id: "all", label: "All" },
		{ id: "getting-started", label: "Getting Started" },
		{ id: "features", label: "Features" },
		{ id: "license", label: "License" },
		{ id: "support", label: "Support" },
	];

	const filtered = faqs.filter((faq) => {
		const matchesCategory =
			activeCategory === "all" || faq.category === activeCategory;
		const matchesSearch =
			faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			faq.content.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	return (
		<div className="mx-auto min-h-screen w-full max-w-3xl md:border-x">
			<div className="px-4 py-16 lg:px-6">
				<h1 className="mb-4 font-semibold text-3xl md:text-4xl">
					Frequently Asked Questions
				</h1>
				<p className="mb-8 max-w-2xl text-muted-foreground">
					Find answers to common questions about LoveUI. Can't find what you're
					looking for? Our support team is here to help.
				</p>

				<InputGroup className="max-w-sm">
					<InputGroupInput
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search FAQs..."
						value={searchTerm}
					/>
					<InputGroupAddon>
						<SearchIcon data-icon="inline-start" />
					</InputGroupAddon>
				</InputGroup>
			</div>

			<FullWidthDivider contained />

			<div className="flex flex-wrap gap-1 border-b px-4 md:gap-3">
				{categories.map((cat) => (
					<button
						className="flex flex-col"
						key={cat.id}
						onClick={() => setActiveCategory(cat.id)}
						type="button"
					>
						<span
							className={cn(
								"p-1 text-muted-foreground text-sm hover:text-primary md:p-2 md:text-base",
								activeCategory === cat.id && "text-primary"
							)}
						>
							{cat.label}
						</span>
						{activeCategory === cat.id && (
							<span className="h-0.5 w-full rounded-full bg-primary" />
						)}
					</button>
				))}
			</div>

			<Accordion
				className="space-y-2 border-0! px-4 py-12 lg:px-6"
				collapsible
				type="single"
			>
				{filtered.map((faq) => (
					<AccordionItem
						className="rounded-lg border px-4 shadow-xs"
						key={faq.id}
						value={faq.id.toString()}
					>
						<AccordionTrigger className="hover:no-underline">
							{faq.title}
						</AccordionTrigger>
						<AccordionContent className="pt-2 pb-4 text-muted-foreground">
							{faq.content}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			{filtered.length === 0 && (
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<SearchIcon
							/>
						</EmptyMedia>
						<EmptyTitle>No FAQs found matching your search.</EmptyTitle>
					</EmptyHeader>
					<EmptyContent>
						<Button onClick={() => setSearchTerm("")} variant="outline">
							<SearchSlashIcon data-icon="inline-start" />
							Clear search
						</Button>
					</EmptyContent>
				</Empty>
			)}

			<div className="flex items-center px-4 py-6 lg:px-6">
				<p className="text-muted-foreground">
					Can't find what you're looking for?{" "}
					<a className="text-primary hover:underline" href="#">
						Contact Us
					</a>
				</p>
			</div>
		</div>
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
