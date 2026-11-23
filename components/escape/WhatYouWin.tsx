import Link from 'next/link';
import type { Escape } from '@/config/prize';
import { gbp } from '@/lib/format';

// The prize, set out the way a hotel confirms a booking: the heading and one sentence on the
// left, the matter on the right. The two parts of the prize stand side by side with a rule
// between them, the stay in words and the cash as a figure, then the conditions as a ruled
// list: when the stay is taken, the cash alternative and its amount, the prize in all. No
// cards and no picture here; the photographs belong to the place, in the next section.
// Every figure is read from config.
export function WhatYouWin({ escape }: { escape: Escape }) {
  const { prize } = escape;
  // config orders the description as the stay, then the cash.
  const [stay] = prize.description;
  const rows: { term: string; detail: React.ReactNode }[] = [
    { term: 'When', detail: `The stay is taken ${prize.stayWindow}.` },
    {
      term: 'Or instead',
      detail: (
        <>
          {gbp(prize.cashAlternative)} in cash instead of the escape, if you would rather.{' '}
          <Link href="/legal/terms" className="link-quiet">
            Terms
          </Link>
          .
        </>
      ),
    },
    { term: 'In all', detail: `A ${gbp(prize.value)} prize.` },
  ];
  return (
    <section id="what-you-win" className="section">
      <div className="split">
        <div data-reveal="group">
          <h2 className="display heading-section text-balance">What you win.</h2>
          <p className="mt-6 max-w-[26rem] text-lg" data-answer>
            A {gbp(prize.value)} prize: the stay, and cash on top.
          </p>
        </div>
        <div className="max-w-[52rem]">
          <div className="rule-t grid md:grid-cols-2">
            <div className="py-8 md:pr-10">
              <p className="text-sm font-medium text-ink/60">The stay</p>
              <p className="display mt-4 text-balance text-[1.75rem] leading-[1.1] md:text-[2.125rem]">{stay}.</p>
            </div>
            <div className="rule-t py-8 md:rule-t-0 md:rule-l md:pl-10">
              <p className="text-sm font-medium text-ink/60">The cash</p>
              <p className="display mt-4 whitespace-nowrap text-[3rem] md:text-[3.5rem]">{gbp(prize.cash)}</p>
              <p className="mt-3 text-base text-ink/80">Yours to spend on the trip, or on anything else.</p>
            </div>
          </div>
          <dl className="rule-b">
            {rows.map((row) => (
              <div key={row.term} className="rule-t grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 py-4 text-base">
                <dt className="text-ink/60">{row.term}</dt>
                <dd>{row.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
