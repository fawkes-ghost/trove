'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MOMENT_DONE } from '@/lib/motion';

const SESSION_KEY = 'trove:logo-moment';

// The whole moment, in seconds. The disc rises, the film brightens, the tile docks, the
// lines settle, all inside this. app/globals.css carries the same choreography in CSS.
const MOMENT_SECONDS = 0.9;

// The one memorable moment on the home page. The page opens as snow with the ink tile
// centred; the disc rises through the ridgeline as the poster brightens; the tile docks to
// the header icon's actual position; the headline settles. Plays once per session and only
// when the inline gate in app/layout.tsx has set data-moment="play".
//
// The moment starts in CSS at first paint and is over 900ms later whether or not any
// script or film has arrived. When this component hydrates it takes over from the same
// elapsed time (switching the attribute to "js" drops the CSS animations and keeps the
// start states) and adds the dock. If it hydrates after the moment is over it only tidies
// up. Any scroll, wheel, touch or key before the dock completes the moment at once, so the
// tile is never left floating over scrolled content.
export function LogoMoment({ iconSvg }: { iconSvg: string }) {
  const [done, setDone] = useState(false);
  const tileRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.moment !== 'play') {
      setDone(true);
      window.dispatchEvent(new Event(MOMENT_DONE));
      return;
    }

    const finish = () => {
      delete root.dataset.moment;
      setDone(true);
      performance.mark('trove:moment-done');
      // The hero pin and anything else that waits for the moment starts here.
      window.dispatchEvent(new Event(MOMENT_DONE));
    };

    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // Private mode: the moment simply plays again next time.
    }

    const tile = tileRef.current;
    const backdrop = backdropRef.current;
    const disc = tile?.querySelector('circle');
    const seat = document.querySelector<HTMLElement>('.header-icon');
    const header = document.querySelector<HTMLElement>('.site-header');
    const poster = document.querySelector<HTMLElement>('.hero-poster');
    const lines = Array.from(document.querySelectorAll<HTMLElement>('[data-hero-line]'));
    // Already scrolled (a hash, a restored position): the still version, at once.
    if (!tile || !backdrop || !disc || !seat || window.scrollY > 0) {
      finish();
      return;
    }

    // How far the CSS moment has already run, measured from first paint.
    const paint = performance.getEntriesByType('paint').find((entry) => entry.name === 'first-contentful-paint');
    const elapsed = (performance.now() - (paint?.startTime ?? performance.now())) / 1000;
    if (elapsed >= MOMENT_SECONDS) {
      finish();
      return;
    }

    const styles = getComputedStyle(root);
    const ink = styles.getPropertyValue('--ink').trim();
    const snow = styles.getPropertyValue('--snow').trim();
    const tileSize = tile.offsetWidth;

    // The seat is measured when the dock begins, not when the page loads, so the tile
    // lands on the header wherever the header actually is in the viewport by then.
    const seatX = () => {
      const r = seat.getBoundingClientRect();
      return r.left + r.width / 2 - window.innerWidth / 2;
    };
    const seatY = () => {
      const r = seat.getBoundingClientRect();
      return r.top + r.height / 2 - window.innerHeight / 2;
    };
    const seatScale = () => seat.getBoundingClientRect().width / tileSize;

    const t = (fraction: number) => MOMENT_SECONDS * fraction;
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' }, onComplete: finish });
    // The disc rises through the ridgeline as the poster brightens behind.
    tl.fromTo(disc, { attr: { cy: 82 } }, { attr: { cy: 36 }, duration: t(0.5), ease: 'power3.out' }, 0);
    if (poster) tl.fromTo(poster, { opacity: 0 }, { opacity: 1, duration: t(0.5), ease: 'none' }, t(0.15));
    tl.fromTo(backdrop, { opacity: 1 }, { opacity: 0, duration: t(0.35) }, t(0.25));
    // The tile docks to the header's seat and takes the inverse colours.
    tl.fromTo(tile, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 1, opacity: 1, color: ink }, { x: seatX, y: seatY, scale: seatScale, duration: t(0.35), ease: 'power2.inOut' }, t(0.45));
    tl.to(tile, { color: snow, duration: t(0.3) }, t(0.5));
    tl.fromTo(disc, { fill: snow }, { fill: ink, duration: t(0.3) }, t(0.5));
    // The wordmark and menu arrive with the tile.
    if (header) tl.fromTo(header, { opacity: 0 }, { opacity: 1, duration: t(0.3) }, t(0.6));
    // The headline settles as the tile docks; the other lines are the pin's to reveal.
    tl.fromTo(lines, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: t(0.3), stagger: t(0.04) }, t(0.5));

    // Take over from CSS at the same point in time.
    root.dataset.moment = 'js';
    tl.seek(elapsed).play();

    // Any movement before the dock completes the moment at once.
    const interrupt = () => tl.progress(1);
    const events: (keyof WindowEventMap)[] = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'];
    events.forEach((name) => window.addEventListener(name, interrupt, { once: true, passive: true }));

    // Safety: whatever happens, the page is fully visible soon after the moment should have ended.
    const safety = window.setTimeout(interrupt, (MOMENT_SECONDS - elapsed) * 1000 + 400);

    return () => {
      window.clearTimeout(safety);
      events.forEach((name) => window.removeEventListener(name, interrupt));
      tl.kill();
    };
  }, []);

  if (done) return null;

  // The server-rendered start of the moment: the ink tile centred with the disc below the
  // ridgeline, visible on the snow from first paint, before any script has run. CSS
  // animates from exactly this state, and GSAP continues from wherever CSS has got to.
  const startSvg = iconSvg.replace('cy="36"', 'cy="82"');

  return (
    <div className="curtain" aria-hidden="true">
      <div ref={backdropRef} className="fixed inset-0 z-50 bg-snow" data-curtain-backdrop />
      <div
        ref={tileRef}
        className="brand-mark brand-icon fixed top-1/2 left-1/2 z-[55] h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-ink"
        dangerouslySetInnerHTML={{ __html: startSvg }}
        data-curtain-tile
      />
    </div>
  );
}
