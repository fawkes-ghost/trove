'use client';

import { scrollToId } from '@/lib/lenis';

// The scroll button: a single ink disc with a downward chevron, centred at the base of the hero.
export function ScrollButton({ targetId }: { targetId: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        // The section after the hero, whatever the page calls it.
        const next = document.getElementById(targetId) ?? document.querySelector('[data-hero]')?.nextElementSibling;
        if (next instanceof HTMLElement) {
          if (!next.id) next.id = targetId;
          scrollToId(next.id);
        }
      }}
      aria-label="Scroll to the next section"
      className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-snow"
    >
      <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
        <path d="M4 7 L10 13 L16 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
