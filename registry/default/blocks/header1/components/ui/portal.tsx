import { cn } from "@/lib/utils";

function Portal({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"absolute inset-x-0 z-40 flex h-[calc(100dvh-3.5rem)] max-h-[calc(100dvh-3.5rem)] flex-col overflow-hidden",
				className
			)}
			{...props}
		/>
	);
}

function PortalBackdrop({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 absolute inset-0 -z-1 bg-background/95 backdrop-blur-sm duration-500 data-[state=closed]:animate-out data-[state=open]:animate-in supports-backdrop-filter:bg-background/60",
				className
			)}
			{...props}
		/>
	);
}

export { Portal, PortalBackdrop };
