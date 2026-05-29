import { cn } from "@/lib/utils";
import { FullWidthDivider } from "./full-width-divider";
import { GridFiller } from "./grid-filler";

type BlogType = {
	title: string;
	date: string;
	description: string;
	category: string;
	author: string;
	href: string;
};

const blogs: BlogType[] = [
	{
		title: "Why LoveUI Ships Components as Editable Source",
		date: "May 20 2026",
		category: "Registry",
		author: "Connor Love",
		description:
			"A closer look at why LoveUI copies code into your app instead of hiding interface decisions inside a package.",
		href: "#",
	},
	{
		title: "Designing Blocks That Feel Ready to Ship",
		date: "May 14 2026",
		category: "Blocks",
		author: "Connor Love",
		description:
			"How LoveUI turns common product sections into polished starting points while keeping the implementation easy to reshape.",
		href: "#",
	},
	{
		title: "Building Better Interfaces with Agent Skills",
		date: "Apr 29 2026",
		category: "AI",
		author: "Connor Love",
		description:
			"Why the LoveUI skill pack gives coding agents concrete design rules instead of vague instructions.",
		href: "#",
	},
	{
		title: "Composing Product Pages from Small Primitives",
		date: "Apr 12 2026",
		category: "Components",
		author: "Connor Love",
		description:
			"How buttons, empty states, accordions, and layout helpers become complete product surfaces inside LoveUI.",
		href: "#",
	},
	{
		title: "Keeping a Design System Close to the App",
		date: "Mar 23 2026",
		category: "Systems",
		author: "Connor Love",
		description:
			"LoveUI is designed so teams can review, version, and customize interface code like any other source file.",
		href: "#",
	},
	{
		title: "What Makes a Registry Example Useful",
		date: "Mar 05 2026",
		category: "Docs",
		author: "Connor Love",
		description:
			"Examples should show real composition patterns, not isolated screenshots. That principle shapes the LoveUI docs.",
		href: "#",
	},
	{
		title: "From Single Component to Full Section",
		date: "Feb 18 2026",
		category: "Engineering",
		author: "Connor Love",
		description:
			"The practical patterns behind moving from reusable primitives to full CTA, FAQ, pricing, and testimonial blocks.",
		href: "#",
	},
	{
		title: "The Case for Owning Your UI",
		date: "Feb 02 2026",
		category: "Workflow",
		author: "Connor Love",
		description:
			"When product details matter, copied source gives teams the confidence to adjust behavior, styling, and structure directly.",
		href: "#",
	},
];

export function BlogsSection() {
	return (
		<div className="mx-auto w-full max-w-5xl py-4 lg:border-x">
			<div className="space-y-2 px-4 py-8 md:py-12">
				<h1 className="font-semibold text-2xl tracking-wide md:text-4xl">
					Latest LoveUI Writing
				</h1>
				<p className="text-muted-foreground text-sm">
					Notes from Connor Love on components, blocks, registries, and
					source-first interface systems.
				</p>
			</div>
			<FullWidthDivider contained={true} />
			<div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
				{blogs.map((blog) => (
					<BlogCard {...blog} key={blog.title} />
				))}
				<GridFiller
					className="bg-background"
					mdColumns={3}
					smColumns={4}
					totalItems={blogs.length}
				/>
			</div>
			<FullWidthDivider contained={true} />
		</div>
	);
}

function BlogCard({
	title,
	date,
	description,
	category,
	author,
	className,
	...props
}: React.ComponentProps<"a"> & BlogType) {
	return (
		<a
			className={cn(
				"group w-full bg-background px-6 py-12 text-muted-foreground hover:cursor-pointer hover:text-foreground active:bg-accent md:px-8 active:dark:bg-accent/50",
				className
			)}
			{...props}
		>
			<h3 className="mb-3 line-clamp-2 font-medium text-foreground text-lg md:text-xl">
				{title}
			</h3>
			<div className="mb-3 flex items-center gap-2">
				<span className="text-muted-foreground text-xs group-hover:text-foreground">
					{category}
				</span>
				<div className="inline-flex size-1 rounded-full bg-muted-foreground" />
				<span className="text-muted-foreground text-xs group-hover:text-foreground">
					{date}
				</span>
			</div>
			<p className="mb-8 line-clamp-3 text-muted-foreground text-sm tracking-wide group-hover:text-foreground">
				{description}
			</p>
			<div className="flex items-center gap-1.5">
				by
				<span className="font-medium font-mono text-foreground/80 text-xs group-hover:text-foreground md:text-sm">
					{author}
				</span>
			</div>
		</a>
	);
}
