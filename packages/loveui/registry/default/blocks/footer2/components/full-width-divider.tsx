import { cn } from "@/lib/utils";

export function FullWidthDivider({
	className,
	position = "bottom",
	...props
}: React.ComponentProps<"div"> & {
	position?: "top" | "bottom";
}) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				"pointer-events-none absolute right-1/2 left-1/2 h-px w-screen -translate-x-1/2 bg-border",
				position === "top" ? "top-0" : "bottom-0",
				className
			)}
			{...props}
		/>
	);
}
