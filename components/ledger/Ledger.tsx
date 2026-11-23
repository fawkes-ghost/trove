import Link from 'next/link';
import { escape as hampshire, type Escape } from '@/config/prize';
import { count } from '@/lib/format';
import { freePostalRoute } from '@/lib/routes';
import { TypedFigure } from './TypedFigure';

// The honesty device, as the opening block of the odds section. Entries against the cap
// while the escape is open; the cap before that. The heavy figure, the accent, and the postal parity
// line. Static data for now. The figure is ink: sun is a fill, never text on daylight.
export function Ledger({ escape = hampshire, entriesTaken = 0 }: { escape?: Escape; entriesTaken?: number }) {
  const open = escape.status === 'open';
  return (
    <div id="ledger" className="scroll-mt-24 rule-t pt-8">
      <h3 className="display text-[1.75rem] md:text-[2rem]">A fixed number of entries.</h3>
      <p className="figure mt-6 text-[2.75rem] text-ink md:text-[4.5rem]">
        {open ? <TypedFigure text={`${count(entriesTaken)} of ${count(escape.cap)}`} /> : count(escape.cap)}
      </p>
      <p className="mt-3 text-base text-ink/70">{open ? 'entries gone so far, paid and postal together.' : 'entries in this draw, and never more. Paid and postal together.'}</p>
      <p className="mt-6 max-w-[40rem] text-base">
        Postal entries are part of the same total, with the same chance.{' '}
        <Link href={freePostalRoute} className="underline underline-offset-4">
          Free entry by post
        </Link>
        .
      </p>
    </div>
  );
}
