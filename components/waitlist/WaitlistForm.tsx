'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Turnstile, TURNSTILE_SITE_KEY } from './Turnstile';
import { readAttribution } from '@/lib/attribution';
import { trackEvent } from '@/lib/analytics';

type Status = 'idle' | 'sending' | 'ok' | 'duplicate' | 'invalid' | 'error' | 'challenge';

const messages: Record<Exclude<Status, 'idle' | 'sending'>, string> = {
  ok: 'You are on the list.',
  duplicate: 'You are already on the list.',
  invalid: 'That does not look like an email address.',
  error: 'We could not reach the list. Please try again in a moment.',
  challenge: 'We could not confirm you are a person. Please try again.',
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// A single email field and a button. Calls the existing waitlist-signup edge function
// directly so the visitor's own address reaches it. The function and table are not
// changed from this repo. The Resend confirmation is a stub in lib/email/resend.ts.
//
// Protection: a Cloudflare Turnstile token goes to the function as turnstile_token, and a
// honeypot field named for bots to fill refuses the submit client-side when it has a
// value. Without a site key configured the widget is skipped and the honeypot still holds.
// sourceChannel names the surface the form sits on and is stored against the signup.
export function WaitlistForm({ sourceChannel = 'trove-home' }: { sourceChannel?: string } = {}) {
  const [status, setStatus] = useState<Status>('idle');
  const [token, setToken] = useState<string | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const protectedByTurnstile = TURNSTILE_SITE_KEY.length > 0;

  useEffect(() => {
    if (!protectedByTurnstile) {
      console.warn('Waitlist: NEXT_PUBLIC_TURNSTILE_SITE_KEY was empty at build time, so no widget renders and the function will refuse every submit.');
    }
  }, [protectedByTurnstile]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: people never see this field, so a value means a script filled it.
    if (String(data.get('website') ?? '').length > 0) return;

    const email = String(data.get('email') ?? '')
      .trim()
      .toLowerCase();

    if (!EMAIL.test(email)) {
      setStatus('invalid');
      return;
    }

    if (protectedByTurnstile && !token) {
      setStatus('challenge');
      return;
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      console.error('Waitlist: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are not set.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(`${url}/functions/v1/waitlist-signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: key, Authorization: `Bearer ${key}` },
        // Attribution held in sessionStorage since the first page of the visit; sent only now.
        body: JSON.stringify({ email, source_channel: sourceChannel, turnstile_token: token, ...readAttribution() }),
      });
      const result: { success?: boolean; message?: string; error?: string } = await response.json().catch(() => ({}));

      // The function answers 400 for a failed token check and for a bad email, and names
      // which. The address was already checked here, so a 400 is the email only when the
      // function says so; every other 400 and any 403 is the challenge.
      const badEmail = /email/i.test(result.error ?? '');
      if (response.status === 400 && badEmail) {
        setStatus('invalid');
        return;
      }
      if (response.status === 400 || response.status === 403) {
        setStatus('challenge');
        return;
      }
      if (!response.ok || !result.success) {
        setStatus('error');
        return;
      }
      if (result.message === 'Already registered') {
        setStatus('duplicate');
        return;
      }
      // Resend confirmation goes here once the domain exists. See lib/email/resend.ts.
      setStatus('ok');
      form.reset();
      trackEvent('waitlist_signup', { source_channel: sourceChannel });
    } catch {
      setStatus('error');
    } finally {
      // A token is single use; ask the widget for a fresh one either way.
      setResetSignal((n) => n + 1);
    }
  }

  const message = status === 'idle' || status === 'sending' ? null : messages[status];
  const done = status === 'ok' || status === 'duplicate';

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-3" data-waitlist-form data-turnstile-key={protectedByTurnstile ? "set" : "missing"}>
      {!done ? (
        <>
          <div className="flex flex-col gap-3 md:flex-row">
            <label htmlFor="waitlist-email" className="sr-only">
              Email address
            </label>
            <input
              id="waitlist-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="Your email address"
              required
              aria-invalid={status === 'invalid' || undefined}
              aria-describedby="waitlist-status"
              onChange={() => status !== 'idle' && setStatus('idle')}
              className="h-12 w-full border border-ink/40 bg-snow px-4 text-base text-ink placeholder:text-ink/50 focus:border-ink focus:outline-none md:max-w-sm"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="h-12 shrink-0 bg-accent px-6 text-base font-medium text-ink disabled:opacity-60"
            >
              {status === 'sending' ? 'Joining' : 'Join the waitlist'}
            </button>
          </div>

          {/* Honeypot. Off screen for people, present for scripts. Not display:none. */}
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="waitlist-website">Website</label>
            <input id="waitlist-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>

          {protectedByTurnstile ? (
            <Turnstile
              onToken={(value) => {
                setToken(value);
                if (value && status === 'challenge') setStatus('idle');
              }}
              onError={() => setStatus('challenge')}
              resetSignal={resetSignal}
            />
          ) : null}
        </>
      ) : null}
      <p id="waitlist-status" role="status" aria-live="polite" data-waitlist-status className={`min-h-6 text-base ${done ? 'font-medium' : ''}`}>
        {message}
      </p>
    </form>
  );
}
