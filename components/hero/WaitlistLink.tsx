'use client';

import type { ReactNode } from 'react';
import { scrollToId } from '@/lib/lenis';

// The hero button. A real anchor to #waitlist that scrolls smoothly when scripts run.
export function WaitlistLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a
      href="#waitlist"
      className={className}
      onClick={(event) => {
        event.preventDefault();
        scrollToId('waitlist');
        window.history.replaceState(null, '', '#waitlist');
      }}
    >
      {children}
    </a>
  );
}
