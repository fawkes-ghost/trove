import type Lenis from 'lenis';
import { prefersReducedMotion } from './reduced-motion';

let current: Lenis | null = null;

export function setLenis(instance: Lenis | null): void {
  current = instance;
}

export function getLenis(): Lenis | null {
  return current;
}

// Scrolls to an element by id, through Lenis when it is running, natively otherwise.
export function scrollToId(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  if (current) {
    current.scrollTo(target);
    return;
  }
  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}
