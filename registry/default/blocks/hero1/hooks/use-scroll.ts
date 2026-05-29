"use client";
import { useEffect, useState, type RefObject } from "react";

export function useScroll(
	downThreshold: number,
	upThreshold?: number,
	targetRef?: RefObject<HTMLElement | null>
) {
	const [scrolled, setScrolled] = useState(false);
	const scrollUpThreshold = upThreshold ?? downThreshold / 2;

	useEffect(() => {
		const scrollContainer = getScrollContainer(targetRef?.current);

		const handleScroll = () => {
			const y =
				scrollContainer instanceof Window
					? window.scrollY
					: scrollContainer.scrollTop;
			// Hysteresis: different thresholds for up/down to prevent flickering
			setScrolled((prev) => {
				if (prev) {
					// Currently scrolled - only unscroll when below lower threshold
					return y > scrollUpThreshold;
				}
				// Currently not scrolled - only scroll when above higher threshold
				return y > downThreshold;
			});
		};

		scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => scrollContainer.removeEventListener("scroll", handleScroll);
	}, [downThreshold, scrollUpThreshold, targetRef]);

	return scrolled;
}

function getScrollContainer(element?: HTMLElement | null) {
	let parent = element?.parentElement ?? null;

	while (parent) {
		const { overflowY } = window.getComputedStyle(parent);
		const canScroll = parent.scrollHeight > parent.clientHeight;

		if (canScroll && (overflowY === "auto" || overflowY === "scroll")) {
			return parent;
		}

		parent = parent.parentElement;
	}

	return window;
}
