'use client';

import { useCallback, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

type Still = { src: string; alt: string; title?: string | null; caption?: string | null };

const SECONDS = 5;

// The reel as a story: the format the audience already reads on Instagram and TikTok. Tall
// on a phone (nine by fourteen), sixteen by nine from 768px. Segments across the top show
// where you are and fill while a still is shown; tap the right of the frame for the next
// still and the left for the one before; press and hold, hover or focus to pause; swipe on
// touch. Each segment is also a 24px button. Under reduced motion nothing advances on its
// own and nothing fills. A still with a title or a caption shows them over its lower third
// on a scrim. Takes the stills as values; the server decides which stills may be shown.
export function Reel({ stills, label }: { stills: Still[]; label: string }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef<{ x: number; y: number; t: number } | null>(null);
  const count = stills.length;

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  if (count === 0) {
    return (
      <div className="flex aspect-[9/14] max-h-[85svh] w-full items-end bg-ink/5 p-4 md:aspect-[16/9]" role="img" aria-label={label} data-reel="empty">
        <p className="font-mono text-[11px] text-ink/60">{label}</p>
      </div>
    );
  }

  const fade = reduced ? '' : 'transition-opacity duration-500';
  const running = !reduced && !paused && count > 1;

  return (
    <section
      className="group relative aspect-[9/14] max-h-[85svh] w-full select-none overflow-hidden bg-ink md:aspect-[16/9]"
      aria-roledescription="carousel"
      aria-label={label}
      data-reel
      data-reel-index={index}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(event) => {
        touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY, t: Date.now() };
        setPaused(true);
      }}
      onTouchEnd={(event) => {
        setPaused(false);
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
            <img src={still.src} alt={still.alt} className="h-full w-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} decoding="async" draggable={false} />
            {captioned ? (
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,#14252000_0%,#142520B3_60%,#142520D9_100%)] px-6 pt-16 pb-10 text-snow md:px-10 md:pt-24 md:pb-14" data-reel-caption>
                {still.title ? <p className="display text-[1.75rem] md:text-[2.25rem]">{still.title}</p> : null}
                {still.caption ? <p className="mt-2 max-w-[40rem] text-base text-snow/85">{still.caption}</p> : null}
              </figcaption>
            ) : null}
          </figure>
        );
      })}

      {count > 1 ? (
        <>
          {/* Tap zones: a third of the frame goes back, two thirds go on, as in a story. */}
          <button type="button" aria-label="Previous still" onClick={() => go(index - 1)} className="absolute inset-y-0 left-0 z-10 w-1/3 cursor-w-resize focus-visible:outline-none" />
          <button type="button" aria-label="Next still" onClick={() => go(index + 1)} className="absolute inset-y-0 right-0 z-10 w-2/3 cursor-e-resize focus-visible:outline-none" />

          <div className="absolute inset-x-0 top-0 z-20 flex gap-1.5 bg-[linear-gradient(180deg,#14252066_0%,#14252000_100%)] px-3 pt-1 pb-4 md:px-6" role="tablist" aria-label="Stills">
            {stills.map((still, i) => (
              <button
                key={still.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Still ${i + 1} of ${count}`}
                onClick={() => go(i)}
                className="flex h-6 flex-1 items-center"
              >
                <span aria-hidden="true" className="relative block h-[3px] w-full overflow-hidden rounded-full bg-snow/35">
                  {i < index || (i === index && !running && reduced) ? <span className="absolute inset-0 bg-snow" /> : null}
                  {i === index && !reduced ? (
                    <span
                      key={index}
                      className="reel-fill absolute inset-0 origin-left bg-snow"
                      style={{ animationDuration: `${SECONDS}s`, animationPlayState: running ? 'running' : 'paused' }}
                      onAnimationEnd={() => {
                        // The global reduced motion rule shortens every animation to nothing; never advance on that.
                        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                        go(index + 1);
                      }}
                    />
                  ) : null}
                </span>
              </button>
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
