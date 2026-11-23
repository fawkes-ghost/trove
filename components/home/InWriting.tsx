import Link from 'next/link';
import { compliance, escape as hampshire, worstCaseOdds, type Escape } from '@/config/prize';
import { organisation } from '@/config/organisation';
import { launch } from '@/config/launch';
import { count, gbp, percent } from '@/lib/format';
import { freePostalRoute, significantConditions } from '@/lib/routes';
import { Wordmark } from '@/components/brand/Marks';

// The draw, in writing. Other travel companies borrow trust from awards and memberships;
// this one has none yet, and does not need to borrow: what makes the draw fair is a short
// list of undertakings, so they are set out like a letter on the company's headed paper and
// signed with its registered name and number. Each row is a promise in the heavy sans,
// marked in gold, and what it means in plain words. Every figure is read from config, the
// guarantee shows only while there is no rollover, and the sheet says so itself while the
// terms are still drafts.
export function InWriting({ escape = hampshire }: { escape?: Escape }) {
  const { legalName, companyNumber } = organisation;
  const rows: { promise: string; meaning: React.ReactNode }[] = [
    {
      promise: count(escape.cap),
      meaning: 'entries, and never more. The draw closes when they have gone, or on the closing date we publish when entries open, whichever comes first. We never move the closing date.',
    },
    {
      promise: worstCaseOdds(escape),
      meaning: 'your chance with one entry, at least. That’s if every entry sells. If fewer sell, your chance is better.',
    },
    ...(compliance.noRollover
      ? [
          {
            promise: 'One winner',
            meaning: 'drawn at random from all the entries, paid and postal. We publish the winning entry number and how it was drawn. There is always a winner.',
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
      meaning: `of every paid entry goes to causes in ${escape.destination}. After every draw we publish exactly how much we gave.`,
    },
    {
      promise: gbp(escape.prize.cashAlternative),
      meaning: 'in cash instead of the escape, if you would rather.',
    },
  ];

  return (
    <section id="in-writing" className="section bg-cloud">
      <div className="sheet" data-reveal="item">
        <Wordmark height={22} className="text-ink" />
        <h2 className="display heading-section mt-10 text-balance">The {escape.destination} draw, in writing.</h2>
        <p className="mt-6 max-w-[38rem] text-lg">What we promise about this draw, in plain words. The key terms say the same in full.</p>
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
        <div className="rule-t flex flex-col gap-4 pt-8 text-base">
          {legalName && companyNumber ? (
            <p>
              <span className="display text-[1.375rem] leading-tight">{legalName}.</span>
              <span className="mt-1 block text-sm text-ink/70">
                Registered in England and Wales, company number {companyNumber}.
              </span>
            </p>
          ) : null}
          <p className="flex flex-wrap gap-x-8 gap-y-3">
            <Link href={significantConditions} className="link-quiet">
              Read the key terms.
            </Link>
            {organisation.sameAs.companiesHouse ? (
              <a href={organisation.sameAs.companiesHouse} rel="noopener" className="link-quiet">
                Companies House record.
              </a>
            ) : null}
            {organisation.review ? (
              <a href={organisation.review.url} rel="noopener" className="link-quiet">
                {organisation.review.label}
              </a>
            ) : null}
          </p>
          {launch.termsInForce ? null : (
            <p className="text-sm text-ink/60">The terms, key terms and policies are drafts for solicitor review and are not yet in force.</p>
          )}
        </div>
      </div>
    </section>
  );
}
