import { escape as hampshire, type Escape } from '@/config/prize';
import { percent } from '@/lib/format';
import { OddsField } from '@/components/field/OddsField';
import { FieldMotion } from '@/components/field/FieldMotion';

// A hundred marks, one for every pound, and the giving share of them turn moss one after
// another. The share and the statement beneath come from config.
export function GivingSection({ escape = hampshire }: { escape?: Escape }) {
  // Per cent, so a hundred marks; the share lights that many of them.
  const marks = 100;
  const lit = Math.round(escape.charity.shareOfGross * marks);
  return (
    <section id="giving" className="border-t border-ink/15 px-6 py-16 md:px-10 md:py-32">
      <FieldMotion steps={[lit]} stagger className="grid gap-10 md:grid-cols-[minmax(0,32rem)_minmax(0,32rem)] md:items-center md:gap-16">
        <OddsField entries={marks} cap={marks} lit={lit} tone="moss" columns={{ desktop: 20, mobile: 10 }} label={`${marks} marks, one for every pound entered, with ${lit} in moss.`} />
        <div>
          <p className="font-mono text-[3rem] leading-none text-moss md:text-[4rem]">{percent(escape.charity.shareOfGross)}</p>
          <p className="mt-6 text-lg">{escape.charity.localityStatement}</p>
        </div>
      </FieldMotion>
    </section>
  );
}
