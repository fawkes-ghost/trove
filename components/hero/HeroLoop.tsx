'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

// The looping film, above the poster. Mounts only in the browser, only when motion is
// allowed, and only once the poster has arrived, so the poster is what paints first, what
// reduced motion keeps, and never competes with the film for a slow connection. Fades in
// over the poster the moment it can play, whenever that is: it never holds anything up.
export function HeroLoop({ src, poster }: { src: string; poster?: string }) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const posterImage = document.querySelector<HTMLImageElement>('[data-hero-poster]');
    if (!posterImage || posterImage.complete) {
      setMounted(true);
      return;
    }
    const mount = () => setMounted(true);
    posterImage.addEventListener('load', mount, { once: true });
    posterImage.addEventListener('error', mount, { once: true });
    return () => {
      posterImage.removeEventListener('load', mount);
      posterImage.removeEventListener('error', mount);
    };
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
