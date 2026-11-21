import type { Metadata } from 'next';
import Link from 'next/link';
import { compliance, escape, worstCaseOdds } from '@/config/prize';
import { count } from '@/lib/format';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';

export const metadata: Metadata = {
  title: 'Free entry by post',
  description: 'You can enter any Trove draw free by sending a postcard. Here is what to write, where to send it, and when it must arrive. Same chance of winning as a paid entry.',
  alternates: { canonical: '/free-entry-by-post' },
};

// The free postal route, plain and complete: what to write, where to send it, one postcard
// one entry, identical odds inside the same cap, when the route closes, and the limit that
// counts paid and postal together. Every figure is read from config.
export default function FreeEntryByPostPage() {
  const address = compliance.freePostalRoute.address;
  return (
    <main>
      <section className="page-head">
        <div className="max-w-[40rem]">
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">Free entry by post.</h1>
          <p className="mt-6 text-lg">
            You don’t have to pay to enter. If you’re {compliance.minimumAge} or over and live in the {compliance.residency}, you can enter any Trove draw by sending us a postcard. Each postcard is one entry, with exactly the same chance of winning as a paid one.
          </p>
        </div>
      </section>

      <section className="page-body">
        <div className="max-w-[40rem]">
          <Block title="What to write.">
            <p>On a postcard, in capital letters, write:</p>
            <ul className="mt-3 flex list-disc flex-col gap-2 pl-6">
              <li>your full name,</li>
              <li>your email address,</li>
              <li>your date of birth,</li>
              <li>the name of the escape: the {escape.destination} escape.</li>
            </ul>
            <p className="mt-3">Send one postcard per envelope. If any of the four is missing, the postcard can’t be entered and we won’t be able to tell you.</p>
          </Block>

          <Block title="Where to send it.">
            {address ? (
              <>
                <p className="whitespace-pre-line">{address}</p>
                {escape.status !== 'open' ? (
                  <p className="mt-3">Postal entries open on the same day as paid entries. A postcard that arrives before then won’t count, so please wait until entries open before you send it.</p>
                ) : null}
              </>
            ) : (
              <p data-placeholder="address">The address is published here before entries open. Until then the postal route is not yet open, and no postcard sent elsewhere counts.</p>
            )}
          </Block>

          <Block title="One postcard, one entry.">
            <p>
              Each postcard is one entry and gets its own entry number. It counts towards the same {count(escape.cap)} entries as the paid ones and has exactly the same chance of being drawn: at least {worstCaseOdds(escape)}.
            </p>
          </Block>

          <Block title="When it must arrive.">
            <p>
              Postal entries close at the same moment as paid ones: when all {count(escape.cap)} entries have gone, or on the closing date we publish when entries open, whichever comes first. A postcard that arrives after that won’t count, so allow time for the post.
            </p>
          </Block>

          <Block title="How many you can send.">
            <p>
              Each person can have up to {count(escape.entry.maxPerPerson)} entries in a draw, paid and postal together. Postcards over that number won’t count.
            </p>
          </Block>

          <Block title="Questions.">
            <p>
              <Link href="/legal/terms" className="underline underline-offset-4">
                Terms
              </Link>{' '}
              explain postal entry in full, and the{' '}
              <Link href={`/escapes/${escape.slug}`} className="underline underline-offset-4">
                {escape.destination} escape page
              </Link>{' '}
              works out your chances. For anything else, get in touch through the{' '}
              <Link href="/contact" className="underline underline-offset-4">
                contact page
              </Link>
              .
            </p>
          </Block>
        </div>
      </section>

      <section className="rule-t section-strip">
        <ComplianceStrip className="text-ink/75" />
      </section>
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rule-t py-8">
      <h2 className="display text-[1.75rem] leading-tight md:text-[2.25rem]">{title}</h2>
      <div className="mt-3 text-lg">{children}</div>
    </div>
  );
}
