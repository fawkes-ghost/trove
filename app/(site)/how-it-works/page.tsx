import type { Metadata } from 'next';
import Link from 'next/link';
import { compliance, escape, oddsForEntries, worstCaseOdds } from '@/config/prize';
import { count, gbp, numberWord } from '@/lib/format';
import { freePostalRoute } from '@/lib/routes';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';
import { escapeName } from '@/lib/escapes';

export const metadata: Metadata = {
  title: 'How it works',
  description: 'How Trove works: buy entries or enter free by post, we draw one winner at random, and the winner takes the escape or the cash. Your odds, before you enter.',
  alternates: { canonical: '/how-it-works' },
};

// Enter, we draw, you escape. Three plain steps, then the cap and the odds. Every figure is
// read from config or computed from the cap; no number is typed in the copy.
export default function HowItWorksPage() {
  const largest = escape.entry.bundles[escape.entry.bundles.length - 1];
  return (
    <main>
      <section className="page-head">
        <div className="max-w-[40rem]">
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">How it works.</h1>
          <p className="mt-6 text-lg">You enter, we draw one winner at random, and the winner packs a bag.</p>
        </div>
      </section>

      <section className="page-body">
        <ol className="max-w-[40rem]">
          <Step number={1} title="Enter.">
            <p>
              Buy entries online, or{' '}
              <Link href={freePostalRoute} className="underline underline-offset-4">
                enter for free by post
              </Link>
              . One entry is {gbp(escape.entry.price)}, or {escape.entry.bundles.filter((b) => b.entries > 1).map((b) => `${numberWord(b.entries)} for ${gbp(b.price)}`).join(' or ')}. Paid and postal entries have exactly the same chance.
            </p>
            <p className="mt-3">
              Each person can have up to {count(escape.entry.maxPerPerson)} entries in a draw.
            </p>
          </Step>
          <Step number={2} title="We draw.">
            <p>
              There are only ever {count(escape.cap)} entries. The draw happens when they have all gone, or on the closing date we publish when entries open, whichever comes first. We never move that date. We pick one entry at random from all of them, paid and postal, and publish the winning number and how it was drawn.
              {compliance.noRollover ? ' There is always a winner.' : null}
            </p>
          </Step>
          <Step number={3} title="You escape.">
            <p>
              If you win, we email you and send you dates to choose from. You have {escape.prize.claimWindowDays} days to pick one, or to take the cash alternative instead. The stay is taken within {escape.prize.stayValidMonths} months.
            </p>
          </Step>
        </ol>
      </section>

      <section id="odds" className="rule-t section">
        <div className="max-w-[40rem]">
          <h2 className="display text-balance heading-section">Your chances.</h2>
          <p className="mt-6 text-lg" data-answer>
            There are never more than {count(escape.cap)} entries, so one entry gives you at least a {worstCaseOdds(escape)} chance.
          </p>
          <div className="mt-10 flex flex-col gap-10">
            <div>
              <p className="text-[2.75rem] leading-none text-accent md:text-[4rem]">{count(escape.cap)}</p>
              <p className="mt-3 font-sans text-base text-ink/70">entries in this draw, at most. Paid and postal together.</p>
            </div>
            <div>
              <p className="text-[2rem] leading-none md:text-[2.75rem]">{worstCaseOdds(escape)}</p>
              <p className="mt-3 font-sans text-base text-ink/70">with one entry, if every entry sells.</p>
            </div>
            <div>
              <p className="text-[2rem] leading-none md:text-[2.75rem]">{oddsForEntries(largest.entries, escape)}</p>
              <p className="mt-3 font-sans text-base text-ink/70">with {numberWord(largest.entries)} entries. If fewer entries sell, everyone’s chance is better.</p>
            </div>
          </div>
          <p className="mt-10 text-base">
            Work out your chances for any number of entries on{' '}
            <Link href={`/escapes/${escape.slug}#odds`} className="underline underline-offset-4">
              {escapeName(escape)} page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="rule-t section-strip">
        <ComplianceStrip className="text-ink/75" />
      </section>
    </main>
  );
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <li className="grid gap-2 rule-t py-8 md:grid-cols-[3rem_1fr]">
      <p className="text-sm text-ink/60">{number}</p>
      <div>
        <h2 className="display text-[1.75rem] leading-tight md:text-[2.25rem]">{title}</h2>
        <div className="mt-3 text-lg">{children}</div>
      </div>
    </li>
  );
}
