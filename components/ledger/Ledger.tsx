import Link from 'next/link';
import { escape as hampshire, worstCaseOdds, type Escape } from '@/config/prize';
import { count } from '@/lib/format';
import { freePostalRoute } from '@/lib/routes';
import { TypedFigure } from './TypedFigure';

// The honesty device. Entries against the cap while the escape is open; the cap and the
// worst-case odds before that. Mono figures, room around them. Static data for now.
export function Ledger({ escape = hampshire, entriesTaken = 0 }: { escape?: Escape; entriesTaken?: number }) {
  const open = escape.status === 'open';
  return (
    <section id="ledger" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-36">
      <h2 className="display text-[2rem] md:text-[2.75rem]">The ledger.</h2>
      <div className="mt-12 flex max-w-[52rem] flex-col gap-12 font-mono md:mt-16">
        {open ? (
          <div>
            <p className="text-[2.75rem] leading-none text-accent md:text-[4.5rem]">
              <TypedFigure text={`${count(entriesTaken)} of ${count(escape.cap)}`} />
            </p>
            <p className="mt-3 font-sans text-base text-ink/70">entries taken, paid and postal together</p>
          </div>
        ) : (
          <div>
            <p className="text-[2.75rem] leading-none text-accent md:text-[4.5rem]">{count(escape.cap)}</p>
            <p className="mt-3 font-sans text-base text-ink/70">entries in the cap, paid and postal together</p>
          </div>
        )}
        <div className="border-t border-ink/20 pt-8">
          <p className="text-[1.75rem] leading-none md:text-[2.25rem]">{worstCaseOdds(escape)}</p>
          <p className="mt-3 font-sans text-base text-ink/70">worst-case odds, if every entry is taken</p>
        </div>
        <p className="font-sans text-base">
          Free postal entries count inside the same cap, with identical odds.{' '}
          <Link href={freePostalRoute} className="underline underline-offset-4">
            Free entry by post
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
