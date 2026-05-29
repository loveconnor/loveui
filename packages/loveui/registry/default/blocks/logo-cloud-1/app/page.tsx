import { LogoCloud } from "../components/logo-cloud";

export default function Page() {
	return (
		<div className="min-h-screen w-full place-content-center p-4">
			<div className="mx-auto max-w-3xl space-y-5">
				<h2 className="text-center font-medium text-lg tracking-tight md:font-semibold md:text-2xl">
					<span className="text-muted-foreground">
						Your favorite companies are
					</span>{" "}
					<span className="text-primary">our partners.</span>
				</h2>
				<LogoCloud />
			</div>
		</div>
	);
}
