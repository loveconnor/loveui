import { cn } from "@/lib/utils";
import { GithubIcon } from "./icons/github-icon";
import { GoogleIcon } from "./icons/google-icon";
import { Logo } from "./logo";
import { Button } from "@/registry/default/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/registry/default/ui/input-group";
import { AuthDivider } from "./ui/auth-divider";
import { AtSignIcon } from "lucide-react";

export function AuthPage() {
	return (
		<div className="relative w-full overflow-hidden md:h-screen">
			<div
				className={cn(
					"relative mx-auto flex min-h-screen w-full max-w-sm flex-col justify-between p-6 md:p-8"
				)}
			>
				<div className="flex justify-center">
					<a href="#">
						<Logo className="h-4.5" />
					</a>
				</div>

				<div className="fade-in slide-in-from-bottom-4 w-full animate-in space-y-4 duration-600">
						<div className="flex flex-col space-y-1">
							<h1 className="font-bold text-2xl tracking-wide">Join Now!</h1>
							<p className="text-base text-muted-foreground">
							Sign in or create your LoveUI account.
							</p>
						</div>
					<form className="space-y-2">
						<InputGroup>
							<InputGroupInput
								placeholder="your.email@example.com"
								type="email"
							/>
							<InputGroupAddon align="inline-start">
								<AtSignIcon
								/>
							</InputGroupAddon>
						</InputGroup>

						<Button className="w-full" size="sm" type="button">
							Continue With Email
						</Button>
					</form>
					<AuthDivider>OR CONTINUE WITH</AuthDivider>
					<div className="space-y-2">
						<Button className="w-full" type="button" variant="outline">
							<GoogleIcon data-icon="inline-start" />
							Google
						</Button>
						<Button className="w-full" type="button" variant="outline">
							<GithubIcon data-icon="inline-start" />
							GitHub
						</Button>
					</div>
				</div>

				<p className="text-center text-muted-foreground text-sm">
					This site is protected by reCAPTCHA and the Google{" "}
					<a
						className="underline underline-offset-4 hover:text-primary"
						href="#"
					>
						Privacy Policy
					</a>{" "}
					and{" "}
					<a
						className="underline underline-offset-4 hover:text-primary"
						href="#"
					>
						Terms of Service
					</a>{" "}
					apply.
				</p>
			</div>
		</div>
	);
}
