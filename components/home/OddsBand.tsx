import Link from 'next/link';
import { compliance, escape as hampshire, worstCaseOdds, type Escape } from '@/config/prize';
import { count, percent } from '@/lib/format';
import { Kicker } from '@/components/site/Kicker';

// Ink band directly under the hero: the odds, in writing. Three figures on one row, the
// cap, the worst-case odds and the giving share, each with a one-line caption, and the key
// terms at the right. Everything from config. Stacks on narrow screens.
export function OddsBand({ escape = hampshire }: { escape?: Escape }) {
  const figures = [
    { figure: count(escape.cap), caption: 'entries in the cap, never more.' },
    { figure: worstCaseOdds(escape), caption: 'worst-case odds with one entry.' },
    { figure: percent(escape.charity.shareOfGross), caption: `of every entry to ${escape.destination} causes.` },
  ];
  return (
    <section id="odds-band" className="bg-ink px-6 py-16 text-snow md:px-10 md:py-20">
      <Kicker tone="ink">The odds, in writing.</Kicker>
      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end md:gap-12">
        {figures.map((item) => (
          <div key={item.caption}>
            <p className="font-mono text-[2.5rem] leading-none md:text-[3rem]">{item.figure}</p>
            <p className="mt-3 text-base text-snow/70">{item.caption}</p>
          </div>
        ))}
        <p className="text-base md:justify-self-end">
          <Link href={compliance.significantConditionsPath} className="underline decoration-snow/40 decoration-1 underline-offset-8 hover:decoration-snow">
            Read the key terms.
          </Link>
        </p>
      </div>
    </section>
  );
}
