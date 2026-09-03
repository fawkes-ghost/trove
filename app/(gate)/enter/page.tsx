import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { gatePassphrase } from '@/lib/gate';
import { Icon, Wordmark } from '@/components/brand/Marks';
import { enter } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Enter',
  robots: { index: false, follow: false },
};

const messages = {
  wrong: 'That is not it.',
  limit: 'Too many attempts. Please try again in ten minutes.',
};

// One passphrase field. Works without JavaScript: the form posts to the server action,
// which sets the cookie and redirects. With the gate off this route does not exist.
export default async function EnterPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!gatePassphrase()) notFound();

  const { error } = await searchParams;
  const message = error === 'limit' ? messages.limit : error ? messages.wrong : null;

  return (
    <main className="grid min-h-svh grid-rows-[auto_1fr] px-6 md:px-10">
      <div className="flex items-center gap-[10px] py-5" aria-label="Trove">
        <Icon height={28} />
        <Wordmark height={22} />
      </div>

      <div className="flex flex-col justify-center py-12 md:py-16">
        <form action={enter} className="flex w-full max-w-sm flex-col gap-3">
          <label htmlFor="passphrase" className="text-sm font-medium">
            Passphrase
          </label>
          <input
            id="passphrase"
            name="passphrase"
            type="password"
            autoComplete="off"
            autoFocus
            required
            aria-invalid={message ? true : undefined}
            aria-describedby="enter-status"
            className="h-12 w-full border border-ink/40 bg-snow px-4 text-base text-ink focus:border-ink focus:outline-none"
          />
          <button type="submit" className="h-12 bg-ink px-6 text-base font-medium text-snow">
            Enter
          </button>
          <p id="enter-status" role="alert" className="min-h-6 text-base">
            {message}
          </p>
        </form>
      </div>
    </main>
  );
}
