import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

// GSAP with ScrollTrigger, registered once. On desktop Lenis drives the ticker from
// SmoothScroll so ScrollTrigger reads the smoothed position; on touch devices the native
// scroller is the only scroller. Client only.
export function motion() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

// True once the document's inline gate has allowed motion. False under reduced motion and
// before the gate has run, so every act stays in its final state.
export function motionAllowed(): boolean {
  return typeof document !== 'undefined' && document.documentElement.dataset.motion === 'full';
}

// A device whose primary pointer is coarse: a phone or a tablet. Scroll there is native
// and scroll events are throttled, so anything bound to scrolling runs from
// IntersectionObserver instead.
export function isTouch(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
}

// Fired by the logo moment when it ends, for anything that wants to wait for it.
export const MOMENT_DONE = 'trove:moment-done';

// Watches an element against horizontal lines across the viewport (each a fraction of its
// height) and calls back whenever the element's top or bottom crosses one. Progress can
// then be read from the element's own rectangle, so a scroll-bound act runs from
// IntersectionObserver alone, without a scroll event. Returns a function that stops it.
export function observeLines(element: Element, callback: (rect: DOMRect) => void, lines: number[]): () => void {
  const observers = lines.map((line) => {
    const top = -Math.round(line * 100);
    const bottom = -Math.round((1 - line) * 100) + 1;
    const observer = new IntersectionObserver((entries) => callback(entries[entries.length - 1].boundingClientRect), { rootMargin: `${top}% 0px ${bottom}% 0px`, threshold: 0 });
    observer.observe(element);
    return observer;
  });
  return () => observers.forEach((observer) => observer.disconnect());
}

// Lines every twentieth of the viewport, for acts that run across most of it.
export const VIEWPORT_LINES = Array.from({ length: 19 }, (_, i) => (i + 1) / 20);
