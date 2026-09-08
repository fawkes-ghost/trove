'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/reduced-motion';

// Each [data-reveal] descendant fades in and rises eight pixels as it enters the viewport,
// once. Under reduced motion nothing runs and the children are simply there. The wrapper
// takes rendered children only, never config.
export function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          y: 8,
          duration: 0.6,
          delay: i * 0.06,
          ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 90%', once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
