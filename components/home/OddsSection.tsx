import { escape as hampshire, oddsForEntries, type Escape } from '@/config/prize';
import { count, numberWord } from '@/lib/format';
import { OddsField } from '@/components/field/OddsField';
import { FieldMotion } from '@/components/field/FieldMotion';

// The field: one mark for every entry in the cap, one of them lit. As the visitor scrolls
// on, the marks for the larger bundles light in sequence and the matching line of the
// ladder comes to ink. Every figure is read from config; the field receives values only.
export function OddsSection({ escape = hampshire }: { escape?: Escape }) {
  const bundles = escape.entry.bundles;
  const steps = bundles.map((bundle) => bundle.entries);
  return (
    <section id="field" className="rule-t section">
      <FieldMotion steps={steps} className="grid gap-10 md:grid-cols-[minmax(0,40rem)_minmax(0,32rem)] md:items-start md:gap-0">
        <OddsField entries={escape.cap} cap={escape.cap} lit={steps[steps.length - 1]} steps={steps} />
        <div className="md:rule-l md:sticky md:top-28 md:pl-16">
          <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">
            {count(escape.cap)} entries. Never more. One of them is yours.
          </h2>
          <p className="mt-8 flex flex-col gap-2 font-mono text-base">
            {bundles.map((bundle, index) => (
              <span key={bundle.entries} data-ladder-step={index + 1} className="transition-colors duration-300">
                {oddsForEntries(bundle.entries, escape)} with {numberWord(bundle.entries)} {bundle.entries === 1 ? 'entry' : 'entries'}.
              </span>
            ))}
          </p>
        </div>
      </FieldMotion>
    </section>
  );
}
