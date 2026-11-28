'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { getLenis, setLenis } from '@/lib/lenis';
import { isTouch, motion } from '@/lib/motion';
import { prefersReducedMotion } from '@/lib/reduced-motion';

// Lenis smooth scroll on desktop, driven by the GSAP ticker so ScrollTrigger and Lenis
// agree on every frame. Touch devices keep native scroll and ScrollTrigger reads the
// native scroller. Skipped entirely under reduced motion.
// Ends any glide in progress and leaves the page where it is. Lenis's own reset is private;
// stopping and starting runs it (start resets the target to the actual scroll position).
function endGlide(lenis: Lenis): void {
  if (lenis.isStopped) return; // the menu holds it stopped while open; leave that alone
  lenis.stop();
  lenis.start();
}

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = motion();
    ScrollTrigger.config({ ignoreMobileResize: true });
    if (isTouch()) return;
    const lenis = new Lenis({ autoRaf: false });
    lenis.on('scroll', ScrollTrigger.update);
    // A link pressed while a scroll is still gliding (a trackpad flick, then the logo) would
    // otherwise carry the glide onto the next page: Next puts the new page at the top and
    // Lenis then finishes its old journey down it. Pressing any link ends the glide where it is.
    const onClick = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest?.('a[href]')) endGlide(lenis);
    };
    document.addEventListener('click', onClick, true);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis);
    return () => {
      document.removeEventListener('click', onClick, true);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // And once the new page is in place, Lenis takes up wherever the page now sits (the top
  // for a new page, the old position on back and forward) instead of an earlier target.
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) endGlide(lenis);
  }, [pathname]);

  return null;
}
