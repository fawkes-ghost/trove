import type { Escape } from '@/config/prize';
import { percent } from '@/lib/format';

// Moss section. The locality statement from config, the share as a percentage, and no
// charity named until counsel has cleared the agreement.
export function WhereTheMoneyGoes({ escape }: { escape: Escape }) {
  return (
    <section id="where-the-money-goes" className="section bg-moss text-snow">
      <div className="max-w-[40rem]">
        <h2 data-reveal="item" className="display text-balance heading-section">Where the money goes.</h2>
        <p className="mt-6 text-lg" data-answer>{escape.charity.localityStatement}</p>
        <p className="figure mt-10 text-[4rem] md:text-[6rem]">{percent(escape.charity.shareOfGross)}</p>
        <p className="mt-3 text-base text-snow/80">of every paid entry, however many sell.</p>
        <p className="mt-4 text-base text-snow/80">
          {escape.charity.beneficiary
            ? `The money goes to ${escape.charity.beneficiary}.`
            : 'We’ll name the charities once our agreement with them is signed.'}
        </p>
      </div>
    </section>
  );
}
