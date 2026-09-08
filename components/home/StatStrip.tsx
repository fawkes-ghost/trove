import Link from 'next/link';
import { compliance, escape, worstCaseOdds, type Escape } from '@/config/prize';
import { count, percent } from '@/lib/format';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

type Stat = { figure: string; caption: string };

// The facts of the draw as figures in the mono face with one-line captions: the cap,
// the worst-case odds, one winner, the free route and the giving share. Every figure is
// read from config. No borders, no cards.
function statsFor(e: Escape): Stat[] {
  const stats: Stat[] = [
    { figure: count(e.cap), caption: 'entries in the cap, never raised' },
    { figure: worstCaseOdds(e), caption: 'worst-case odds with one entry' },
  ];
  if (compliance.noRollover) stats.push({ figure: 'One winner', caption: 'guaranteed, no rollover' });
  stats.push(
    { figure: 'Free by post', caption: 'identical odds, same cap' },
    { figure: percent(e.charity.shareOfGross), caption: `of entry sales to ${e.destination} causes` },
  );
  return stats;
}

export function StatStrip() {
  const stats = statsFor(escape);
  return (
    <section id="facts" className="scroll-mt-24 px-6 py-20 md:px-10 md:py-28" aria-label="The draw in figures">
      <ScrollReveal className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-8 xl:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.figure} data-reveal>
            <p className="font-mono text-[2rem] leading-none whitespace-nowrap md:text-[1.75rem] 2xl:text-[2rem]">{stat.figure}</p>
            <p className="mt-3 text-[15px] leading-snug text-ink/70">{stat.caption}</p>
          </div>
        ))}
      </ScrollReveal>
      <p className="mt-14 text-lg md:mt-16">
        <Link href={`/escapes/${escape.slug}#odds`} className="underline decoration-ink/30 decoration-1 underline-offset-8 hover:decoration-ink">
          See the {escape.destination} escape.
        </Link>
      </p>
    </section>
  );
}
