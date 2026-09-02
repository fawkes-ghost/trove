'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SESSION_KEY = 'trove:logo-moment';

// The one memorable moment on the home page. The page opens as snow with the ink tile
// centred; the disc rises through the ridgeline as the film brightens; the tile drifts
// to its seat in the header; the hero lines settle in order. Plays once per session and
// only when the blocking gate in app/layout.tsx has set data-moment="play". Otherwise
// the server-rendered page is the still version.
export function LogoMoment({ iconSvg }: { iconSvg: string }) {
  const [done, setDone] = useState(false);
  const tileRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.moment !== 'play') {
      setDone(true);
      return;
    }

    const finish = () => {
      delete root.dataset.moment;
      setDone(true);
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
    const poster = document.querySelector<HTMLElement>('.hero-poster');
    const lines = Array.from(document.querySelectorAll<HTMLElement>('[data-hero-line]'));
    if (!tile || !backdrop || !disc || !seat) {
      finish();
      return;
    }

    // Safety: whatever happens, the page is fully visible within four seconds.
    const safety = window.setTimeout(finish, 4000);

    const styles = getComputedStyle(root);
    const ink = styles.getPropertyValue('--ink').trim();
    const snow = styles.getPropertyValue('--snow').trim();
    const seatRect = seat.getBoundingClientRect();
    const tileSize = tile.offsetWidth;
    const dx = seatRect.left + seatRect.width / 2 - window.innerWidth / 2;
    const dy = seatRect.top + seatRect.height / 2 - window.innerHeight / 2;
    const scale = seatRect.width / tileSize;

    gsap.set(tile, { xPercent: -50, yPercent: -50, color: ink });
    gsap.set(disc, { attr: { cy: 82 }, fill: snow });

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        window.clearTimeout(safety);
        finish();
      },
    });

    // The disc rises through the ridgeline as the film brightens behind.
    tl.to(disc, { attr: { cy: 36 }, duration: 0.9, ease: 'power3.out' }, 0);
    if (poster) tl.to(poster, { opacity: 1, duration: 0.9 }, 0.3);
    tl.to(backdrop, { opacity: 0, duration: 0.6 }, 0.5);
    // The tile drifts to its seat in the header and takes the inverse colours.
    tl.to(tile, { x: dx, y: dy, scale, duration: 0.5, ease: 'power2.inOut' }, 0.9);
    tl.to(tile, { color: snow, duration: 0.4 }, 0.95);
    tl.to(disc, { fill: ink, duration: 0.4 }, 0.95);
    // The five lines settle in order.
    tl.to(lines, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, 1.2);

    return () => {
      window.clearTimeout(safety);
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div className="curtain" aria-hidden="true">
      <div ref={backdropRef} className="fixed inset-0 z-50 bg-snow" />
      <div
        ref={tileRef}
        className="brand-mark brand-icon fixed top-1/2 left-1/2 z-[55] h-24 w-24"
        dangerouslySetInnerHTML={{ __html: iconSvg }}
      />
    </div>
  );
}
