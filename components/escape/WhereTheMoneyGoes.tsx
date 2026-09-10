import type { Escape } from '@/config/prize';
import { percent } from '@/lib/format';

// Moss section. The locality statement from config, the share as a percentage, and no
// charity named until counsel has cleared the agreement.
export function WhereTheMoneyGoes({ escape }: { escape: Escape }) {
  return (
    <section id="where-the-money-goes" className="section bg-moss text-snow">
      <div className="max-w-[40rem]">
        <h2 data-reveal="item" className="display text-balance text-[2rem] md:text-[2.75rem]">Where the money goes.</h2>
        <p className="mt-6 text-lg" data-answer>{escape.charity.localityStatement}</p>
        <p className="mt-10 font-mono text-[4rem] leading-none md:text-[6rem]">{percent(escape.charity.shareOfGross)}</p>
        <p className="mt-3 text-base text-snow/80">That share comes off every entry sold, however many are taken.</p>
        <p className="mt-4 text-base text-snow/80">
          {escape.charity.beneficiary
            ? `The partner is ${escape.charity.beneficiary}.`
            : 'The partner is named once the agreement is signed.'}
        </p>
      </div>
    </section>
  );
}
