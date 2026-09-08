'use client';

import { useEffect } from 'react';
import { PIN_READY, afterMoment, motion, motionAllowed } from '@/lib/motion';

// Pins the hero for a viewport and a half and binds each act to a scroll position: the
// film scales 1.00 to 1.06 and the scrim deepens across the pin; the prize line, the chip
// and the call to action each arrive at their own point. Engages only after the logo
// moment has finished, never alongside it. Under reduced motion there is no pin and every
// act is already in place. Reads the DOM only.
export function HeroPin() {
  useEffect(() => {
    if (!motionAllowed()) return;
    const hero = document.querySelector<HTMLElement>('[data-hero]');
    if (!hero) return;
    const { gsap, ScrollTrigger } = motion();
    let ctx: ReturnType<typeof gsap.context> | null = null;

    const stop = afterMoment(() => {
      ctx = gsap.context(() => {
        const film = hero.querySelector<HTMLElement>('.hero-poster');
        const scrim = hero.querySelector<HTMLElement>('.hero-scrim');
        const acts: [string, number, number][] = [
          ['line', 0.15, 0.35],
          ['chip', 0.4, 0.6],
          ['cta', 0.65, 0.85],
        ];
        const tl = gsap.timeline({ defaults: { ease: 'none' } });
        if (film) tl.fromTo(film, { scale: 1 }, { scale: 1.06, duration: 1 }, 0);
        if (scrim) tl.fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: 1 }, 0);
        acts.forEach(([name, from, to]) => {
          const el = hero.querySelector<HTMLElement>(`[data-hero-act="${name}"]`);
          if (el) tl.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: to - from, ease: 'power2.out' }, from);
        });
        ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * 1.5)}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          animation: tl,
          invalidateOnRefresh: true,
        });
        // The pin adds a viewport and a half of space; everything below waits for this.
        ScrollTrigger.refresh();
        document.documentElement.dataset.pinReady = '1';
        window.dispatchEvent(new Event(PIN_READY));
      }, hero);
    });

    return () => {
      stop();
      ctx?.revert();
      delete document.documentElement.dataset.pinReady;
    };
  }, []);

  return null;
}
