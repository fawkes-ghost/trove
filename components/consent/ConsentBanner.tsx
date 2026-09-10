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
      className="fixed inset-x-0 bottom-0 z-40 bg-ink px-6 py-4 text-snow md:px-10 md:py-5"
    >
      <div className="mx-auto flex max-w-[80rem] flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-10">
        <p className="text-[13px] leading-snug md:text-sm md:leading-relaxed">
          We would like to set one analytics cookie to see how the site is used. Nothing is set until you choose.{' '}
          <Link href="/legal/cookies" className="underline underline-offset-4">
            Cookies
          </Link>
          .
        </p>
        <div className="flex gap-3 md:shrink-0">
          <button type="button" onClick={() => choose('accepted')} className="btn h-10 flex-1 bg-snow px-4 text-sm font-medium text-ink md:h-11 md:w-32 md:flex-none">
            Accept
          </button>
          <button type="button" onClick={() => choose('declined')} className="btn h-10 flex-1 border border-snow/60 px-4 text-sm font-medium text-snow md:h-11 md:w-32 md:flex-none">
            Decline
          </button>
        </div>
      </div>
    </aside>
  );
}
