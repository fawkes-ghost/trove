'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

// The looping film. Mounts only in the browser and only when motion is allowed, so the
// poster is what paints first and what reduced motion keeps. Fades in once it is playing.
export function HeroLoop({ src, poster }: { src: string; poster?: string }) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reduced) return null;

  return (
    <video
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? 'opacity-100' : 'opacity-0'}`}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onPlaying={() => setPlaying(true)}
      tabIndex={-1}
    />
  );
}
