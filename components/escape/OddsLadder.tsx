import { oddsForEntries, worstCaseOdds, type Escape } from '@/config/prize';
import { count, gbp, numberWord, sentenceCase } from '@/lib/format';
import { OddsCalculator } from './OddsCalculator';
import { Ledger } from '@/components/ledger/Ledger';
import { OddsField } from '@/components/field/OddsField';
import { FieldMotion } from '@/components/field/FieldMotion';

// The field first, one mark per entry with one lit, then the cap, each bundle with its own
// worst-case odds against it, and a calculator that lights as many marks as it is given.
// Every figure comes from config or is computed from it.
export function OddsLadder({ escape }: { escape: Escape }) {
  return (
    <section id="odds" className="section border-t border-ink/15">
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
        <ol className="mt-12 flex flex-col">
          {escape.entry.bundles.map((bundle) => (
            <li key={bundle.entries} className="grid items-baseline gap-2 border-t border-ink/15 py-5 md:grid-cols-[14rem_1fr]">
              <p className="font-mono text-[1.75rem] leading-none md:text-[2rem]">{oddsForEntries(bundle.entries, escape)}</p>
              <p className="text-base">
                {sentenceCase(numberWord(bundle.entries))} {bundle.entries === 1 ? 'entry' : 'entries'} for {gbp(bundle.price)}.
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-12 border-t border-ink/15 pt-8">
          <OddsCalculator cap={escape.cap} maxPerPerson={escape.entry.maxPerPerson} fieldId="odds-field" />
        </div>
      </div>
    </section>
  );
}
