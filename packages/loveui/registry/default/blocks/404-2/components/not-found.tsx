import { Button } from "@/registry/default/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/registry/default/ui/empty";
import { HomeIcon, CompassIcon } from "lucide-react";

export function NotFoundPage() {
	return (
		<div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
			<Empty>
				<EmptyHeader>
					<EmptyTitle className="mask-b-from-20% mask-b-to-80% font-extrabold text-9xl">
						404
					</EmptyTitle>
					<EmptyDescription className="-mt-8 text-nowrap text-foreground/80">
						The page you're looking for might have been <br />
						moved or doesn't exist.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<Button asChild>
							<a href="#">
								<HomeIcon data-icon="inline-start" />
								Go Home
							</a>
						</Button>

						<Button asChild variant="outline">
							<a href="#">
								<CompassIcon data-icon="inline-start" />{" "}
								Explore
							</a>
						</Button>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
}
