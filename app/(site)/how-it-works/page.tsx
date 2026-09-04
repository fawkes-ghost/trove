import type { Metadata } from 'next';
import Link from 'next/link';
import { compliance, escape, oddsForEntries, worstCaseOdds } from '@/config/prize';
import { count, gbp, numberWord } from '@/lib/format';
import { freePostalRoute } from '@/lib/routes';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';

export const metadata: Metadata = {
  title: 'How it works',
  description: 'Enter, we draw, you escape. The cap, the odds and the free postal route, in plain words.',
  alternates: { canonical: '/how-it-works' },
};

// Enter, we draw, you escape. Three plain steps, then the cap and the odds. Every figure is
// read from config or computed from the cap; no number is typed in the copy.
export default function HowItWorksPage() {
  const largest = escape.entry.bundles[escape.entry.bundles.length - 1];
  return (
    <main>
      <section className="px-6 pt-28 pb-16 md:px-10 md:pt-36 md:pb-24">
        <div className="max-w-[40rem]">
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">How it works.</h1>
          <p className="mt-6 text-lg">One escape, one draw, one winner. Three steps and nothing hidden.</p>
        </div>
      </section>

      <section className="px-6 pb-8 md:px-10">
        <ol className="max-w-[40rem]">
          <Step number={1} title="Enter.">
            <p>
              Choose how many entries you would like and pay online, or{' '}
              <Link href={freePostalRoute} className="underline underline-offset-4">
                enter for free by post
              </Link>
              . A single entry is {gbp(escape.entry.price)}; bundles are {escape.entry.bundles.map((b) => `${numberWord(b.entries)} for ${gbp(b.price)}`).join(', ')}. Every entry, paid or postal, goes into the same ledger with the same odds.
            </p>
            <p className="mt-3">
              The most any one person can hold in a draw is {count(escape.entry.maxPerPerson)} entries, paid and postal together.
            </p>
          </Step>
          <Step number={2} title="We draw.">
            <p>
              Entries close when the cap of {count(escape.cap)} is reached, or on the longstop date we publish when entries open, whichever comes first. We never extend a closing date. One entry is then drawn at random from every entry in the ledger, and we publish the winning entry number and how it was drawn.
              {compliance.noRollover ? ' One winner is guaranteed.' : null}
            </p>
          </Step>
          <Step number={3} title="You escape.">
            <p>
              We tell the winner by email. They have {escape.prize.claimWindowDays} days from the draw to choose between the escape and a cash alternative of {gbp(escape.prize.cashAlternative)}. The stay can be taken within {escape.prize.stayValidMonths} months of the claim.
            </p>
          </Step>
        </ol>
      </section>

      <section id="odds" className="border-t border-ink/15 px-6 py-20 md:px-10 md:py-28">
        <div className="max-w-[40rem]">
          <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">The cap and the odds.</h2>
          <div className="mt-10 flex flex-col gap-10 font-mono">
            <div>
              <p className="text-[2.75rem] leading-none text-accent md:text-[4rem]">{count(escape.cap)}</p>
              <p className="mt-3 font-sans text-base text-ink/70">entries in the cap for {escape.destination}, paid and postal together, and never raised</p>
            </div>
            <div>
              <p className="text-[2rem] leading-none md:text-[2.75rem]">{worstCaseOdds(escape)}</p>
              <p className="mt-3 font-sans text-base text-ink/70">worst-case odds with one entry, if every entry is taken</p>
            </div>
            <div>
              <p className="text-[2rem] leading-none md:text-[2.75rem]">{oddsForEntries(largest.entries, escape)}</p>
              <p className="mt-3 font-sans text-base text-ink/70">with {numberWord(largest.entries)} entries. Fewer entries taken means better odds for everyone in the draw</p>
            </div>
          </div>
          <p className="mt-10 text-base">
            The full odds ladder and a calculator are on{' '}
            <Link href={`/escapes/${escape.slug}#odds`} className="underline underline-offset-4">
              the {escape.destination} escape page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-ink/15 px-6 py-6 md:px-10">
        <ComplianceStrip className="text-ink/75" />
      </section>
    </main>
  );
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <li className="grid gap-2 border-t border-ink/15 py-8 md:grid-cols-[3rem_1fr]">
      <p className="font-mono text-sm text-ink/60">{number}</p>
      <div>
        <h2 className="display text-[1.75rem] leading-tight md:text-[2.25rem]">{title}</h2>
        <div className="mt-3 text-lg">{children}</div>
      </div>
    </li>
  );
}
