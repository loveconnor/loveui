import { LogoCloud } from "../components/logo-cloud";

export default function Page() {
	return (
		<div className="min-h-screen w-full place-content-center p-4">
			<div className="w-full">
				<h2 className="mb-5 text-center">
					<span className="block font-medium text-2xl text-muted-foreground">
						Already used by
					</span>
					<span className="font-black text-2xl text-primary tracking-tight md:text-3xl">
						Best in the Game
					</span>
				</h2>
				<div className="relative mx-auto max-w-3xl *:border-y-0">
					<div className="pointer-events-none absolute -top-px left-1/2 h-px w-screen -translate-x-1/2 bg-border" />
					<LogoCloud />
					<div className="pointer-events-none absolute -bottom-px left-1/2 h-px w-screen -translate-x-1/2 bg-border" />
				</div>
			</div>
		</div>
	);
}
