'use client';

import { useState } from 'react';

// Backend contract, to be added in trove-backend before this writes anything:
//   POST /functions/v1/waitlist-confirm  { token, heard_about }
//   heard_about is one of the keys below; the function verifies the token belongs to a
//   waitlist row, writes waitlist.heard_about, and answers { ok: true }. Unknown values are
//   refused with 400. Until that lands the function ignores the field and still answers
//   ok, so the person sees a thank you and nothing is stored.
export const heardAboutOptions = [
  { key: 'friend', label: 'A friend' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'search', label: 'Search' },
  { key: 'press', label: 'Press' },
  { key: 'other', label: 'Somewhere else' },
] as const;

export type HeardAbout = (typeof heardAboutOptions)[number]['key'];

type Status = 'asking' | 'sending' | 'thanked' | 'skipped' | 'failed';

// One optional question after a confirmed place. One tap answers it; skip is a plain
// link; nothing is required.
export function HeardAbout({ token }: { token: string }) {
  const [status, setStatus] = useState<Status>('asking');

  async function answer(value: HeardAbout) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      setStatus('failed');
      return;
    }
    setStatus('sending');
    try {
      const response = await fetch(`${url}/functions/v1/waitlist-confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: key, Authorization: `Bearer ${key}` },
        body: JSON.stringify({ token, heard_about: value }),
      });
      const data: { ok?: boolean } = await response.json().catch(() => ({}));
      setStatus(response.ok && data.ok ? 'thanked' : 'failed');
    } catch {
      setStatus('failed');
    }
  }

  if (status === 'skipped') return null;

  if (status === 'thanked') {
    return (
      <p className="mt-10 text-base" role="status" data-heard-about="thanked">
        Thank you.
      </p>
    );
  }

  if (status === 'failed') {
    return (
      <p className="mt-10 text-base" role="status" data-heard-about="failed">
        We could not save that, but your place is confirmed.
      </p>
    );
  }

  return (
    <div className="mt-12 border-t border-ink/15 pt-8" data-heard-about="asking">
      <p className="text-lg">How did you hear about Trove?</p>
      <p className="mt-1 text-sm text-ink/60">Optional. One tap and we will not ask again.</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {heardAboutOptions.map((option) => (
          <li key={option.key}>
            <button
              type="button"
              disabled={status === 'sending'}
              onClick={() => answer(option.key)}
              className="h-10 border border-ink/40 px-4 text-sm font-medium text-ink hover:border-ink disabled:opacity-60"
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => setStatus('skipped')} className="mt-4 text-sm text-ink/70 underline underline-offset-4">
        Skip
      </button>
    </div>
  );
}
