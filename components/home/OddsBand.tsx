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
    { figure: count(escape.cap), caption: 'entries in the cap, never more.' },
    { figure: worstCaseOdds(escape), caption: 'worst-case odds with one entry.' },
    { figure: percent(escape.charity.shareOfGross), caption: `of every paid entry to ${escape.destination} causes.` },
  ];
  return (
    <section id="odds-band" className="section-half bg-cloud text-ink">
      <Kicker>Your odds of winning.</Kicker>
      <div className="mt-8 grid gap-8 min-[900px]:grid-cols-3">
        {figures.map((item) => (
          <div key={item.figure} data-odds-unit>
            <p className="font-mono text-[2rem] leading-none whitespace-nowrap">{item.figure}</p>
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
