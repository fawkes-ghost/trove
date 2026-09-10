'use client';

import { useEffect } from 'react';

// One reveal, used deliberately: twenty pixels up and in, 280ms, once, on the few blocks
// that earn it. Everything is server rendered and visible; the start state exists only in
// CSS, only while the inline gate in app/layout.tsx has set data-reveal="on" before first
// paint, and only until this runtime marks the element revealed. The gate sets that
// attribute only when motion is allowed, and removes it again if this runtime never
// announces itself, so a page whose script never arrives is simply visible.
//
// Markers are attributes on the server-rendered element, so nothing here adds DOM:
//   data-reveal="item"   the element reveals as one.
//   data-reveal="group"  each direct child reveals, staggered.
const DURATION = 280;
const STAGGER = 80;
// The stagger runs to five children; a sixth and beyond arrive with the fifth.
const STAGGERED = 5;
// Fifteen per cent into the viewport: the element's top crosses the line at 85% of the
// viewport's height. Measured from the bottom so it reads the same at any element height.
const ROOT_MARGIN = '0px 0px -15% 0px';

export function Reveals() {
  useEffect(() => {
    const root = document.documentElement;
    // Reduced motion, or the gate's fail-safe has already fired: the page is final state.
    if (root.dataset.reveal !== 'on') return;
    root.dataset.revealLive = 'on';

    const hosts = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal="item"],[data-reveal="group"]'));
    const timers: number[] = [];
    const observers = hosts.map((host) => {
      const targets = host.dataset.reveal === 'group' ? (Array.from(host.children) as HTMLElement[]) : [host];
      const observer = new IntersectionObserver((entries) => {
        if (!entries[entries.length - 1].isIntersecting) return;
        observer.unobserve(host);
        observer.disconnect();
        targets.forEach((target, i) => {
          const delay = Math.min(i, STAGGERED - 1) * STAGGER;
          // will-change goes on before the frame that animates, and comes off after.
          target.style.willChange = 'transform, opacity';
          if (delay) target.style.transitionDelay = `${delay}ms`;
          timers.push(
            window.setTimeout(() => {
              target.style.willChange = '';
              target.style.transitionDelay = '';
            }, delay + DURATION + 60),
          );
        });
        requestAnimationFrame(() => {
          targets.forEach((target) => {
            target.dataset.revealState = 'in';
          });
        });
      }, { rootMargin: ROOT_MARGIN, threshold: 0 });
      observer.observe(host);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return null;
}
