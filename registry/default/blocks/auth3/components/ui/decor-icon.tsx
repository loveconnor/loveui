import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const DecorIconVariants = cva(
    "pointer-events-none absolute z-1 size-4 shrink-0 stroke-1 stroke-muted-foreground transition-transform",
    {
        variants: {
            position: {
                // We also rotate the SVG inside the variant so the bracket always points inward
                "top-left":
                    "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
                "top-right":
                    "top-0 right-0 translate-x-1/2 -translate-y-1/2 rotate-90",
                "bottom-right":
                    "right-0 bottom-0 translate-x-1/2 translate-y-1/2 rotate-180",
                "bottom-left":
                    "bottom-0 left-0 -translate-x-1/2 translate-y-1/2 -rotate-90",
            },
        },
        defaultVariants: {
            position: "top-left",
        },
    }
);

type DecorIconProps = React.ComponentProps<"svg"> &
    VariantProps<typeof DecorIconVariants> & {
        variant?: "bracket" | "dot" | "diagonal";
    };

export function DecorIcon({ position, variant = "bracket", className, ...props }: DecorIconProps) {
    return (
        <svg
            aria-hidden="true"
            className={cn(DecorIconVariants({ position, className }))}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {/* OPTION 1: Corner Bracket (Default) */}
            {variant === "bracket" && (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4H4v8" />
            )}

            {/* OPTION 2: Minimalist Dot (Change fill to currentColor in class if using this) */}
            {variant === "dot" && (
                <circle cx="12" cy="12" r="3" fill="currentColor" />
            )}

            {/* OPTION 3: Diagonal Accent Line */}
            {variant === "diagonal" && (
                <path strokeLinecap="round" d="M4 20L20 4" />
            )}
        </svg>
    );
}
