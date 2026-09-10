import Link from 'next/link';
import { missionGivingLine, missionGivingShare, missionKicker, missionStatement } from '@/lib/mission';
import { Kicker } from '@/components/site/Kicker';

// The mission as a panel on snow: a moss tint, a hairline, a soft corner. The kicker, the
// statement at display size, the giving line with its figure in moss, and the link to the
// founder's page. No reveal.
export function Mission() {
  return (
    <section id="mission" className="section">
      <div className="rounded-xl border border-ink/15 bg-moss/10 p-8 md:p-14" data-reveal="item">
        <Kicker>{missionKicker}</Kicker>
        <p className="display mt-6 max-w-[44rem] text-balance text-[1.75rem] md:text-[2.5rem]">{missionStatement}</p>
        <p className="mt-8 max-w-[40rem] text-lg">
          <span className="font-mono text-moss">{missionGivingShare}</span> {missionGivingLine}
        </p>
        <p className="mt-8 text-base">
          <Link href="/why" className="underline decoration-ink/30 decoration-1 underline-offset-8 hover:decoration-ink">
            Why Trove exists.
          </Link>
        </p>
      </div>
    </section>
  );
}
