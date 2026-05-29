import { GithubIcon } from "./icons/github-icon";
import { GoogleIcon } from "./icons/google-icon";
import { Logo } from "./logo";
import { Particles } from "./particles";
import { Button } from "@/registry/default/ui/button";
import { ChevronLeftIcon } from "lucide-react";

export function AuthPage() {
	return (
		<div className="relative w-full md:h-screen md:overflow-hidden">
			<Particles
				className="absolute inset-0"
				color="#666666"
				ease={20}
				quantity={120}
			/>
			<div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-8">
				<Button asChild className="absolute top-4 left-4" variant="ghost">
					<a href="#">
						<ChevronLeftIcon data-icon="inline-start" />
						Home
					</a>
				</Button>

				<div className="mx-auto space-y-4 sm:w-sm">
					<Logo className="h-5" />
					<div className="flex flex-col space-y-1">
						<h1 className="font-bold text-2xl tracking-wide">
							Sign In or Join Now!
						</h1>
						<p className="text-base text-muted-foreground">
							Sign in or create your LoveUI account.
						</p>
					</div>
					<div className="space-y-2">
						<Button className="w-full" type="button">
							<GoogleIcon data-icon="inline-start" />
							Continue with Google
						</Button>
						<Button className="w-full" type="button">
							<GithubIcon data-icon="inline-start" />
							Continue with GitHub
						</Button>
					</div>
					<p className="mt-8 text-muted-foreground text-sm">
						By clicking continue, you agree to our{" "}
						<a
							className="underline underline-offset-4 hover:text-primary"
							href="#"
						>
							Terms of Service
						</a>{" "}
						and{" "}
						<a
							className="underline underline-offset-4 hover:text-primary"
							href="#"
						>
							Privacy Policy
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
