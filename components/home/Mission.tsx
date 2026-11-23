import Link from 'next/link';
import { missionGivingLine, missionGivingShare, missionKicker, missionStatement } from '@/lib/mission';
import { Kicker } from '@/components/site/Kicker';

// The mission as the one loch green block in the page. The kicker, the statement at
// display size, the giving line with its figure in sun, and the link to the
// founder's page. No reveal.
export function Mission() {
  return (
    <section id="mission" className="section bg-loch text-cloud">
      <div data-reveal="item">
        <Kicker tone="ink">{missionKicker}</Kicker>
        <p className="display mt-6 max-w-[44rem] text-balance text-[1.75rem] md:text-[2.5rem]">{missionStatement}</p>
        <p className="mt-8 max-w-[40rem] text-lg">
          <span className="font-mono text-sun">{missionGivingShare}</span> {missionGivingLine}
        </p>
        <p className="mt-8 text-base">
          <Link href="/why" className="underline decoration-cloud/40 decoration-1 underline-offset-8 hover:decoration-cloud">
            Why Trove exists.
          </Link>
        </p>
      </div>
    </section>
  );
}
