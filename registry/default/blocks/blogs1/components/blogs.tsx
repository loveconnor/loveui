import { cn } from "@/lib/utils";
import { FullWidthDivider } from "./full-width-divider";

const blogs = [
	{
		title: "Why LoveUI Ships Source",
		date: "May 20 2026",
		description:
			"How editable components give teams more control than a black-box UI package.",
		href: "#",
	},
	{
		title: "Blocks That Feel Finished",
		date: "May 14 2026",
		description: "Design notes from building polished sections on top of primitives.",
		href: "#",
	},
	{
		title: "A Better Registry Workflow",
		date: "Apr 19 2026",
		description: "Install only the files you need, then shape them around your product.",
		href: "#",
	},
	{
		title: "Designing for AI Agents",
		date: "Apr 12 2026",
		description: "Why LoveUI pairs components with guidance for better interface work.",
		href: "#",
	},
	{
		title: "Composing Product Screens",
		date: "Mar 23 2026",
		description: "How examples, blocks, and primitives work together in LoveUI.",
		href: "#",
	},
];

export function BlogsSection() {
	return (
		<div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-start md:border-x">
			<div className="space-y-2 px-4 py-8 md:py-12">
				<h1 className="font-semibold text-2xl tracking-wide md:text-4xl">
					Latest LoveUI Notes
				</h1>
				<p className="text-muted-foreground text-sm">
					Updates on editable UI source, production blocks, and design system
					workflows.
				</p>
			</div>

			<div className="relative">
				<FullWidthDivider />
				<div className="divide-y">
					{blogs.map((blog) => (
						<BlogCard {...blog} key={blog.title} />
					))}
				</div>
				<FullWidthDivider />
			</div>
		</div>
	);
}

function BlogCard({
	title,
	date,
	description,
	className,
	...props
}: React.ComponentProps<"a"> & {
	title: string;
	date: string;
	description: string;
}) {
	return (
		<a
			className={cn(
				"group flex h-24 w-full flex-col justify-center gap-y-1 p-4 hover:cursor-pointer hover:bg-accent/30 active:bg-accent dark:active:bg-accent/50",
				className
			)}
			{...props}
		>
			<div className="relative flex items-end justify-center gap-2">
				<h3 className="whitespace-nowrap font-medium text-foreground text-lg md:text-xl">
					{title}
				</h3>
				<span className="mb-[6px] w-full border-b-2 border-dashed" />
				<span className="whitespace-nowrap font-mono text-muted-foreground text-xs uppercase group-hover:text-foreground md:text-sm">
					{date}
				</span>
			</div>
			<div className="max-w-sm text-muted-foreground text-sm group-hover:text-foreground md:max-w-full md:text-base">
				{description}
			</div>
		</a>
	);
}
