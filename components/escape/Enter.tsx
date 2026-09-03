import Link from 'next/link';
import { oddsForEntries, type Escape } from '@/config/prize';
import { gbp, numberWord, sentenceCase } from '@/lib/format';

// The bundles as three plain options. No strikethrough, no badge. While the escape is not
// open the action is the waitlist, so each option carries the waitlist link instead of a
// purchase and says so.
export function Enter({ escape }: { escape: Escape }) {
  const open = escape.status === 'open';
  return (
    <section id="enter" className="border-t border-ink/15 px-6 py-24 md:px-10 md:py-32">
      <div className="max-w-[52rem]">
        <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">Enter.</h2>
        {!open ? (
          <p className="mt-6 max-w-[40rem] text-lg">Entries are not open yet. Founding friends hear first when they are.</p>
        ) : null}
        <ul className="mt-10 flex flex-col">
          {escape.entry.bundles.map((bundle) => (
            <li key={bundle.entries} className="grid items-center gap-4 border-t border-ink/15 py-6 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-lg">
                  {sentenceCase(numberWord(bundle.entries))} {bundle.entries === 1 ? 'entry' : 'entries'} for {gbp(bundle.price)}.
                </p>
                <p className="mt-1 font-mono text-sm text-ink/70">{oddsForEntries(bundle.entries, escape)} worst case</p>
              </div>
              {open ? (
                <button type="button" className="h-12 bg-accent px-6 text-base font-medium text-ink" disabled>
                  Enter
                </button>
              ) : (
                <Link
                  href="/#waitlist"
                  data-entry="waitlist"
                  className="inline-flex h-12 items-center justify-center border border-ink/40 px-6 text-base font-medium text-ink/70"
                >
                  Join the waitlist
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
