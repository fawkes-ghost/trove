'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/reduced-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { HeardAbout } from './HeardAbout';

type Status = 'idle' | 'sending' | 'rising' | 'confirmed' | 'already' | 'expired' | 'invalid' | 'error';

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
// written plainly; anything else is a retry. On a confirmation the disc rises inside the
// button first (iconSvg is the brand icon's source, read on the server), then the page
// says so; under reduced motion it says so at once.
export function ConfirmPlace({ iconSvg }: { iconSvg?: string }) {
  const token = (useSearchParams().get('token') ?? '').trim();
  const [status, setStatus] = useState<Status>(token ? 'idle' : 'invalid');
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status !== 'rising') return;
    const disc = buttonRef.current?.querySelector('circle');
    if (!disc || prefersReducedMotion()) {
      setStatus('confirmed');
      return;
    }
    const tween = gsap.fromTo(disc, { attr: { cy: 82 } }, { attr: { cy: 36 }, duration: 0.6, ease: 'power3.out', onComplete: () => setStatus('confirmed') });
    return () => {
      tween.kill();
    };
  }, [status]);

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
      setStatus(outcome === 'confirmed' && iconSvg ? 'rising' : outcome);
    } catch {
      setStatus('error');
    }
  }

  const back = (
    <Link href="/#waitlist" className="underline underline-offset-4">
      Secure your place
    </Link>
  );

  return (
    <div className="max-w-[40rem]" data-confirm-status={status}>
      {status === 'idle' || status === 'sending' || status === 'rising' || status === 'error' ? (
        <>
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">Confirm your place.</h1>
          <p className="mt-6 text-lg">One press and you are a founding friend.</p>
          {status === 'rising' ? (
            <button ref={buttonRef} type="button" disabled aria-label="Your place is confirmed" className="mt-8 flex h-12 w-12 items-center justify-center bg-accent text-ink" data-confirm-disc>
              <span className="brand-mark brand-icon block h-7" dangerouslySetInnerHTML={{ __html: prefersReducedMotion() ? iconSvg! : iconSvg!.replace('cy="36"', 'cy="82"') }} />
            </button>
          ) : (
          <button
            type="button"
            onClick={confirm}
            disabled={status === 'sending'}
            className="btn mt-8 h-12 bg-accent px-6 text-base font-medium text-ink disabled:opacity-60"
          >
            {status === 'sending' ? 'Confirming' : 'Confirm my place'}
          </button>
          )}
          <p role="status" aria-live="polite" className="mt-4 min-h-6 text-base">
            {status === 'error' ? 'We could not confirm your place. Please try again in a moment.' : null}
          </p>
        </>
      ) : null}

      {status === 'confirmed' ? (
        <>
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">You are a founding friend.</h1>
          <p className="mt-6 text-lg">Your place is confirmed. You will hear from us first when entries open.</p>
          <HeardAbout token={token} />
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
          <p className="mt-6 text-lg">Secure your place again and we will send you a fresh one. {back}.</p>
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
