import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/registry/default/ui/avatar";
import { Logo } from "./logo";

export function TestimonialsSection() {
	return (
		<figure className="mx-auto flex w-full max-w-lg flex-col items-center justify-center">
			<div className="mb-8 flex justify-center">
				<Logo aria-label="LoveUI" className="h-12 w-auto" />
			</div>

			<blockquote className="text-center text-xl leading-tight tracking-tight sm:text-2xl md:text-3xl">
				&quot;<span className="font-medium">LoveUI</span> is the source-first UI
				system I reach for when I want polished blocks without giving up
				control of the code.&quot;
			</blockquote>

			<div className="mask-[linear-gradient(to_right,transparent,black,transparent)] mx-auto my-5 h-px w-full max-w-sm bg-border" />

			<figcaption className="flex flex-col items-center gap-5">
				<div className="space-y-0.5 text-center">
					<cite className="font-medium text-foreground text-xl not-italic">
						Connor Love
					</cite>
					<div className="text-lg text-muted-foreground">Creator, LoveUI</div>
				</div>

				<Avatar className="size-12 rounded-full border object-cover">
					<AvatarImage
						alt="Connor Love's profile picture"
						src="https://github.com/loveconnor.png"
					/>
					<AvatarFallback>CL</AvatarFallback>
				</Avatar>
			</figcaption>
		</figure>
	);
}
