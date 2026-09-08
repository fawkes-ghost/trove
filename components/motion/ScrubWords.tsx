'use client';

import { useEffect, useRef } from 'react';
import { afterPin, motion, motionAllowed } from '@/lib/motion';

// A paragraph whose words go from muted to ink, one after another, as the visitor scrolls
// it through the viewport. Takes the text only. Under reduced motion every word is ink.
export function ScrubWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !motionAllowed()) return;
    const { gsap } = motion();
    let ctx: ReturnType<typeof gsap.context> | null = null;
    const stop = afterPin(() => {
    ctx = gsap.context(() => {
      gsap.to(root.querySelectorAll('[data-scrub-word]'), {
        opacity: 1,
        stagger: 0.02,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom 45%', scrub: true },
      });
    }, root);
    });
    return () => {
      stop();
      ctx?.revert();
    };
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
