'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

type Still = { src: string; alt: string };

// A full-bleed reel of licensed stills: crossfade on a four second timer, arrows, dots,
// swipe on touch, pause while hovered or focused, static under reduced motion. Takes the
// stills as values; the server decides which stills may be shown.
export function Reel({ stills, label }: { stills: Still[]; label: string }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const count = stills.length;

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    if (reduced || paused || count < 2) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % count), 4000);
    return () => window.clearInterval(timer);
  }, [reduced, paused, count]);

  if (count === 0) {
    return (
      <div className="flex aspect-[16/9] max-h-[80vh] w-full items-end bg-ink/5 p-4" role="img" aria-label={label} data-reel="empty">
        <p className="font-mono text-[11px] text-ink/60">{label}</p>
      </div>
    );
  }

  return (
    <section
      className="group relative aspect-[16/9] max-h-[80vh] w-full overflow-hidden bg-ink"
      aria-roledescription="carousel"
      aria-label={label}
      data-reel
      data-reel-index={index}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(event) => {
        touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }}
      onTouchEnd={(event) => {
        if (!touch.current) return;
        const dx = event.changedTouches[0].clientX - touch.current.x;
        const dy = event.changedTouches[0].clientY - touch.current.y;
        touch.current = null;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? index + 1 : index - 1);
      }}
    >
      {stills.map((still, i) => (
        <img
          key={still.src}
          src={still.src}
          alt={still.alt}
          className={`absolute inset-0 h-full w-full object-cover ${reduced ? '' : 'transition-opacity duration-700'} ${i === index ? 'opacity-100' : 'opacity-0'}`}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          aria-hidden={i !== index}
          data-reel-still={i}
        />
      ))}
      {count > 1 ? (
        <>
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous still" className="btn absolute top-1/2 left-4 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-snow text-ink md:left-6">
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <path d="M12 4 L6 10 L12 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label="Next still" className="btn absolute top-1/2 right-4 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-snow text-ink md:right-6">
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <path d="M8 4 L14 10 L8 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 md:bottom-6" role="tablist" aria-label="Stills">
            {stills.map((still, i) => (
              <button
                key={still.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Still ${i + 1} of ${count}`}
                onClick={() => go(i)}
                className={`h-2 w-2 ${i === index ? 'bg-snow' : 'bg-snow/40'}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
