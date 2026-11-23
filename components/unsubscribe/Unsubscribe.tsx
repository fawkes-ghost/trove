'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Status = 'reading' | 'idle' | 'sending' | 'done' | 'already' | 'invalid' | 'error';

// Who the link is for. New links carry the list row's id; links in emails sent before the
// change carry the address. Either travels with the token that proves the link is ours.
type Subject = { id: string; token: string } | { email: string; token: string };

function readSubject(search: string): Subject | null {
  const params = new URLSearchParams(search);
  const token = (params.get('token') ?? '').trim();
  const id = (params.get('id') ?? '').trim();
  const email = (params.get('email') ?? '').trim();
  if (!token) return null;
  if (id) return { id, token };
  if (email) return { email, token };
  return null;
}

// One button. Nothing is sent until it is pressed, so a mail scanner that opens the link
// cannot unsubscribe anyone. On arrival the id, address and token are read into memory and
// taken out of the address bar at once, so they are not left in the browser's history and
// never reach analytics, which loads after this runs and reads the address as it then is.
export function Unsubscribe({ contactEmail }: { contactEmail: string }) {
  const [subject, setSubject] = useState<Subject | null>(null);
  const [status, setStatus] = useState<Status>('reading');

  useEffect(() => {
    const found = readSubject(window.location.search);
    setSubject(found);
    setStatus(found ? 'idle' : 'invalid');
    if (window.location.search) window.history.replaceState(null, '', window.location.pathname);
  }, []);

  async function unsubscribe() {
    if (!subject) return;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const response = await fetch(`${url}/functions/v1/handle-email-unsubscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: key, Authorization: `Bearer ${key}` },
        body: JSON.stringify(subject),
      });
      const data: { ok?: boolean; status?: string } = await response.json().catch(() => ({}));
      if (response.status === 400) {
        setStatus('invalid');
        return;
      }
      if (!response.ok || !data.ok) {
        setStatus('error');
        return;
      }
      setStatus(data.status === 'already_unsubscribed' ? 'already' : 'done');
    } catch {
      setStatus('error');
    }
  }

  const asking = status === 'reading' || status === 'idle' || status === 'sending' || status === 'error';

  return (
    <div className="max-w-[40rem]" data-unsubscribe-status={status}>
      {asking ? (
        <>
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">Stop emails from Trove.</h1>
          <p className="mt-6 text-lg">Press the button and we’ll stop emailing you. That includes the email on the day entries open.</p>
          <button
            type="button"
            onClick={unsubscribe}
            disabled={status === 'reading' || status === 'sending'}
            className="btn mt-8 h-12 bg-ink px-6 text-base font-medium text-snow disabled:opacity-60"
          >
            {status === 'sending' ? 'Unsubscribing' : 'Unsubscribe'}
          </button>
          <p role="status" aria-live="polite" className="mt-4 min-h-6 text-base">
            {status === 'error' ? 'We couldn’t do that just now. Please try again in a moment.' : null}
          </p>
          <noscript>
            <p className="mt-4 text-base">This button needs JavaScript. You can also write to {contactEmail} and we’ll stop emailing you.</p>
          </noscript>
        </>
      ) : null}

      {status === 'done' || status === 'already' ? (
        <div role="status">
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">{status === 'done' ? 'You’re unsubscribed.' : 'You’re already unsubscribed.'}</h1>
          <p className="mt-6 text-lg">{status === 'done' ? 'We won’t email you again.' : 'There’s nothing more to do. We won’t email you again.'}</p>
          <p className="mt-8 text-base">
            <Link href="/" className="link-quiet">
              Back to Trove
            </Link>
          </p>
        </div>
      ) : null}

      {status === 'invalid' ? (
        <div role="status">
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">This link doesn’t work.</h1>
          <p className="mt-6 text-lg">
            Write to <span className="select-all font-medium">{contactEmail}</span> from the address you signed up with and we’ll stop emailing you.
          </p>
        </div>
      ) : null}
    </div>
  );
}
