"use client";
import type { HTMLMotionProps } from "motion/react";

export const BLUR_DIRECTIONS = {
	top: 0,
	right: 90,
	bottom: 180,
	left: 270,
};

export type ProgressiveBlurProps = {
	direction?: keyof typeof BLUR_DIRECTIONS;
	blurLayers?: number;
	className?: string;
	blurIntensity?: number;
} & HTMLMotionProps<"div">;

export function ProgressiveBlur(_props: ProgressiveBlurProps) {
	return null;
}
