'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

// The looping film, above the poster. Mounts only in the browser and only when motion is
// allowed, so the poster is what paints first and what reduced motion keeps. Fades in over
// the poster the moment it can play, whenever that is: it never holds anything up.
export function HeroLoop({ src, poster }: { src: string; poster?: string }) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reduced) return null;

  return (
    <video
      className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onCanPlay={(event) => {
        performance.mark('trove:film-canplay');
        setReady(true);
        event.currentTarget.play().catch(() => {
          // Autoplay refused: the poster stays, which is the still version anyway.
        });
      }}
      onPlaying={() => performance.mark('trove:film-playing')}
      tabIndex={-1}
      data-hero-loop
    />
  );
}
