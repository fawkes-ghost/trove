'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis } from '@/lib/lenis';
import { motion } from '@/lib/motion';
import { prefersReducedMotion } from '@/lib/reduced-motion';

// Lenis smooth scroll for the whole site, driven by the GSAP ticker so ScrollTrigger and
// Lenis agree on every frame. Skipped entirely under reduced motion.
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = motion();
    ScrollTrigger.config({ ignoreMobileResize: true });
    const lenis = new Lenis({ autoRaf: false });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}
