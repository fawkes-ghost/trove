import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { compliance } from '@/config/prize';
import { freePostalRoute } from '@/lib/routes';
import { gatePassphrase } from '@/lib/gate';
import { Wordmark, wordmarkSource } from '@/components/brand/Marks';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';
import { WaitlistForm } from '@/components/waitlist/WaitlistForm';
import { signposting } from '@/lib/routes';
import { holdingShareCopy } from '@/lib/share';

export const dynamic = 'force-dynamic';

// The description travels with every shared link to the holding page (Instagram, WhatsApp,
// Messages), so it carries no figure: prize value, cap, odds and share are under review.
const description = 'Win a luxury escape in the UK. A fixed number of entries so you know your chances before you enter, and free entry by post.';

export const metadata: Metadata = {
  title: 'Trove',
  description,
  openGraph: { title: 'Trove', description },
  twitter: { title: 'Trove', description },
  robots: { index: false, follow: false },
};

// The page every gated route renders while GATE_PASSPHRASE is set, and the primary
// conversion surface until launch: the marks, the kicker, one headline, how Trove works,
// the waitlist form, the compliance strip. It states no figure and names no destination:
// prize value, cap, odds and charity share are under review, and social posts send
// people here. When the numbers are signed off the facts can read from config again. Snow, no film, no navigation, no link
// beyond what the strip carries. proxy.ts rewrites here; with the gate off this route does
// not exist.
export default function HoldingPage() {
  if (!gatePassphrase()) notFound();

  const [first, second] = compliance.dcmsVoluntaryCode.signposting;
  const headline = 'Win a luxury escape, and know your chances before you enter.';

  const facts = [
    'Every draw has a fixed number of entries that never changes, so you know your chances before you enter.',
    'Part of every paid entry goes to charities where the escape is, and we publish what we gave after every draw.',
    ...(compliance.noRollover ? ['One winner is guaranteed.'] : []),
  ];

  return (
    <main className="grid min-h-svh grid-rows-[auto_1fr_auto] px-6 md:px-10">
      <div className="flex items-center gap-[10px] py-5" aria-label="Trove">
        <Wordmark height={28} />
      </div>

      <div className="flex flex-col justify-center py-12 md:py-16">
        <div className="max-w-[40rem]">
          <p className="text-sm font-medium text-ink/70">Your chance to win an escape.</p>
          <h1 className="display mt-4 text-balance text-[2rem] md:text-[2.75rem]">{headline}</h1>
          <ul className="mt-8 flex flex-col" data-facts>
            {facts.map((fact) => (
              <li key={fact} className="rule-t py-3 text-lg">
                {fact}
              </li>
            ))}
            <li className="rule-t py-3 text-lg">
              You can enter free by post, with the same chance of winning.{' '}
              <a href={freePostalRoute} className="underline underline-offset-4">
                How to enter by post
              </a>
              .
            </li>
            <li className="rule-t py-3 text-lg">Founding friends hear first when entries open.</li>
          </ul>
          <div className="mt-10 rule-t pt-8">
            <p className="text-lg font-medium">Be a founding friend.</p>
            <div className="mt-4">
              <WaitlistForm sourceChannel="trove-holding" wordmarkSvg={wordmarkSource()} share={holdingShareCopy()} />
            </div>
          </div>
        </div>
      </div>

      <div className="rule-t py-3">
        <ComplianceStrip className="text-ink/75" />
        <p className="mt-2 text-[11px] leading-relaxed text-ink/75" data-signposting>
          Please play responsibly. Support from{' '}
          <a href={signposting[first]} rel="noopener" className="underline underline-offset-4">
            {first}
          </a>{' '}
          and{' '}
          <a href={signposting[second]} rel="noopener" className="underline underline-offset-4">
            {second}
          </a>
          .{' '}
          <a href="/legal/playing-responsibly" className="underline underline-offset-4">
            Playing responsibly
          </a>
          .
        </p>
      </div>
    </main>
  );
}
