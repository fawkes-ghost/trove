'use client';

import { useEffect, useRef } from 'react';
import { motion, motionAllowed } from '@/lib/motion';

// Reveals its child with a clip-path wipe from the left as it enters, once, from an
// IntersectionObserver on every device. The start state comes from CSS under the motion
// gate, so nothing flashes; under reduced motion the child is simply there.
export function WipeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !motionAllowed()) return;
    const { gsap } = motion();
    const wipe = gsap.fromTo(root, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut', paused: true });
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          wipe.play();
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -20% 0px' },
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      wipe.kill();
    };
  }, []);

  return (
    <div ref={ref} data-wipe className={className}>
      {children}
    </div>
  );
}
