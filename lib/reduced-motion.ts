export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

// Safe on the server: returns false when there is no window.
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

// Duration helper for GSAP, Lenis and Framer Motion: collapses to zero under reduced motion.
export function motionDuration(seconds: number): number {
  return prefersReducedMotion() ? 0 : seconds;
}
