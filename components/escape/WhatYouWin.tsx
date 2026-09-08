import Link from 'next/link';
import type { Escape } from '@/config/prize';
import { gbp } from '@/lib/format';

// The three parts of the prize in a row: the stay, the transfers, the cash. Each has a
// still slot, labelled with the poster's alt until the licensed stills land. The cash is
// the one accent figure on the page and appears once. The cash alternative is a single
// sentence linking to the terms, where the amount lives.
export function WhatYouWin({ escape }: { escape: Escape }) {
  const { prize, media } = escape;
  // config orders the description as the stay, the transfers, the cash; the first two
  // render as lines and the cash as the figure.
  const [stay, transfers] = prize.description;
  const parts = [
    { key: 'stay', line: stay, note: null },
    { key: 'transfers', line: transfers, note: 'Booked and paid for by us, not exchangeable for cash.' },
    { key: 'cash', figure: gbp(prize.cash), line: 'in cash', note: 'Paid to the winner, to spend on the escape or not.' },
  ];
  return (
    <section id="what-you-win" className="border-t border-ink/15 px-6 py-24 md:px-10 md:py-32">
      <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">What you win.</h2>
      <p className="mt-6 max-w-[40rem] text-lg" data-answer>
        A {gbp(prize.value)} prize in three parts: the stay, the transfers and the cash.
      </p>
      <ul className="mt-12 grid max-w-[64rem] gap-10 md:grid-cols-3 md:gap-8">
        {parts.map((part) => (
          <li key={part.key} className="flex flex-col">
            <StillSlot label={media.posterAlt} />
            {'figure' in part ? (
              <p className="mt-6 font-mono text-[2.25rem] leading-none text-accent md:text-[2.75rem]">{part.figure}</p>
            ) : null}
            <p className={'figure' in part ? 'mt-2 text-lg' : 'mt-6 text-lg'}>{part.line}</p>
            {part.note ? <p className="mt-2 text-base text-ink/70">{part.note}</p> : null}
          </li>
        ))}
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
