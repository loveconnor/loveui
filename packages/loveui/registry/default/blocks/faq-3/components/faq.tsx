import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/default/ui/accordion";
import { DecorIcon } from "./decor-icon";

export function FaqsSection() {
	return (
		<section className="mx-auto grid min-h-screen w-full max-w-5xl grid-cols-1 md:grid-cols-2 lg:border-x">
			<div className="px-4 pt-12 pb-6">
				<div className="space-y-5">
					<h2 className="text-balance font-bold text-4xl md:text-6xl lg:font-black">
						Frequently Asked Questions
					</h2>
					<p className="text-muted-foreground">
						Quick answers to common questions about LoveUI. Open any question to
						learn more.
					</p>
					<p className="text-muted-foreground">
						{"Can't find what you're looking for? "}
						<a className="text-primary hover:underline" href="#">
							Contact Us
						</a>
					</p>
				</div>
			</div>
			<div className="relative place-content-center">
				{/* vertical guide line */}
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-y-0 left-3 h-full w-px bg-border"
				/>

				<Accordion
					className="rounded-none border-x-0 border-y"
					collapsible
					type="single"
				>
					{faqs.map((item) => (
						<AccordionItem
							className="group relative pl-5"
							key={item.id}
							value={item.id}
						>
							<DecorIcon
								className="left-[13px] size-3 group-last:hidden"
								position="bottom-left"
							/>

							<AccordionTrigger className="px-4 py-4 hover:no-underline focus-visible:underline focus-visible:ring-0">
								{item.title}
							</AccordionTrigger>

							<AccordionContent className="px-4 pb-4 text-muted-foreground">
								{item.content}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}

const faqs = [
	{
		id: "item-1",
		title: "What is LoveUI?",
		content:
			"LoveUI is an open-source collection of React components, examples, blocks, and patterns for building polished interfaces with Tailwind CSS.",
	},
	{
		id: "item-2",
		title: "Who can benefit from LoveUI?",
		content:
			"LoveUI is built for founders, product teams, agencies, and developers who want editable UI source instead of a black-box component package.",
	},
	{
		id: "item-3",
		title: "What does LoveUI include?",
		content:
			"LoveUI includes reusable UI components, production-ready examples, full-page blocks, documentation, and an optional skill pack for AI coding agents.",
	},
	{
		id: "item-4",
		title: "Can I customize LoveUI components?",
		content:
			"Yes. The CLI copies component source into your project, so you can inspect the code, change the styles, and keep only the pieces you need.",
	},
	{
		id: "item-5",
		title: "Does LoveUI work with my existing app?",
		content:
			"Yes. LoveUI works well in React projects using Tailwind CSS. You can add individual components and adjust import paths to match your app.",
	},
	{
		id: "item-6",
		title: "Where can I get help with LoveUI?",
		content:
			"Start with the docs and registry examples. If something looks wrong, open an issue or inspect the copied source directly in your project.",
	},
	{
		id: "item-7",
		title: "How do I get started with LoveUI?",
		content:
			"Run npx love-ui@latest add loveui to install the shared setup, then add components or blocks as your interface needs them.",
	},
];
