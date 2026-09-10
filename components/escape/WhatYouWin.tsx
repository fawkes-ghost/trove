import Link from 'next/link';
import type { Escape } from '@/config/prize';
import { gbp } from '@/lib/format';

// The two parts of the prize side by side: the stay and the cash. Each has a still slot,
// labelled with the poster's alt until the licensed stills land. The cash is the one accent
// figure on the page and appears once. The cash alternative is a single sentence linking to
// the terms, where the amount lives.
export function WhatYouWin({ escape }: { escape: Escape }) {
  const { prize, media } = escape;
  // config orders the description as the stay, then the cash; the stay renders as a line
  // and the cash as the figure.
  const [stay] = prize.description;
  return (
    <section id="what-you-win" className="rule-t section">
      <h2 data-reveal="item" className="display text-balance text-[2rem] md:text-[2.75rem]">What you win.</h2>
      <p className="mt-6 max-w-[40rem] text-lg" data-answer>
        A {gbp(prize.value)} prize in two parts: the stay and the cash.
      </p>
      <ul className="mt-12 grid max-w-[46rem] gap-10 md:grid-cols-2 md:gap-0">
        <li className="flex flex-col md:pr-8">
          <StillSlot label={media.posterAlt} />
          <p className="mt-6 text-lg">{stay}.</p>
        </li>
        <li className="flex flex-col md:rule-l md:pl-8">
          <StillSlot label={media.posterAlt} />
          <p className="mt-6 font-mono text-[2.25rem] leading-none text-accent md:text-[2.75rem]">{gbp(prize.cash)}</p>
          <p className="mt-2 text-lg">Paid to the winner in cash, to spend on the escape or not.</p>
        </li>
      </ul>
      <p className="mt-12 text-base">
        A cash alternative is available.{' '}
        <Link href="/legal/terms" className="underline underline-offset-4">
          Terms
        </Link>
        .
      </p>
    </section>
  );
}

// A 4:5 frame waiting for the licensed still; the label says what stands in for it.
function StillSlot({ label }: { label: string }) {
  return (
    <div className="flex aspect-[4/5] w-full items-end border border-ink/20 bg-ink/5 p-4" data-placeholder="image" role="img" aria-label={label}>
      <p className="font-mono text-[11px] text-ink/60">{label}</p>
    </div>
  );
}
