import Link from 'next/link';
import { compliance, escape as hampshire, worstCaseOdds, type Escape } from '@/config/prize';
import { count, percent } from '@/lib/format';
import { Kicker } from '@/components/site/Kicker';

// Ink band directly under the hero: the odds, in writing. Three figures on one row, the
// cap, the worst-case odds and the giving share, each with a one-line caption, and the key
// terms at the right. Everything from config. Each figure is one line at every width, all
// three at one size on a shared baseline. Stacks on narrow screens.
export function OddsBand({ escape = hampshire }: { escape?: Escape }) {
  const figures = [
    { figure: count(escape.cap), caption: 'entries in the cap, never more.' },
    { figure: worstCaseOdds(escape), caption: 'worst-case odds with one entry.' },
    { figure: percent(escape.charity.shareOfGross), caption: `of every entry to ${escape.destination} causes.` },
  ];
  return (
    <section id="odds-band" className="bg-ink px-6 py-16 text-snow md:px-10 md:py-20">
      <Kicker tone="ink">The odds, in writing.</Kicker>
      <div className="mt-8 grid gap-x-8 gap-y-3 md:grid-cols-[1fr_1fr_1fr_auto] md:grid-rows-[auto_auto] md:items-end md:gap-y-3">
        {figures.map((item, i) => (
          <p key={item.figure} className={`font-mono text-[2rem] leading-none whitespace-nowrap md:row-start-1 ${['md:col-start-1', 'md:col-start-2', 'md:col-start-3'][i]}`}>
            {item.figure}
          </p>
        ))}
        {figures.map((item, i) => (
          <p key={item.caption} className={`text-base text-snow/70 md:row-start-2 ${['md:col-start-1', 'md:col-start-2', 'md:col-start-3'][i]} ${i < figures.length - 1 ? 'mb-7 md:mb-0' : ''}`}>
            {item.caption}
          </p>
        ))}
        <p className="mt-6 text-base md:col-start-4 md:row-start-2 md:mt-0 md:justify-self-end">
          <Link href={compliance.significantConditionsPath} className="underline decoration-snow/40 decoration-1 underline-offset-8 hover:decoration-snow">
            Read the key terms.
          </Link>
        </p>
      </div>
    </section>
  );
}
