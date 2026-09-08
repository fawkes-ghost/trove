import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

// GSAP with ScrollTrigger, registered once. Lenis drives the ticker from SmoothScroll so
// ScrollTrigger reads the smoothed position. Client only.
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

// Fired by the logo moment when it ends. Anything that must wait for it listens here.
export const MOMENT_DONE = 'trove:moment-done';

// Fired by the hero pin once it exists. Everything scroll-bound below the hero is created
// after it, so every position is measured with the pin's space in the page.
export const PIN_READY = 'trove:pin-ready';

// Runs the callback once the hero pin is in place: at once on a page with no hero, or
// once the pin has announced itself.
export function afterPin(callback: () => void): () => void {
  const root = document.documentElement;
  if (!document.querySelector('[data-hero]') || root.dataset.pinReady === '1') {
    callback();
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener(PIN_READY, handler, { once: true });
  return () => window.removeEventListener(PIN_READY, handler);
}

// Runs the callback once the logo moment is over: at once when no moment is playing.
export function afterMoment(callback: () => void): () => void {
  if (document.documentElement.dataset.moment !== 'play') {
    callback();
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener(MOMENT_DONE, handler, { once: true });
  return () => window.removeEventListener(MOMENT_DONE, handler);
}
