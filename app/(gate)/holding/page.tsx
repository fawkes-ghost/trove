import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { compliance } from '@/config/prize';
import { freePostalRoute } from '@/lib/routes';
import { gatePassphrase } from '@/lib/gate';
import { Icon, Wordmark, iconSource } from '@/components/brand/Marks';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';
import { WaitlistForm } from '@/components/waitlist/WaitlistForm';
import { signposting } from '@/lib/routes';

export const dynamic = 'force-dynamic';

// The description travels with every shared link to the holding page (Instagram, WhatsApp,
// Messages), so it carries no figure: prize value, cap, odds and share are under review.
const description = 'A UK prize draw for escapes, with a fixed cap on entries, odds published before you enter, and free entry by post.';

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
  const headline = 'A UK prize draw for escapes, with the odds published before you enter.';

  const facts = [
    'Every draw has a fixed cap on entries, paid and postal together. It never moves, so you know your worst-case odds before you enter.',
    'A share of every paid entry goes to causes where the escape is. We publish what was given after every draw.',
    ...(compliance.noRollover ? ['One winner is guaranteed.'] : []),
  ];

  return (
    <main className="grid min-h-svh grid-rows-[auto_1fr_auto] px-6 md:px-10">
      <div className="flex items-center gap-[10px] py-5" aria-label="Trove">
        <Icon height={28} />
        <Wordmark height={22} />
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
              Free entry by post, with identical odds, inside the same cap.{' '}
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
              <WaitlistForm sourceChannel="trove-holding" iconSvg={iconSource()} />
            </div>
          </div>
        </div>
      </div>

      <div className="rule-t py-3">
        <ComplianceStrip className="text-ink/75" />
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink/75" data-signposting>
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
