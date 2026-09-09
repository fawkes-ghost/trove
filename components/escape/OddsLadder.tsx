import { oddsForEntries, worstCaseOdds, type Escape } from '@/config/prize';
import { count, numberWord } from '@/lib/format';
import { OddsCalculator } from './OddsCalculator';
import { Ledger } from '@/components/ledger/Ledger';
import { OddsField } from '@/components/field/OddsField';
import { FieldMotion } from '@/components/field/FieldMotion';

// The field first, one mark per entry with one lit, then the cap, then the ladder and the
// calculator as one: hover or tap a tier, or type a number, and the cost, the odds, the
// giving and the lit marks follow. Every figure comes from config or is computed from it.
export function OddsLadder({ escape }: { escape: Escape }) {
  return (
    <section id="odds" className="rule-t section">
      <div className="max-w-[52rem]">
        <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">Your odds.</h2>
        <p className="mt-6 max-w-[40rem] text-lg" data-answer>
          Worst-case odds are {worstCaseOdds(escape)} with one entry{escape.entry.bundles.filter((b) => b.entries > 1).map((b) => `, ${oddsForEntries(b.entries, escape)} with ${numberWord(b.entries)}`).join('')}.
        </p>
        <p className="mt-4 max-w-[40rem] text-lg">
          Worst-case odds assume every one of the {count(escape.cap)} entries in the cap is taken. Fewer entries sold means better odds for everyone in the draw.
        </p>
        <FieldMotion steps={[1]} className="mt-12 max-w-[40rem]">
          <OddsField id="odds-field" entries={escape.cap} cap={escape.cap} lit={1} maxLit={escape.entry.maxPerPerson} />
        </FieldMotion>
        <div className="mt-12">
          <Ledger escape={escape} />
        </div>
        <div className="mt-12">
          <OddsCalculator
            cap={escape.cap}
            maxPerPerson={escape.entry.maxPerPerson}
            price={escape.entry.price}
            bundles={escape.entry.bundles.map(({ entries, price }) => ({ entries, price }))}
            share={escape.charity.shareOfGross}
            destination={escape.destination}
            fieldId="odds-field"
          />
        </div>
      </div>
    </section>
  );
}
