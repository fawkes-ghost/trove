import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { compliance, escape, worstCaseOdds } from '@/config/prize';
import { count } from '@/lib/format';
import { prizeLine } from '@/lib/escapes';
import { gatePassphrase } from '@/lib/gate';
import { Icon, Wordmark, iconSource } from '@/components/brand/Marks';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';
import { WaitlistForm } from '@/components/waitlist/WaitlistForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Trove',
  robots: { index: false, follow: false },
};

// The page every gated route renders while GATE_PASSPHRASE is set, and the primary
// conversion surface until launch: the marks, the kicker, one headline, the facts from
// config, the waitlist form, the compliance strip. Snow, no film, no navigation, no link
// beyond what the strip carries. proxy.ts rewrites here; with the gate off this route does
// not exist.
export default function HoldingPage() {
  if (!gatePassphrase()) notFound();

  const headline = `A UK prize draw for escapes. ${escape.charity.localityStatement}`;

  const facts = [
    prizeLine(escape),
    `Entries are capped at ${count(escape.cap)}, paid and postal together.`,
    `Worst-case odds of ${worstCaseOdds(escape)} with one entry.`,
    ...(compliance.noRollover ? ['One winner is guaranteed.'] : []),
    'Founding friends hear first when entries open.',
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
      </div>
    </main>
  );
}
