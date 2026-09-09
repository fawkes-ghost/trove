'use client';

import { useEffect, useRef } from 'react';
import { VIEWPORT_LINES, isTouch, motion, motionAllowed, observeLines } from '@/lib/motion';

// A paragraph whose words go from muted to ink, one after another, as it moves through the
// viewport: from its top reaching 80% down the screen to its bottom reaching 45%. On desktop
// that follows the smoothed scroll through ScrollTrigger; on touch devices it runs from
// IntersectionObservers on lines across the viewport, which read the same to the eye
// without a scroll event.
// Takes the text only. Under reduced motion every word is ink.
export function ScrubWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !motionAllowed()) return;
    const { gsap } = motion();
    const words = Array.from(root.querySelectorAll<HTMLElement>('[data-scrub-word]'));

    if (isTouch()) {
      return observeLines(
        root,
        (rect) => {
          const viewport = window.innerHeight;
          const travel = rect.height + viewport * 0.35;
          const progress = Math.min(1, Math.max(0, (viewport * 0.8 - rect.top) / travel));
          const lit = Math.round(progress * words.length);
          words.forEach((word, index) => word.toggleAttribute('data-ink', index < lit));
        },
        VIEWPORT_LINES,
      );
    }

    const ctx = gsap.context(() => {
      gsap.to(words, {
        opacity: 1,
        stagger: 0.02,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom 45%', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <p ref={ref} className={className}>
      {text.split(' ').map((word, index) => (
        <span key={`${index}-${word}`} data-scrub-word>
          {word}{' '}
        </span>
      ))}
    </p>
  );
}
