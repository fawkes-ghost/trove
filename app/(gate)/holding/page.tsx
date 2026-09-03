import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { economics } from '@/config/prize';
import { numberWord, sentenceCase } from '@/lib/format';
import { gatePassphrase } from '@/lib/gate';
import { Icon, Wordmark } from '@/components/brand/Marks';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';
import { WaitlistForm } from '@/components/waitlist/WaitlistForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Trove',
  robots: { index: false, follow: false },
};

// The page every gated route renders while GATE_PASSPHRASE is set: the marks, one line,
// the waitlist form, the compliance strip. Snow, no film, no menu. proxy.ts rewrites here;
// with the gate off this route does not exist.
export default function HoldingPage() {
  if (!gatePassphrase()) notFound();

  const pence = Math.round(economics.charityShareOfGross * 100);
  const line = `A UK prize draw for escapes. ${sentenceCase(numberWord(pence))} pence in every pound goes to community and countryside causes.`;

  return (
    <main className="grid min-h-svh grid-rows-[auto_1fr_auto] px-6 md:px-10">
      <div className="flex items-center gap-[10px] py-5" aria-label="Trove">
        <Icon height={28} />
        <Wordmark height={22} />
      </div>

      <div className="flex flex-col justify-center py-12 md:py-16">
        <div className="max-w-[40rem]">
          <h1 className="display text-balance text-[2rem] md:text-[2.75rem]">{line}</h1>
          <div className="mt-10">
            <WaitlistForm sourceChannel="trove-holding" />
          </div>
        </div>
      </div>

      <div className="border-t border-ink/15 py-3">
        <ComplianceStrip className="text-ink/75" />
      </div>
    </main>
  );
}
