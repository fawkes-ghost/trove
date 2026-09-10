'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

// The one line at which the hero film changes cut. The source element below and the guard
// beneath it read the same string, so they can never disagree.
const NARROW = '(max-width: 900px)';

// The looping film, above the poster. Mounts only in the browser, only when motion is
// allowed, only once the poster has arrived, and only while the hero is in view, so the
// poster is what paints first, what reduced motion keeps, and never competes with the film
// for a slow connection. Fades in over the poster the moment it can play, whenever that is:
// it never holds anything up. Once it has mounted it stays: leaving the hero behind is not
// a reason to fetch the film twice.
export function HeroLoop({ src, srcSmall, poster }: { src: string; srcSmall?: string | null; poster?: string }) {
  const reduced = useReducedMotion();
  const [posterDone, setPosterDone] = useState(false);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const posterImage = document.querySelector<HTMLImageElement>('[data-hero-poster]');
    if (!posterImage || posterImage.complete) {
      setPosterDone(true);
      return;
    }
    const done = () => setPosterDone(true);
    posterImage.addEventListener('load', done, { once: true });
    posterImage.addEventListener('error', done, { once: true });
    return () => {
      posterImage.removeEventListener('load', done);
      posterImage.removeEventListener('error', done);
    };
  }, []);

  // The film is only ever worth fetching while the hero is on screen. On a normal visit the
  // hero is in view at load and this resolves at once; on a restored or deep-linked scroll
  // position it means the film is never fetched for a hero nobody is looking at.
  useEffect(() => {
    const hero = document.querySelector('[data-hero]');
    if (!hero) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (!entries[entries.length - 1].isIntersecting) return;
      setInView(true);
      observer.disconnect();
    }, { threshold: 0 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // The source list below is what chooses the cut, and every engine tested honours it. This
  // watches the result rather than trusting it: it records which cut went live on the element,
  // so it can be read in devtools without opening the network tab, and if the browser ever
  // selects the wide cut on a narrow screen it runs the selection again. Only before playback
  // starts, so a rotation across 900px never restarts a film already running.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !srcSmall) return;
    const query = window.matchMedia(NARROW);
    const check = () => {
      const node = videoRef.current;
      if (!node || !node.currentSrc) return;
      const wanted = query.matches ? srcSmall : src;
      const live = node.currentSrc.split('/').pop() ?? '';
      node.dataset.cut = live;
      if (live !== wanted.split('/').pop() && node.currentTime === 0) node.load();
    };
    check();
    video.addEventListener('loadedmetadata', check);
    query.addEventListener('change', check);
    return () => {
      video.removeEventListener('loadedmetadata', check);
      query.removeEventListener('change', check);
    };
  }, [src, srcSmall, posterDone, inView, reduced]);

  if (!posterDone || !inView || reduced) return null;

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
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
    >
      {/* The narrow cut first: a phone never fetches the 1600 file. The media attribute is
          read once, when the element picks its source, which is what a hero needs. */}
      {srcSmall ? <source media={NARROW} src={srcSmall} type="video/mp4" /> : null}
      <source src={src} type="video/mp4" />
    </video>
  );
}
