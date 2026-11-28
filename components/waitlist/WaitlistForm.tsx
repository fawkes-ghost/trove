'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Turnstile, TURNSTILE_SITE_KEY } from './Turnstile';
import { readAttribution, withShareCode } from '@/lib/attribution';
import { ShareButton } from '@/components/share/ShareButton';
import { trackEvent } from '@/lib/analytics';
import { FoundingSticker } from './FoundingSticker';

type Status = 'idle' | 'sending' | 'ok' | 'duplicate' | 'name' | 'invalid' | 'error' | 'challenge';

const messages: Record<Exclude<Status, 'idle' | 'sending'>, string> = {
  ok: 'Check your email.',
  duplicate: 'You’re already on the list.',
  name: 'Please add your first name and surname.',
  invalid: 'That doesn’t look like an email address.',
  error: 'Something went wrong at our end. Please try again in a moment.',
  challenge: 'We couldn’t check that you’re a person. Please try again.',
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_MAX = 80;

// One field style for all three inputs.
const FIELD = 'h-12 w-full min-w-0 border border-ink/40 bg-snow px-4 text-base text-ink placeholder:text-ink/50 focus:border-ink focus:outline-none';

// First name, surname, email address and a button: the names side by side on one row, the
// email and the button on the next, both rows the same width. Calls the existing
// waitlist-signup edge function directly so the visitor's own details reach it; the function
// already stores firstName and lastName, and it and the table are not changed from this
// repo. That function sends the confirmation email; nothing in this repo sends mail.
//
// Protection: a Cloudflare Turnstile token goes to the function as turnstile_token, and a
// honeypot field named for bots to fill refuses the submit client-side when it has a
// value. Without a site key configured the widget is skipped and the honeypot still holds.
// sourceChannel names the surface the form sits on and is stored against the signup.
//
// On success the form gives way to the founding friend sticker, with a fall of confetti for
// a new signup and none for someone already on the list (FoundingSticker), then the message.
// wordmarkSvg is the wordmark's source, read on the server, for the sticker's tab. A page
// can carry more than one form (the hero and the section at the foot), so the field ids take
// a prefix.
export function WaitlistForm({ sourceChannel = 'trove-home', share, idPrefix = 'waitlist', wordmarkSvg }: { sourceChannel?: string; share?: { title: string; text: string; url: string }; idPrefix?: string; wordmarkSvg?: string } = {}) {
  const [status, setStatus] = useState<Status>('idle');
  const [token, setToken] = useState<string | null>(null);
  // Which name field was left empty on the last submit, so only that one is marked invalid.
  const [nameGaps, setNameGaps] = useState({ first: false, last: false });
  const [resetSignal, setResetSignal] = useState(0);
  // This person's own share code, from the function's answer, so the link they send is theirs.
  const [shareCode, setShareCode] = useState<string | null>(null);
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

    const firstName = String(data.get('firstName') ?? '').trim().slice(0, NAME_MAX);
    const lastName = String(data.get('lastName') ?? '').trim().slice(0, NAME_MAX);
    const email = String(data.get('email') ?? '')
      .trim()
      .toLowerCase();

    if (!firstName || !lastName) {
      setNameGaps({ first: !firstName, last: !lastName });
      setStatus('name');
      return;
    }

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
        body: JSON.stringify({ firstName, lastName, email, source_channel: sourceChannel, turnstile_token: token, ...readAttribution() }),
      });
      const result: { success?: boolean; message?: string; error?: string; referralCode?: string | null } = await response.json().catch(() => ({}));

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
      setShareCode(result.referralCode ?? null);
      if (result.message === 'Already registered') {
        setStatus('duplicate');
        return;
      }
      // The edge function has sent the confirmation email by the time it answers.
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

  const clearStatus = () => {
    if (status !== 'idle') setStatus('idle');
  };

  const message = status === 'idle' || status === 'sending' ? null : messages[status];
  const done = status === 'ok' || status === 'duplicate';

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-3" data-waitlist-form data-turnstile-key={protectedByTurnstile ? "set" : "missing"}>
      {done ? <FoundingSticker celebrate={status === 'ok'} wordmarkSvg={wordmarkSvg} /> : null}
      {!done ? (
        <>
          <div className="flex max-w-[34rem] flex-col gap-3" data-waitlist-fields>
            <div className="grid grid-cols-2 gap-3" data-waitlist-names>
              <div>
                <label htmlFor={`${idPrefix}-first-name`} className="sr-only">
                  First name
                </label>
                <input
                  id={`${idPrefix}-first-name`}
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  autoCapitalize="words"
                  spellCheck={false}
                  maxLength={NAME_MAX}
                  placeholder="First name"
                  required
                  aria-invalid={(status === 'name' && nameGaps.first) || undefined}
                  aria-describedby={`${idPrefix}-status`}
                  onChange={clearStatus}
                  className={FIELD}
                />
              </div>
              <div>
                <label htmlFor={`${idPrefix}-last-name`} className="sr-only">
                  Surname
                </label>
                <input
                  id={`${idPrefix}-last-name`}
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  autoCapitalize="words"
                  spellCheck={false}
                  maxLength={NAME_MAX}
                  placeholder="Surname"
                  required
                  aria-invalid={(status === 'name' && nameGaps.last) || undefined}
                  aria-describedby={`${idPrefix}-status`}
                  onChange={clearStatus}
                  className={FIELD}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 md:flex-row" data-waitlist-email-row>
              <label htmlFor={`${idPrefix}-email`} className="sr-only">
                Email address
              </label>
              <input
                id={`${idPrefix}-email`}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="Email address"
                required
                aria-invalid={status === 'invalid' || undefined}
                aria-describedby={`${idPrefix}-status`}
                onChange={clearStatus}
                className={`${FIELD} md:flex-1`}
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn h-12 shrink-0 bg-accent px-6 text-base font-medium text-ink disabled:opacity-60"
              >
                {status === 'sending' ? 'Joining' : 'Join the list'}
              </button>
            </div>
          </div>

          {/* Honeypot. Off screen for people, present for scripts. Not display:none. */}
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor={`${idPrefix}-website`}>Website</label>
            <input id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
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
      <p id={`${idPrefix}-status`} role="status" aria-live="polite" data-waitlist-status className={`min-h-6 text-base ${done ? 'font-medium' : ''}`}>
        {message}
      </p>
      {/* Once someone is on the list, the next useful thing is the person they would take. */}
      {done && share && message ? (
        <div className="flex flex-col items-start gap-3 rule-t pt-4" data-waitlist-share>
          <p className="text-base">The escape is for two. Send it to the person you would take.</p>
          <ShareButton {...share} url={withShareCode(share.url, shareCode)} placement="waitlist-done" className="border border-ink/25 px-5 py-3 text-base font-medium hover:border-ink" />
        </div>
      ) : null}
    </form>
  );
}
