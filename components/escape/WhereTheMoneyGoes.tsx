import type { Escape } from '@/config/prize';

// Moss section. The share as pence in the pound, the locality statement from config, and
// no charity named until counsel has cleared the agreement.
export function WhereTheMoneyGoes({ escape }: { escape: Escape }) {
  const pence = Math.round(escape.charity.shareOfGross * 100);
  return (
    <section id="where-the-money-goes" className="bg-moss px-6 py-24 text-snow md:px-10 md:py-32">
      <div className="max-w-[40rem]">
        <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">Where the money goes.</h2>
        <p className="mt-10 font-mono text-[4rem] leading-none md:text-[6rem]">{pence}p</p>
        <p className="mt-3 text-base text-snow/80">in every pound of entry sales</p>
        <p className="mt-8 text-lg">{escape.charity.localityStatement}</p>
        <p className="mt-4 text-base text-snow/80">
          {escape.charity.beneficiary
            ? `The partner is ${escape.charity.beneficiary}.`
            : 'The partner is named once the agreement is signed.'}
        </p>
      </div>
    </section>
  );
}
