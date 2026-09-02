'use client';

import { useSyncExternalStore } from 'react';
import { REDUCED_MOTION_QUERY, prefersReducedMotion } from './reduced-motion';

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

const serverSnapshot = () => false;

// True when the visitor has asked for reduced motion. Updates live if the setting changes.
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, prefersReducedMotion, serverSnapshot);
}
