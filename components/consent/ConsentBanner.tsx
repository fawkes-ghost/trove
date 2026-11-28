'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { readConsent, writeConsent, type Consent } from '@/lib/consent';

// Two buttons, accept and decline. Shown until a choice is stored. No tag loads before
// accept; see components/consent/Analytics.tsx. It spans the foot of the screen rather than
// floating in a corner, so it never sits over the text column, and the page reserves its
// height beneath the content at every width.
export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(readConsent() === null);
  }, []);

  // While the banner is up, the page reserves its height at the bottom (see globals.css)
  // so it never covers the compliance strip.
  useEffect(() => {
    const root = document.documentElement;
    const node = ref.current;
    const clear = () => {
      root.style.removeProperty('--consent-h');
      delete root.dataset.consent;
    };
    if (!open || !node) {
      clear();
      return;
    }
    root.dataset.consent = 'open';
    const apply = () => root.style.setProperty('--consent-h', `${node.offsetHeight + 20}px`);
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(node);
    return () => {
      observer.disconnect();
      clear();
    };
  }, [open]);

  if (!open) return null;

  const choose = (consent: Consent) => {
    writeConsent(consent);
    setOpen(false);
  };

  return (
    <aside
      ref={ref}
      role="region"
      aria-label="Cookies"
      data-consent-banner
      className="fixed inset-x-3 bottom-3 z-40 rounded-[3px] bg-ink/95 p-4 text-snow shadow-lg md:inset-x-auto md:right-6 md:bottom-6 md:w-[22rem] md:p-5"
    >
      <div className="flex flex-col gap-3">
        <p className="text-[13px] leading-snug">
          Can we use analytics cookies to see how people use the site? Nothing is set unless you say yes.{' '}
          <Link href="/legal/cookies" className="underline underline-offset-4">
            Cookies
          </Link>
          .
        </p>
        <div className="flex gap-3">
          <button type="button" onClick={() => choose('accepted')} className="btn h-9 flex-1 bg-snow px-4 text-sm font-medium text-ink">
            Accept
          </button>
          <button type="button" onClick={() => choose('declined')} className="btn h-9 flex-1 border border-snow/60 px-4 text-sm font-medium text-snow">
            Decline
          </button>
        </div>
      </div>
    </aside>
  );
}
