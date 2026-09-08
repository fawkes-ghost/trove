import Link from 'next/link';
import { compliance, type Escape } from '@/config/prize';
import { gbp } from '@/lib/format';

// Lower-cases a leading letter so a component reads mid-sentence; a leading figure is left alone.
const lowerFirstLetter = (line: string) => (/^[A-Za-z]/.test(line) ? line.charAt(0).toLowerCase() + line.slice(1) : line);

// The prize components from config, the cash line explicit, then the cash alternative and
// the claim window in one sentence with a link to the terms.
export function WhatYouWin({ escape }: { escape: Escape }) {
  const { prize } = escape;
  return (
    <section id="what-you-win" className="px-6 py-24 md:px-10 md:py-32">
      <div className="max-w-[40rem]">
        <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">What you win.</h2>
        <p className="mt-6 text-lg" data-answer>
          You win {prize.description.map(lowerFirstLetter).join(', ')}: a {gbp(prize.value)} prize.
        </p>
        <ul className="mt-10 flex flex-col gap-4 text-lg">
          {prize.description.map((line) => (
            <li key={line} className="border-t border-ink/15 pt-4">
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-10 font-mono text-[1.75rem] leading-none text-accent md:text-[2.25rem]">{gbp(prize.cash)} in cash</p>
        <p className="mt-3 text-base text-ink/70">paid to the winner, to spend on the escape or not</p>
        <p className="mt-8 text-base">
          The transfers are booked and paid for by us. They are part of the escape and cannot be exchanged for cash.
        </p>
        <p className="mt-10 text-base">
          If the winner would rather not take the stay, a cash alternative of {gbp(prize.cashAlternative)} is paid instead, and the winner has {prize.claimWindowDays} days to choose, with the stay valid for {prize.stayValidMonths} months from the claim, subject to availability.{' '}
          <Link href={compliance.significantConditionsPath} className="underline underline-offset-4">
            Key terms
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
