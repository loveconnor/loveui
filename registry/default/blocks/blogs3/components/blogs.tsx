import { cn } from "@/lib/utils";
import { FullWidthDivider } from "./full-width-divider";
import { LazyImage } from "./lazy-image";

type BlogType = {
	title: string;
	href: string;
	description: string;
	author: string;
	createdAt: string;
	readTime: string;
	image: string;
};

const wikimediaImage = (fileName: string, width = 900) =>
	`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(
		fileName
	)}?width=${width}`;

const blogs: BlogType[] = [
	{
		title: "Why LoveUI Ships Components as Source",
		href: "#",
		description:
			"How copied source gives product teams the confidence to inspect, change, and own their interface layer.",
		image: wikimediaImage(
			"University Hall, The Ohio State University (Columbus, Ohio).jpg"
		),
		createdAt: "2026-05-20",
		author: "Connor Love",
		readTime: "7 min read",
	},
	{
		title: "Designing Blocks That Feel Ready",
		href: "#",
		description:
			"The decisions behind LoveUI sections that look polished on day one and stay easy to reshape on day two.",
		image: wikimediaImage("View of Ohio Stadium.jpg"),
		createdAt: "2026-05-14",
		author: "Connor Love",
		readTime: "5 min read",
	},
	{
		title: "Building Better Interfaces with AI Agents",
		href: "#",
		description:
			"Why LoveUI includes agent skills with concrete design rules, implementation steps, and quality checks.",
		image: wikimediaImage(
			"Mirror Lake at The Ohio State University - DPLA - f1276865f9c52083353de2c6b0068290.jpg"
		),
		createdAt: "2026-04-29",
		author: "Connor Love",
		readTime: "6 min read",
	},
	{
		title: "Composing Product Pages from Primitives",
		href: "#",
		description:
			"How buttons, accordions, empty states, and layout helpers become complete LoveUI product sections.",
		image: wikimediaImage(
			"Thompson Library at The Ohio State University - DPLA - d4a313f4ce0cca7538bf0ea6508722ae.jpg"
		),
		createdAt: "2026-04-12",
		author: "Connor Love",
		readTime: "8 min read",
	},
	{
		title: "Keeping Design Systems Close to the App",
		href: "#",
		description:
			"LoveUI keeps components in your repo so teams can review, version, and adapt them with the rest of the product.",
		image: wikimediaImage("Ohio State University-Ohio Stadium-Rotunda.jpg"),
		createdAt: "2026-03-23",
		author: "Connor Love",
		readTime: "4 min read",
	},
	{
		title: "What Makes a Registry Example Useful",
		href: "#",
		description:
			"Examples should teach real composition patterns, not just show isolated visuals. That idea shapes LoveUI docs.",
		image: wikimediaImage(
			"The Spring and Mirror Lake at Ohio State University - DPLA - 238a754a6579c3fd1788745a85caaf4c (page 1).jpg"
		),
		createdAt: "2026-03-05",
		author: "Connor Love",
		readTime: "9 min read",
	},
	{
		title: "From Component to Full Section",
		href: "#",
		description:
			"The practical path from reusable primitives to CTA, FAQ, pricing, testimonial, and 404 blocks.",
		image: wikimediaImage(
			"Ohio Stadium at The Ohio State University - DPLA - fa20937cd54b73c1c34c09ac5d4d3e6d.jpg"
		),
		createdAt: "2026-02-18",
		author: "Connor Love",
		readTime: "10 min read",
	},
	{
		title: "The Case for Owning Your UI",
		href: "#",
		description:
			"When product details matter, editable source makes styling, behavior, and structure easier to reason about.",
		image: wikimediaImage(
			"Ohio State University - Thompson Library from First Floor.jpg"
		),
		createdAt: "2026-02-02",
		author: "Connor Love",
		readTime: "6 min read",
	},
	{
		title: "Why Blocks Need Real Constraints",
		href: "#",
		description:
			"LoveUI blocks are built around realistic copy, responsive behavior, and controls that work in product contexts.",
		image: wikimediaImage("OSU Ohio Stadium.JPG"),
		createdAt: "2026-01-22",
		author: "Connor Love",
		readTime: "7 min read",
	},
	{
		title: "Making Components Easier to Customize",
		href: "#",
		description:
			"A look at naming, file structure, and examples that help LoveUI components stay understandable after install.",
		image: wikimediaImage("Ohio Stadium (37516165921).jpg", 1200),
		createdAt: "2026-01-09",
		author: "Connor Love",
		readTime: "5 min read",
	},
	{
		title: "The LoveUI Approach to Product Polish",
		href: "#",
		description:
			"Polish comes from spacing, states, hierarchy, and composition. LoveUI tries to make those choices reusable.",
		image: wikimediaImage(
			"Ohio State University campus - DPLA - 74170bd1ea1086f74720703e80e0dc4c.jpg"
		),
		createdAt: "2025-12-18",
		author: "Connor Love",
		readTime: "8 min read",
	},
	{
		title: "A Source-First UI Roadmap",
		href: "#",
		description:
			"What is next for LoveUI: more blocks, stronger examples, and better guidance for teams building with AI.",
		image: wikimediaImage(
			"Ohio State University campus aerial view looking west - DPLA - cb1a04591333ede0f6ac506328c1c460.jpg"
		),
		createdAt: "2025-12-02",
		author: "Connor Love",
		readTime: "6 min read",
	},
];

export function BlogsSection() {
	return (
		<div className="mx-auto w-full max-w-5xl grow">
			<div className="space-y-1 px-4 py-8 md:px-6">
				<h1 className="font-semibold text-2xl tracking-wide md:text-4xl">
					LoveUI Field Notes
				</h1>
				<p className="text-muted-foreground text-sm md:text-base">
					Writing from Connor Love on source-first UI, practical blocks, and
					building better product surfaces.
				</p>
			</div>
			<FullWidthDivider contained={true} />
			<div className="z-10 grid p-4 md:grid-cols-2 lg:grid-cols-3">
				{blogs.map((blog) => (
					<BlogCard {...blog} key={blog.title} />
				))}
			</div>
		</div>
	);
}

function BlogCard({
	title,
	description,
	createdAt,
	readTime,
	image,
	author,
	className,
	...props
}: React.ComponentProps<"a"> & BlogType) {
	return (
		<a
			className={cn(
				"group cn-rounded flex flex-col gap-2 p-3 hover:bg-muted/50 active:bg-muted",
				className
			)}
			key={title}
			{...props}
		>
			<LazyImage
				alt={title}
				className="transition-all duration-500 group-hover:scale-105"
				containerClassName="cn-rounded shadow-md outline outline-offset-3 outline-border/50"
				fallback="https://placehold.co/640x360?text=fallback-image"
				inView={true}
				ratio={16 / 9}
				src={image}
			/>
			<div className="space-y-2 px-2 pb-2">
				<div className="flex items-center gap-2 text-[11px] text-muted-foreground group-hover:text-foreground sm:text-xs">
					<p>by {author}</p>
					<div className="size-1 rounded-full bg-muted-foreground" />
					<p>{createdAt}</p>
					<div className="size-1 rounded-full bg-muted-foreground" />
					<p>{readTime}</p>
				</div>
				<h2 className="line-clamp-2 font-semibold text-lg">{title}</h2>
				<p className="line-clamp-3 text-muted-foreground text-sm group-active:text-foreground">
					{description}
				</p>
			</div>
		</a>
	);
}
