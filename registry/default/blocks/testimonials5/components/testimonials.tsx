import { cn } from "@/lib/utils";
import { GridPattern } from "./grid-pattern";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/registry/default/ui/avatar";
import { FullWidthDivider } from "./full-width-divider";
import { GridFiller } from "./grid-filler";

type Testimonial = {
	name: string;
	role: string;
	image: string;
	company?: string;
	quote: string;
};

const testimonials: Testimonial[] = [
	{
		quote:
			"LoveUI gives teams polished defaults while keeping every component close enough to inspect, change, and own.",
		image: "https://github.com/loveconnor.png",
		name: "Connor Love",
		role: "Creator",
		company: "LoveUI",
	},
	{
		quote:
			"I built LoveUI to make high-quality product UI feel practical: install the source, keep the parts you need, and move.",
		image: "https://github.com/loveconnor.png",
		name: "Connor Love",
		role: "Founder",
		company: "LoveUI",
	},
	{
		quote:
			"LoveUI blocks are designed to be starting points for real product screens, not screenshots you have to rebuild from scratch.",
		image: "https://github.com/loveconnor.png",
		name: "Connor Love",
		role: "Maintainer",
		company: "LoveUI",
	},
	{
		quote:
			"The registry is intentionally source-first, so teams can adapt LoveUI to their product instead of adapting the product to a package.",
		image: "https://github.com/loveconnor.png",
		name: "Connor Love",
		role: "Creator",
		company: "LoveUI",
	},
	{
		quote:
			"LoveUI pairs reusable primitives with full sections so you can jump from component work to complete screens quickly.",
		image: "https://github.com/loveconnor.png",
		name: "Connor Love",
		role: "Designer",
		company: "LoveUI",
	},
	{
		quote:
			"The goal is simple: give builders the kind of interface foundation I want when I am moving fast but still care about craft.",
		image: "https://github.com/loveconnor.png",
		name: "Connor Love",
		role: "Builder",
		company: "LoveUI",
	},
	{
		quote:
			"LoveUI is for product teams that need a consistent system, useful examples, and enough control to make every surface feel custom.",
		image: "https://github.com/loveconnor.png",
		name: "Connor Love",
		role: "Maintainer",
		company: "LoveUI",
	},
	{
		quote:
			"Every example is meant to show how the primitives compose into usable, production-minded product interfaces.",
		image: "https://github.com/loveconnor.png",
		name: "Connor Love",
		role: "Creator",
		company: "LoveUI",
	},
	{
		quote:
			"LoveUI should feel like a strong design partner in your repo: opinionated enough to help, flexible enough to disappear.",
		image: "https://github.com/loveconnor.png",
		name: "Connor Love",
		role: "Founder",
		company: "LoveUI",
	},
	{
		quote:
			"The agent skills are there for the same reason as the blocks: better defaults, fewer vague instructions, and cleaner UI work.",
		image: "https://github.com/loveconnor.png",
		name: "Connor Love",
		role: "Creator",
		company: "LoveUI",
	},
	{
		quote:
			"LoveUI keeps the workflow direct: choose a block, copy the code, and shape it into the exact experience your product needs.",
		image: "https://github.com/loveconnor.png",
		name: "Connor Love",
		role: "Builder",
		company: "LoveUI",
	},
];

export function TestimonialsSection() {
	return (
		<div className="mx-auto min-h-screen max-w-5xl space-y-8 border-x py-6">
			<div className="flex flex-col gap-2 px-4 md:px-6">
				<h1 className="text-balance font-semibold text-3xl tracking-wide md:text-4xl xl:font-bold">
					Why I built LoveUI
				</h1>
				<p className="text-muted-foreground text-sm md:text-base lg:text-lg">
					Notes from Connor Love on building an editable, source-first UI
					registry for polished product interfaces.
				</p>
			</div>
			<div className="relative grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
				<FullWidthDivider position="top" />
				{testimonials.map((testimonial, index) => (
					<TestimonialsCard
						key={`${testimonial.name}-${index}`}
						testimonial={testimonial}
					/>
				))}
				<GridFiller
					className="bg-background"
					lgColumns={3}
					smColumns={2}
					totalItems={testimonials.length}
				/>
				<FullWidthDivider position="bottom" />
			</div>
		</div>
	);
}

function TestimonialsCard({
	testimonial,
	className,
	...props
}: React.ComponentProps<"figure"> & {
	testimonial: Testimonial;
}) {
	const { quote, company, image, name, role } = testimonial;
	return (
		<figure
			className={cn(
				"relative grid grid-cols-[auto_1fr] gap-x-3 overflow-hidden bg-background p-4",
				className
			)}
			{...props}
		>
			<div className="mask-[radial-gradient(farthest-side_at_top,white,transparent)] pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 size-full">
				<GridPattern
					className="absolute inset-0 size-full stroke-border"
					height={25}
					width={25}
					x={-12}
					y={4}
				/>
			</div>

			<Avatar className="size-8 rounded-full">
				<AvatarImage alt={`${name}'s profile picture`} src={image} />
				<AvatarFallback>{name.charAt(0)}</AvatarFallback>
			</Avatar>
			<div>
				<figcaption className="-mt-0.5 -space-y-0.5">
					<cite className="text-sm not-italic md:text-base">{name}</cite>
					<span className="block font-light text-[11px] text-muted-foreground tracking-tight">
						{role}
						{company && `, ${company}`}
					</span>
				</figcaption>
				<blockquote className="mt-3">
					<p className="text-foreground/80 text-sm tracking-wide">{quote}</p>
				</blockquote>
			</div>
		</figure>
	);
}
