import { LogoCloud } from "../components/logo-cloud";

export default function Page() {
	return (
		<div className="min-h-screen w-full place-content-center p-4">
			<div className="w-full">
				<h2 className="mb-5 text-center text-lg text-muted-foreground">
					Already used by{" "}
					<span className="font-medium text-primary">Best in the Game</span>
				</h2>
				<div className="relative mx-auto max-w-3xl">
					<LogoCloud />
				</div>
			</div>
		</div>
	);
}
