import type { Metadata } from 'next';
import Link from 'next/link';
import { compliance, escape, worstCaseOdds } from '@/config/prize';
import { count } from '@/lib/format';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';

export const metadata: Metadata = {
  title: 'Free entry by post',
  description: 'How to enter every Trove draw for free by post, with identical odds inside the same cap.',
  alternates: { canonical: '/free-entry-by-post' },
};

// The free postal route, plain and complete: what to write, where to send it, one postcard
// one entry, identical odds inside the same cap, when the route closes, and the limit that
// counts paid and postal together. Every figure is read from config.
export default function FreeEntryByPostPage() {
  const address = compliance.freePostalRoute.address;
  return (
    <main>
      <section className="px-6 pt-28 pb-16 md:px-10 md:pt-36 md:pb-24">
        <div className="max-w-[40rem]">
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">Free entry by post.</h1>
          <p className="mt-6 text-lg">
            No purchase is necessary. Anyone aged {compliance.minimumAge} or over and resident in the {compliance.residency} can enter any Trove draw for free by post. A postcard is one entry, with identical odds to a paid entry, inside the same cap.
          </p>
        </div>
      </section>

      <section className="px-6 pb-8 md:px-10">
        <div className="max-w-[40rem]">
          <Block title="What to write.">
            <p>On a postcard, in block capitals, write:</p>
            <ul className="mt-3 flex list-disc flex-col gap-2 pl-6">
              <li>your full name,</li>
              <li>your email address,</li>
              <li>your date of birth,</li>
              <li>the name of the escape: the {escape.destination} escape.</li>
            </ul>
            <p className="mt-3">One postcard per envelope. A postcard without all four is not a valid entry, and we cannot contact you about it.</p>
          </Block>

          <Block title="Where to send it.">
            {address ? (
              <p className="whitespace-pre-line">{address}</p>
            ) : (
              <p data-placeholder="address">The address is published here as soon as the registered office exists. Until then the postal route is not yet open, and no postcard sent elsewhere counts.</p>
            )}
          </Block>

          <Block title="One postcard, one entry.">
            <p>
              Each valid postcard is one entry. It is given a number in the ledger and enters the draw inside the same cap of {count(escape.cap)} as every paid entry, with exactly the same chance of being drawn. The worst-case odds for any single entry, if every entry is taken, are {worstCaseOdds(escape)}.
            </p>
          </Block>

          <Block title="When the route closes.">
            <p>
              The postal route closes when the cap is reached or on the longstop date we publish when entries open, whichever comes first, and never earlier. A postcard that arrives after the close is not entered. Allow time for the post.
            </p>
          </Block>

          <Block title="The limit.">
            <p>
              The most any one person can hold in a draw is {count(escape.entry.maxPerPerson)} entries, paid and postal together. Postcards beyond the limit are not entered.
            </p>
          </Block>

          <Block title="Questions.">
            <p>
              The{' '}
              <Link href="/legal/terms" className="underline underline-offset-4">
                full terms
              </Link>{' '}
              set out the postal route in detail, and the{' '}
              <Link href={`/escapes/${escape.slug}`} className="underline underline-offset-4">
                {escape.destination} escape page
              </Link>{' '}
              shows the ledger and the odds. Anything else, write to us from the{' '}
              <Link href="/contact" className="underline underline-offset-4">
                contact page
              </Link>
              .
            </p>
          </Block>
        </div>
      </section>

      <section className="border-t border-ink/15 px-6 py-6 md:px-10">
        <ComplianceStrip className="text-ink/75" />
      </section>
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-ink/15 py-8">
      <h2 className="display text-[1.75rem] leading-tight md:text-[2.25rem]">{title}</h2>
      <div className="mt-3 text-lg">{children}</div>
    </div>
  );
}
