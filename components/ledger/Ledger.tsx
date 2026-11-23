import Link from 'next/link';
import { escape as hampshire, type Escape } from '@/config/prize';
import { count } from '@/lib/format';
import { freePostalRoute } from '@/lib/routes';
import { TypedFigure } from './TypedFigure';

// The honesty device, beside the ladder in the odds section. Entries against the cap while
// the escape is open; the cap before that. The figure is a promise, so it takes the heavy
// sans and the gold line under it, at the size of a subheading: the one full-size figure on
// the page is the chance, in the hero. Static data for now.
export function Ledger({ escape = hampshire, entriesTaken = 0 }: { escape?: Escape; entriesTaken?: number }) {
  const open = escape.status === 'open';
  return (
    <div id="ledger" className="scroll-mt-24 rule-t pt-8">
      <h3 className="display text-[1.625rem] leading-tight md:text-[1.875rem]">A fixed number of entries.</h3>
      <p className="figure figure-marked mt-6 text-[2.5rem] text-ink md:text-[3.25rem]">
        {open ? <TypedFigure text={`${count(entriesTaken)} of ${count(escape.cap)}`} /> : count(escape.cap)}
      </p>
      <p className="mt-3 text-base text-ink/70">{open ? 'entries gone so far, paid and postal together.' : 'entries in this draw, and never more. Paid and postal together.'}</p>
      <p className="mt-6 max-w-[26rem] text-base">
        Postal entries are part of the same total, with the same chance.{' '}
        <Link href={freePostalRoute} className="link-quiet">
          Free entry by post
        </Link>
        .
      </p>
    </div>
  );
}
