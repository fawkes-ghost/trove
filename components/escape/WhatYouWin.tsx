import Link from 'next/link';
import type { Escape } from '@/config/prize';
import { gbp } from '@/lib/format';
import { reelStills } from '@/lib/escapes';

// The two parts of the prize side by side: the stay and the cash. The stay carries the
// first still the escape may show (never a venue still until the footage is licensed); the
// cash is a figure on cloud, because a picture of money says nothing. The cash alternative
// is a single sentence linking to the terms, where the amount lives.
export function WhatYouWin({ escape }: { escape: Escape }) {
  const { prize } = escape;
  // config orders the description as the stay, then the cash.
  const [stay] = prize.description;
  const [still] = reelStills(escape);
  return (
    <section id="what-you-win" className="rule-t section">
      <h2 data-reveal="item" className="display text-balance heading-section">What you win.</h2>
      <p className="mt-6 max-w-[40rem] text-lg" data-answer>
        A {gbp(prize.value)} prize: the stay, and cash on top.
      </p>
      <ul className="mt-10 grid max-w-[64rem] gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-6">
        <li className="relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl bg-loch text-snow">
          {still ? <img src={still.src} alt={still.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" /> : null}
          <div className="relative bg-[linear-gradient(180deg,#14252000_0%,#142520CC_70%)] p-6 pt-20 md:p-8 md:pt-24">
            <p className="text-sm font-medium text-snow/80">The stay</p>
            <p className="display mt-2 text-balance text-[1.75rem] leading-tight md:text-[2.25rem]">{stay}.</p>
          </div>
        </li>
        <li className="flex min-h-[16rem] flex-col justify-between rounded-3xl bg-cloud p-6 md:p-8">
          <p className="text-sm font-medium text-ink/70">The cash</p>
          <div>
            <p className="display whitespace-nowrap text-[3.5rem] leading-none md:text-[clamp(3.25rem,6.6vw,4.5rem)]">{gbp(prize.cash)}</p>
            <p className="mt-3 text-lg">Yours to spend on the trip, or on anything else.</p>
          </div>
        </li>
      </ul>
      <p className="mt-8 text-base">
        Rather have cash instead of the stay? You can.{' '}
        <Link href="/legal/terms" className="underline underline-offset-4">
          Terms
        </Link>
        .
      </p>
    </section>
  );
}
