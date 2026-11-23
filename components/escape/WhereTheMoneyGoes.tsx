import type { Escape } from '@/config/prize';
import { percent } from '@/lib/format';

// The loch band. The heading and the locality statement from config on the left; on the
// right the share, in the heavy sans and in gold because it is a promise, and what it is a
// share of. No charity is named until counsel has cleared the agreement.
export function WhereTheMoneyGoes({ escape }: { escape: Escape }) {
  return (
    <section id="where-the-money-goes" className="section split bg-moss text-snow">
      <div data-reveal="group">
        <h2 className="display heading-section text-balance">Where the money goes.</h2>
        <p className="mt-6 max-w-[26rem] text-lg" data-answer>{escape.charity.localityStatement}</p>
      </div>
      <div className="max-w-[40rem]">
        <p className="figure text-[3.5rem] text-sun md:text-[4.5rem]">{percent(escape.charity.shareOfGross)}</p>
        <p className="mt-3 text-base text-snow/80">of every paid entry, however many sell.</p>
        {escape.charity.beneficiary ? <p className="mt-4 text-base text-snow/80">{`The money goes to ${escape.charity.beneficiary}.`}</p> : null}
      </div>
    </section>
  );
}
