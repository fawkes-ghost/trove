'use client';

import { useEffect, useRef } from 'react';
import { afterPin, motion, motionAllowed } from '@/lib/motion';

// Reveals its child with a clip-path wipe from the left as it enters, once. The start
// state comes from CSS under the motion gate, so nothing flashes; under reduced motion the
// child is simply there.
export function WipeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !motionAllowed()) return;
    const { gsap } = motion();
    let ctx: ReturnType<typeof gsap.context> | null = null;
    const stop = afterPin(() => {
    ctx = gsap.context(() => {
      gsap.fromTo(
        root,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut', scrollTrigger: { trigger: root, start: 'top 80%', once: true } },
      );
    }, root);
    });
    return () => {
      stop();
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={ref} data-wipe className={className}>
      {children}
    </div>
  );
}
