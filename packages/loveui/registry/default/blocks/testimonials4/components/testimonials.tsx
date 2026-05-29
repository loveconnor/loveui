import { FullWidthDivider } from "./full-width-divider";
import { QuoteIcon } from "lucide-react";

type Testimonial = {
	quote: string;
	name: string;
	role: string;
	company?: string;
};

const testimonials: Testimonial[] = [
	{
		quote:
			"LoveUI is built around the idea that great components should land in your codebase, not hide behind a package boundary.",
		name: "Connor Love",
		role: "Creator",
		company: "LoveUI",
	},
	{
		quote:
			"I want every LoveUI block to feel ready on day one and still be simple enough to customize on day two.",
		name: "Connor Love",
		role: "Founder",
		company: "LoveUI",
	},

	{
		quote:
			"The best UI library is the one your team can read, edit, and keep. That is the standard behind LoveUI.",
		name: "Connor Love",
		role: "Maintainer",
		company: "LoveUI",
	},
];

export function TestimonialsSection() {
	return (
		<section className="relative mx-auto min-h-screen w-full max-w-4xl place-content-center border-x">
			<FullWidthDivider />
			<div className="grid md:grid-cols-[2fr_1px_1fr]">
				<div className="divide-y">
					{testimonials.slice(0, 2).map((testimonial, index) => (
						<TestimonialCard
							key={`${testimonial.name}-${index}`}
							testimonial={testimonial}
						/>
					))}
				</div>
				<div className="h-px bg-border md:h-auto" />
				<div className="flex items-center">
					<TestimonialCard testimonial={testimonials[2] as Testimonial} />
				</div>
			</div>
			<FullWidthDivider />
		</section>
	);
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
	const { quote, name, role, company } = testimonial;

	return (
		<figure className="p-6 md:p-8">
			<QuoteIcon aria-hidden="true" className="mb-4 size-12 stroke-1 text-muted-foreground" />

			<blockquote className="mb-6 font-normal text-base text-foreground md:text-lg">
				&quot;{quote}&quot;
			</blockquote>

			<figcaption className="flex flex-col gap-0.5">
				<cite className="font-medium text-foreground text-lg not-italic">
					{name}
				</cite>
				<p className="text-muted-foreground text-sm">
					{role}
					{company && `, ${company}`}
				</p>
			</figcaption>
		</figure>
	);
}
