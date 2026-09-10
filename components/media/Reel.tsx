'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

type Still = { src: string; alt: string; title?: string | null; caption?: string | null };

// A full-bleed reel of licensed stills: crossfade on a four second timer, arrows, dots,
// swipe on touch, pause while hovered or focused, static under reduced motion. There are no
// arrows: nothing holds contrast over a frame that changes under it, measured between 1.19 and
// 3.2 for ink and down to 2.39 for snow across these three stills. The dots carry position and
// control at every width, a swipe turns the reel on touch, and each dot's button is a 24px
// target around an 8px mark. Sixteen by
// nine from 768px; four by five below it, so a caption sits in the lower third clear of the
// arrows at the centre. A still with
// a title or a caption shows them over its lower third on a scrim; without them the still
// is bare. Takes the stills as values; the server decides which stills may be shown.
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
      <div className="flex aspect-[4/5] max-h-[80vh] w-full items-end bg-ink/5 p-4 md:aspect-[16/9]" role="img" aria-label={label} data-reel="empty">
        <p className="font-mono text-[11px] text-ink/60">{label}</p>
      </div>
    );
  }

  const fade = reduced ? '' : 'transition-opacity duration-700';

  return (
    <section
      className="group relative aspect-[4/5] max-h-[80vh] w-full overflow-hidden bg-ink md:aspect-[16/9]"
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
      {stills.map((still, i) => {
        const captioned = Boolean(still.title || still.caption);
        return (
          <figure key={still.src} className={`absolute inset-0 m-0 ${fade} ${i === index ? 'opacity-100' : 'opacity-0'}`} aria-hidden={i !== index} data-reel-still={i}>
            <img src={still.src} alt={still.alt} className="h-full w-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
            {captioned ? (
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,#10121400_0%,#101214B3_60%,#101214D9_100%)] px-6 pt-16 pb-12 text-snow md:px-10 md:pt-24 md:pb-16" data-reel-caption>
                {still.title ? <p className="display text-[1.5rem] md:text-[2rem]">{still.title}</p> : null}
                {still.caption ? <p className="mt-2 max-w-[40rem] text-base text-snow/85">{still.caption}</p> : null}
              </figcaption>
            ) : null}
          </figure>
        );
      })}
      {count > 1 ? (
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1 md:bottom-6" role="tablist" aria-label="Stills">
          {stills.map((still, i) => (
            <button
              key={still.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Still ${i + 1} of ${count}`}
              onClick={() => go(i)}
              className="flex h-6 w-6 items-center justify-center"
            >
              {/* The mark stays small; the button around it is a real target at any width. */}
              <span aria-hidden="true" className={`block h-2 w-2 ${i === index ? 'bg-snow' : 'bg-snow/40'}`} />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
