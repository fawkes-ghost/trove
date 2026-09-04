'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { readConsent, writeConsent, type Consent } from '@/lib/consent';

// Two buttons, accept and decline. Shown until a choice is stored. No tag loads before
// accept; see components/consent/Analytics.tsx.
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
      className="fixed inset-x-3 bottom-3 z-40 bg-ink p-4 text-snow md:inset-x-auto md:right-6 md:bottom-6 md:max-w-sm md:p-5"
    >
      <p className="text-[13px] leading-snug md:text-sm md:leading-relaxed">
        We would like to set one analytics cookie to see how the site is used. Nothing is set until you choose.{' '}
        <Link href="/legal/cookies" className="underline underline-offset-4">
          Cookies
        </Link>
        .
      </p>
      <div className="mt-3 flex gap-3 md:mt-4">
        <button type="button" onClick={() => choose('accepted')} className="h-10 flex-1 bg-snow px-4 text-sm font-medium text-ink md:h-11">
          Accept
        </button>
        <button type="button" onClick={() => choose('declined')} className="h-10 flex-1 border border-snow/60 px-4 text-sm font-medium text-snow md:h-11">
          Decline
        </button>
      </div>
    </aside>
  );
}
