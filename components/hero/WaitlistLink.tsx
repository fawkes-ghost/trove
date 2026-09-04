'use client';

import type { ReactNode } from 'react';
import { scrollToId } from '@/lib/lenis';

// A real anchor to the waitlist. On a page that has the form it scrolls there; on any
// other page it goes to the home page form.
export function WaitlistLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a
      href="/#waitlist"
      className={className}
      onClick={(event) => {
        if (!document.getElementById('waitlist')) return;
        event.preventDefault();
        scrollToId('waitlist');
        window.history.replaceState(null, '', '#waitlist');
      }}
    >
      {children}
    </a>
  );
}
