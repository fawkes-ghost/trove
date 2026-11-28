import { oddsForEntries, worstCaseOdds, type Escape } from '@/config/prize';
import { count, numberWord } from '@/lib/format';
import { OddsCalculator } from './OddsCalculator';
import { Ledger } from '@/components/ledger/Ledger';
import { OddsField } from '@/components/field/OddsField';
import { FieldMotion } from '@/components/field/FieldMotion';
import { localCauses } from '@/lib/escapes';

// The chances, in two rows of the same two columns. First the words beside the field, one
// mark per entry with one lit. Then the cap beside the ladder and the calculator: hover or
// tap a tier, or type a number, and the cost, the odds, the giving and the lit marks follow.
// Every figure comes from config or is computed from it.
export function OddsLadder({ escape }: { escape: Escape }) {
  return (
    <section id="odds" className="rule-t section">
      <div className="split">
        <div data-reveal="group">
          <h2 className="display heading-section text-balance">Your chances.</h2>
          <p className="mt-6 max-w-[26rem] text-lg" data-answer>
            At least {worstCaseOdds(escape)} with one entry{escape.entry.bundles.filter((b) => b.entries > 1).map((b) => `, ${oddsForEntries(b.entries, escape)} with ${numberWord(b.entries)}`).join('')}.
          </p>
          <p className="mt-4 max-w-[26rem] text-base text-ink/80">
            Those are your chances if all {count(escape.cap)} entries sell. If fewer sell, everyone’s chance is better.
          </p>
        </div>
        <FieldMotion steps={[1]} className="max-w-[44rem]">
          <OddsField id="odds-field" entries={escape.cap} cap={escape.cap} lit={1} maxLit={escape.entry.maxPerPerson} />
        </FieldMotion>
      </div>
      <div className="split mt-16 md:mt-24">
        <Ledger escape={escape} />
        <div className="max-w-[52rem]">
          <OddsCalculator
            cap={escape.cap}
            maxPerPerson={escape.entry.maxPerPerson}
            price={escape.entry.price}
            bundles={escape.entry.bundles.map(({ entries, price }) => ({ entries, price }))}
            share={escape.charity.shareOfGross}
            destination={localCauses(escape)}
            fieldId="odds-field"
          />
        </div>
      </div>
    </section>
  );
}
