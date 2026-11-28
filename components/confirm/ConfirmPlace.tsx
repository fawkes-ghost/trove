'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FoundingSticker } from '@/components/waitlist/FoundingSticker';
import { HeardAbout } from './HeardAbout';
import { trackEvent } from '@/lib/analytics';

type Status = 'idle' | 'sending' | 'confirmed' | 'already' | 'expired' | 'invalid' | 'error';

// The function's status strings, mapped to the page's states.
const outcomes: Record<string, Status> = {
  confirmed: 'confirmed',
  already_confirmed: 'already',
  already: 'already',
  expired: 'expired',
  invalid: 'invalid',
};

// One button. Nothing is sent until it is pressed. The token goes straight to the existing
// waitlist-confirm edge function, which answers { ok, status }. The four outcomes are
// written plainly; anything else is a retry. A confirmation is the moment someone becomes a
// founding friend, so it gets the sticker and the paper confetti (wordmarkSvg is the
// wordmark's source, read on the server); under reduced motion the sticker is still.
export function ConfirmPlace({ wordmarkSvg }: { wordmarkSvg?: string }) {
  const token = (useSearchParams().get('token') ?? '').trim();
  const [status, setStatus] = useState<Status>(token ? 'idle' : 'invalid');

  async function confirm() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const response = await fetch(`${url}/functions/v1/waitlist-confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: key, Authorization: `Bearer ${key}` },
        body: JSON.stringify({ token }),
      });
      const data: { ok?: boolean; status?: string } = await response.json().catch(() => ({}));
      const outcome = outcomes[data.status ?? ''] ?? 'error';
      setStatus(outcome);
      // The signup that counts: someone who opened the email and tapped confirm. Sent only
      // with consent, like every event (lib/analytics.ts).
      if (outcome === 'confirmed') trackEvent('waitlist_confirm');
    } catch {
      setStatus('error');
    }
  }

  const back = (
    <Link href="/#waitlist" className="underline underline-offset-4">
      Join the list
    </Link>
  );

  return (
    <div className="max-w-[40rem]" data-confirm-status={status}>
      {status === 'idle' || status === 'sending' || status === 'error' ? (
        <>
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">Confirm your place.</h1>
          <p className="mt-6 text-lg">One tap and you’re a founding friend.</p>
          <button
            type="button"
            onClick={confirm}
            disabled={status === 'sending'}
            className="btn mt-8 h-12 bg-accent px-6 text-base font-medium text-ink disabled:opacity-60"
          >
            {status === 'sending' ? 'Confirming' : 'Confirm my place'}
          </button>
          <p role="status" aria-live="polite" className="mt-4 min-h-6 text-base">
            {status === 'error' ? 'We couldn’t confirm your place. Please try again in a moment.' : null}
          </p>
        </>
      ) : null}

      {status === 'confirmed' ? (
        <>
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">You’re a founding friend.</h1>
          <div className="mt-8">
            <FoundingSticker celebrate wordmarkSvg={wordmarkSvg} line="Your place is confirmed." />
          </div>
          <p className="mt-8 text-lg">You’ll hear from us first when entries open.</p>
          <HeardAbout token={token} />
        </>
      ) : null}

      {status === 'already' ? (
        <>
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">Your place was already confirmed.</h1>
          <p className="mt-6 text-lg">There’s nothing more to do. You’ll hear from us first when entries open.</p>
        </>
      ) : null}

      {status === 'expired' ? (
        <>
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">This link has expired.</h1>
          <p className="mt-6 text-lg">Join the list again and we’ll send you a new link. {back}.</p>
        </>
      ) : null}

      {status === 'invalid' ? (
        <>
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">This link doesn’t work.</h1>
          <p className="mt-6 text-lg">Check the link in your email, or sign up again and we’ll send you a new one. {back}.</p>
        </>
      ) : null}
    </div>
  );
}
