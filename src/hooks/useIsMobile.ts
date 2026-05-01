import { useEffect, useState } from "react";

/**
 * Returns `true` when the viewport is narrower than `breakpoint` (default 768px).
 * Uses `matchMedia` so it reacts to orientation changes and window resizes.
 * SSR-safe: defaults to `false` on first render.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    setIsMobile(mq.matches); // sync on mount
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}
