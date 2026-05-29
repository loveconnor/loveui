import { cn } from "@/lib/utils";
import { InfiniteSlider } from "./infinite-slider";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/registry/default/ui/avatar";

type Testimonial = {
	quote: string;
	image: string;
	name: string;
	role: string;
	company?: string;
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
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
	return (
		<section className="relative py-10">
			<div className="mx-auto max-w-5xl">
				<div className="mx-auto flex max-w-sm flex-col items-center justify-center gap-4">
					<div className="flex justify-center">
						<div className="rounded-lg border px-4 py-1">Testimonials</div>
					</div>

					<h2 className="font-bold text-3xl tracking-tighter lg:text-4xl">
						Notes from Connor Love
					</h2>
					<p className="text-center text-muted-foreground text-sm">
						Why LoveUI is built as editable source for real product teams.
					</p>
				</div>

				<div
					className={cn(
						"mt-10 flex max-h-160 justify-center gap-6 overflow-hidden",
						"mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
					)}
				>
					<InfiniteSlider direction="vertical" speed={30} speedOnHover={15}>
						{firstColumn.map((testimonial, index) => (
							<TestimonialsCard
								key={`${testimonial.name}-${index}`}
								testimonial={testimonial}
							/>
						))}
					</InfiniteSlider>
					<InfiniteSlider
						className="hidden md:block"
						direction="vertical"
						speed={50}
						speedOnHover={25}
					>
						{secondColumn.map((testimonial, index) => (
							<TestimonialsCard
								key={`${testimonial.name}-${index}`}
								testimonial={testimonial}
							/>
						))}
					</InfiniteSlider>
					<InfiniteSlider
						className="hidden lg:block"
						direction="vertical"
						speed={35}
						speedOnHover={17}
					>
						{thirdColumn.map((testimonial, index) => (
							<TestimonialsCard
								key={`${testimonial.name}-${index}`}
								testimonial={testimonial}
							/>
						))}
					</InfiniteSlider>
				</div>
			</div>
		</section>
	);
}

function TestimonialsCard({
	testimonial,
	className,
	...props
}: React.ComponentProps<"figure"> & {
	testimonial: Testimonial;
}) {
	const { quote, image, name, role, company } = testimonial;
	return (
		<figure
			className={cn(
				"w-full max-w-xs rounded-3xl border bg-card p-8 shadow-foreground/10 shadow-lg dark:bg-card/20",
				className
			)}
			{...props}
		>
			<blockquote>{quote}</blockquote>
			<figcaption className="mt-5 flex items-center gap-2">
				<Avatar className="size-8 rounded-full">
					<AvatarImage alt={`${name}'s profile picture`} src={image} />
					<AvatarFallback>{name.charAt(0)}</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<cite className="font-medium not-italic leading-5 tracking-tight">
						{name}
					</cite>
					<span className="text-muted-foreground text-sm leading-5 tracking-tight">
						{role} {company && `, ${company}`}
					</span>
				</div>
			</figcaption>
		</figure>
	);
}
