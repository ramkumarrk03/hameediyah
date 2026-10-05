"use client";

import { useEffect, useState } from "react";

/** Slow, weighted ease-out, like steam rising. Used for most reveals. */
export const EASE_STEAM = [0.22, 1, 0.36, 1] as const;
/** Ease-in-out with weight, like a ladle of curry being poured. */
export const EASE_POUR = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  quick: 0.45,
  base: 0.9,
  slow: 1.4,
} as const;

/** Fade up from just below, the default "ink settling on paper" reveal. */
export const revealUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_STEAM },
  },
} as const;

/** True when the visitor prefers reduced motion. Safe for SSR (starts false). */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Matches a min-width media query. Starts false until mounted. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}
