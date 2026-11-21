'use client';

import { useState, type ReactNode } from 'react';

// The horizon, with the sun as a button. The film fills the first screen, edge to edge,
// and the horizon runs along its foot with the sun half set on it, the same construction
// as the o in the wordmark. The film and the words over it (server components) arrive as
// children and overlay. Tap the sun and it dips below the line and rises again, and the
// row under the horizon swaps its hint for the fact the sun was holding: where the money
// goes. The line arrives as a value, never the config object. Reduced motion: the sun
// stays still and only the words change.
export function SunSeal({ line, children, overlay }: { line: string; children: ReactNode; overlay: ReactNode }) {
  const [turn, setTurn] = useState(0);
  const open = turn > 0;
  return (
    <>
      <div className="hero-sky relative h-[calc(100svh-2.75rem)] min-h-[36rem] overflow-clip bg-loch">
        {children}
        <div aria-hidden="true" className="hero-scrim pointer-events-none absolute inset-0 z-10" />
        {overlay}
        <button
          type="button"
          aria-label="The sun. Tap to see where the money goes."
          onClick={() => setTurn((value) => value + 1)}
          className="hero-sun sun-seal absolute bottom-0 left-1/2 z-30 aspect-square w-[4.5rem] cursor-pointer rounded-full bg-sun focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-snow md:w-32"
          data-turn={open ? (turn % 2 ? 'a' : 'b') : undefined}
        />
      </div>
      <div aria-hidden="true" className="hero-horizon h-[6px] bg-loch" />
      <p aria-live="polite" className="px-6 pt-3 text-center text-sm md:text-base">
        {open ? (
          <span key="line" className="sun-line font-medium">{line}</span>
        ) : (
          <span className="sun-hint text-ink/60">Tap the sun.</span>
        )}
      </p>
    </>
  );
}
