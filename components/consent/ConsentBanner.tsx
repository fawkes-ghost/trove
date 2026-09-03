'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { readConsent, writeConsent, type Consent } from '@/lib/consent';

// Two buttons, accept and decline. Shown until a choice is stored. No tag loads before
// accept; see components/consent/Analytics.tsx.
export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(readConsent() === null);
  }, []);

  if (!open) return null;

  const choose = (consent: Consent) => {
    writeConsent(consent);
    setOpen(false);
  };

  return (
    <aside
      role="region"
      aria-label="Cookies"
      data-consent-banner
      className="fixed inset-x-4 bottom-4 z-40 bg-ink p-5 text-snow md:inset-x-auto md:right-6 md:bottom-6 md:max-w-sm"
    >
      <p className="text-sm leading-relaxed">
        We would like to set one analytics cookie to see how the site is used. Nothing is set until you choose.{' '}
        <Link href="/legal/cookies" className="underline underline-offset-4">
          Cookies
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => choose('accepted')} className="h-11 flex-1 bg-snow px-4 text-sm font-medium text-ink">
          Accept
        </button>
        <button type="button" onClick={() => choose('declined')} className="h-11 flex-1 border border-snow/60 px-4 text-sm font-medium text-snow">
          Decline
        </button>
      </div>
    </aside>
  );
}
