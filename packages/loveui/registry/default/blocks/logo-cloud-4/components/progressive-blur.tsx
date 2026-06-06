"use client";
import { motion, type HTMLMotionProps } from "motion/react";

export const BLUR_DIRECTIONS = {
	top: "to bottom",
	right: "to left",
	bottom: "to top",
	left: "to right",
};

export type ProgressiveBlurProps = {
	direction?: keyof typeof BLUR_DIRECTIONS;
	blurLayers?: number;
	className?: string;
	blurIntensity?: number;
} & HTMLMotionProps<"div">;

export function ProgressiveBlur({
	direction = "left",
	blurLayers = 8,
	className,
	blurIntensity = 1,
	style,
	...props
}: ProgressiveBlurProps) {
	const layers = Math.max(1, blurLayers);
	const gradientDirection = BLUR_DIRECTIONS[direction];

	return (
		<motion.div
			aria-hidden="true"
			className={className}
			style={{ overflow: "hidden", ...style }}
			{...props}
		>
			{Array.from({ length: layers }).map((_, index) => {
				const blur = (index + 1) * blurIntensity * 2;
				const coverage = ((layers - index) / layers) * 100;
				const fadeEnd = Math.min(coverage + 16, 100);
				const mask = `linear-gradient(${gradientDirection}, black 0%, black ${coverage}%, transparent ${fadeEnd}%)`;

				return (
					<div
						key={String(index)}
						className="absolute inset-0"
						style={{
							backdropFilter: `blur(${blur}px)`,
							WebkitBackdropFilter: `blur(${blur}px)`,
							maskImage: mask,
							WebkitMaskImage: mask,
						}}
					/>
				);
			})}
		</motion.div>
	);
}
