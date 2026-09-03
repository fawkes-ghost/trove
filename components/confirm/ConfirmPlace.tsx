'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
// written plainly; anything else is a retry.
export function ConfirmPlace() {
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
      setStatus(outcomes[data.status ?? ''] ?? 'error');
    } catch {
      setStatus('error');
    }
  }

  const back = (
    <Link href="/#waitlist" className="underline underline-offset-4">
      Join the waitlist
    </Link>
  );

  return (
    <div className="max-w-[40rem]" data-confirm-status={status}>
      {status === 'idle' || status === 'sending' || status === 'error' ? (
        <>
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">Confirm your place.</h1>
          <p className="mt-6 text-lg">One press and you are a founding friend.</p>
          <button
            type="button"
            onClick={confirm}
            disabled={status === 'sending'}
            className="mt-8 h-12 bg-accent px-6 text-base font-medium text-ink disabled:opacity-60"
          >
            {status === 'sending' ? 'Confirming' : 'Confirm my place'}
          </button>
          <p role="status" aria-live="polite" className="mt-4 min-h-6 text-base">
            {status === 'error' ? 'We could not confirm your place. Please try again in a moment.' : null}
          </p>
        </>
      ) : null}

      {status === 'confirmed' ? (
        <>
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">You are a founding friend.</h1>
          <p className="mt-6 text-lg">Your place is confirmed. You will hear from us first when entries open.</p>
        </>
      ) : null}

      {status === 'already' ? (
        <>
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">Your place was already confirmed.</h1>
          <p className="mt-6 text-lg">There is nothing more to do. You will hear from us first when entries open.</p>
        </>
      ) : null}

      {status === 'expired' ? (
        <>
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">This link has expired.</h1>
          <p className="mt-6 text-lg">Join the waitlist again and we will send you a fresh one. {back}.</p>
        </>
      ) : null}

      {status === 'invalid' ? (
        <>
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">This link is not valid.</h1>
          <p className="mt-6 text-lg">Check the link in your email, or join the waitlist again and we will send a new one. {back}.</p>
        </>
      ) : null}
    </div>
  );
}
