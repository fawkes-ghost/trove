import Link from 'next/link';
import { compliance, escape as hampshire, worstCaseOdds, type Escape } from '@/config/prize';
import { count, percent } from '@/lib/format';
import { Kicker } from '@/components/site/Kicker';

// Cloud band directly under the hero: your odds of winning, in writing. Each figure and its
// caption are one unit at every width, so they can never be dealt into separate stacks:
// three across from 900px, one above the other below it. The key terms sit on their own
// line under a rule, not as a fourth figure. Everything from config.
export function OddsBand({ escape = hampshire }: { escape?: Escape }) {
  const figures = [
    { figure: count(escape.cap), caption: 'entries, and never more.' },
    { figure: worstCaseOdds(escape), caption: 'your chance with one entry, at least.' },
    { figure: percent(escape.charity.shareOfGross), caption: `of every paid entry goes to causes in ${escape.destination}.` },
  ];
  return (
    <section id="odds-band" className="section-half bg-cloud text-ink">
      <Kicker>Your chances.</Kicker>
      <div className="mt-8 grid gap-8 min-[900px]:grid-cols-3">
        {figures.map((item) => (
          <div key={item.figure} data-odds-unit>
            <p className="display text-[3.5rem] leading-none whitespace-nowrap tabular-nums md:text-[5rem]">{item.figure}</p>
            <p className="mt-3 text-base text-ink/70">{item.caption}</p>
          </div>
        ))}
      </div>
      <p className="rule-t mt-8 pt-6 text-base">
        <Link href={compliance.significantConditionsPath} className="underline decoration-ink/40 decoration-1 underline-offset-8 hover:decoration-ink">
          Read the key terms.
        </Link>
      </p>
    </section>
  );
}
