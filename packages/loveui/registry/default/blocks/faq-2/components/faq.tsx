import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/default/ui/accordion";

export function FaqsSection() {
	return (
		<div className="mx-auto min-h-screen w-full max-w-5xl lg:border-x">
			<div className="mx-4 grid h-[calc(100vh-3.5rem)] grid-cols-1 border-x md:mx-0 md:grid-cols-2 md:border-x-0">
				<div className="space-y-4 px-4 pt-12 pb-4 md:border-r">
					<h2 className="font-black text-3xl md:text-4xl">FAQs</h2>
					<p className="text-muted-foreground">
						Here are some common questions and answers that you might encounter
						when using LoveUI.
					</p>
				</div>
				<div className="place-content-center">
					<Accordion
						className="rounded-none border-x-0 border-y"
						collapsible
						type="single"
					>
						{questions.map((item) => (
							<AccordionItem className="px-4" key={item.id} value={item.id}>
								<AccordionTrigger className="py-4 hover:no-underline focus-visible:underline focus-visible:ring-0">
									{item.title}
								</AccordionTrigger>
								<AccordionContent className="pb-4 text-muted-foreground">
									{item.content}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
			<div className="flex h-14 items-center justify-center border-t">
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

const questions = [
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
