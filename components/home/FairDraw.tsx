import Link from 'next/link';
import { compliance, escape as hampshire, worstCaseOdds, type Escape } from '@/config/prize';
import { count, percent } from '@/lib/format';
import { freePostalRoute, significantConditions } from '@/lib/routes';
import { localCauses } from '@/lib/escapes';

// How the draw is kept fair: the trust section. Trove has no awards or memberships to show
// yet, and what makes the draw fair is a short list of rules, so those are the credentials.
// Each row is a rule in the heavy sans, marked in gold, with what it means beside it. Every
// figure is read from config, and the guarantee shows only while there is no rollover. The
// company's details are in the footer, not here.
export function FairDraw({ escape = hampshire }: { escape?: Escape }) {
  const rows: { promise: string; meaning: React.ReactNode }[] = [
    {
      promise: count(escape.cap),
      meaning: 'entries, and never more. The draw closes when they’re gone, or on the closing date we publish when entries open, whichever comes first. We never move that date.',
    },
    {
      promise: worstCaseOdds(escape),
      meaning: 'is your chance with one entry if every entry sells. If fewer sell, your chance is better.',
    },
    ...(compliance.noRollover
      ? [
          {
            promise: 'One winner',
            meaning: 'every time. We draw one entry at random from all of them, paid and postal, and publish the winning number and how it was drawn.',
          },
        ]
      : []),
    {
      promise: 'Free by post',
      meaning: (
        <>
          A postcard is one entry, with the same chance of winning as a paid one.{' '}
          <Link href={freePostalRoute} className="link-quiet">
            How to enter free
          </Link>
          .
        </>
      ),
    },
    {
      promise: percent(escape.charity.shareOfGross),
      meaning: `of every paid entry goes to ${localCauses(escape)}. After every draw we publish exactly how much we gave.`,
    },
  ];

  return (
    <section id="fair-draw" className="section bg-cloud">
      <div className="sheet" data-reveal="item">
        <h2 className="display heading-section text-balance">How we keep it fair.</h2>
        <dl className="sheet-rows mt-10">
          {rows.map((row) => (
            <div key={row.promise}>
              <dt>
                <span className="figure figure-marked inline-block whitespace-nowrap">{row.promise}</span>
              </dt>
              <dd className="max-w-[36rem] text-base text-ink/80">{row.meaning}</dd>
            </div>
          ))}
        </dl>
        <p className="rule-t pt-8 text-base">
          <Link href={significantConditions} className="link-quiet">
            Read the key terms.
          </Link>
        </p>
      </div>
    </section>
  );
}
