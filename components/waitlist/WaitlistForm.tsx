'use client';

import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'sending' | 'ok' | 'duplicate' | 'invalid' | 'error';

const messages: Record<Exclude<Status, 'idle' | 'sending'>, string> = {
  ok: 'You are on the list.',
  duplicate: 'You are already on the list.',
  invalid: 'That does not look like an email address.',
  error: 'We could not reach the list. Please try again in a moment.',
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// A single email field and a button. Calls the existing waitlist-signup edge function
// directly so the visitor's own address reaches it. The function and table are not
// changed from this repo. The Resend confirmation is a stub in lib/email/resend.ts.
export function WaitlistForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get('email') ?? '')
      .trim()
      .toLowerCase();

    if (!EMAIL.test(email)) {
      setStatus('invalid');
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
        body: JSON.stringify({ email, source_channel: 'trove-home' }),
      });
      const data: { success?: boolean; message?: string; error?: string } = await response.json().catch(() => ({}));

      if (response.status === 400) {
        setStatus('invalid');
        return;
      }
      if (!response.ok || !data.success) {
        setStatus('error');
        return;
      }
      if (data.message === 'Already registered') {
        setStatus('duplicate');
        return;
      }
      // Resend confirmation goes here once the domain exists. See lib/email/resend.ts.
      setStatus('ok');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const message = status === 'idle' || status === 'sending' ? null : messages[status];
  const done = status === 'ok' || status === 'duplicate';

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3" data-waitlist-form>
      {!done ? (
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
      ) : null}
      <p id="waitlist-status" role="status" aria-live="polite" data-waitlist-status className={`min-h-6 text-base ${done ? 'font-medium' : ''}`}>
        {message}
      </p>
    </form>
  );
}
