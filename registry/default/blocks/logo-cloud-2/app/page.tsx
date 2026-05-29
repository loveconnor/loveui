import { LogoCloud } from "../components/logo-cloud";

export default function Page() {
	return (
		<div className="min-h-screen w-full place-content-center px-4">
			<section className="relative">
				<h2 className="mb-6 text-center font-medium text-lg text-muted-foreground tracking-tight md:text-2xl">
					Companies we{" "}
					<span className="font-semibold text-primary">collaborate</span> with.
				</h2>
				<div className="relative mx-auto max-w-3xl *:border-y-0">
					<div className="pointer-events-none absolute -top-px left-1/2 h-px w-screen -translate-x-1/2 bg-border" />
					<LogoCloud />
					<div className="pointer-events-none absolute -bottom-px left-1/2 h-px w-screen -translate-x-1/2 bg-border" />
				</div>
			</section>
		</div>
	);
}
