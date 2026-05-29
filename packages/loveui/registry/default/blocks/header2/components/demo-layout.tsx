export function DemoLayout() {
	return (
		<main className="mx-auto w-full max-w-5xl px-4 py-10">
			<section className="grid gap-4">
				<div className="h-8 w-48 rounded-lg bg-muted" />
				<div className="h-4 w-full max-w-2xl rounded bg-muted" />
				<div className="h-4 w-full max-w-xl rounded bg-muted" />
			</section>
			<section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 9 }).map((_, index) => (
					<div
						className="rounded-xl border bg-card p-4 shadow-xs"
						key={index}
					>
						<div className="h-32 rounded-lg bg-muted" />
						<div className="mt-4 h-4 w-2/3 rounded bg-muted" />
						<div className="mt-3 h-3 w-full rounded bg-muted" />
						<div className="mt-2 h-3 w-4/5 rounded bg-muted" />
					</div>
				))}
			</section>
			<section className="mt-10 grid gap-4">
				{Array.from({ length: 8 }).map((_, index) => (
					<div className="rounded-xl border bg-card p-5" key={index}>
						<div className="h-4 w-40 rounded bg-muted" />
						<div className="mt-4 h-3 w-full rounded bg-muted" />
						<div className="mt-2 h-3 w-11/12 rounded bg-muted" />
					</div>
				))}
			</section>
		</main>
	);
}
