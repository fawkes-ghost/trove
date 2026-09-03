import { oddsForEntries, type Escape } from '@/config/prize';
import { count, gbp, numberWord, sentenceCase } from '@/lib/format';
import { OddsCalculator } from './OddsCalculator';

// Each bundle with its own worst-case odds against the cap, odds before price, and a
// small calculator. Every figure comes from config or is computed from it.
export function OddsLadder({ escape }: { escape: Escape }) {
  return (
    <section id="odds" className="border-t border-ink/15 px-6 py-24 md:px-10 md:py-32">
      <div className="max-w-[52rem]">
        <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">The odds.</h2>
        <p className="mt-6 max-w-[40rem] text-lg">
          Worst-case odds assume every one of the {count(escape.cap)} entries in the cap is taken. Fewer entries sold means better odds for everyone in the draw.
        </p>
        <ol className="mt-10 flex flex-col">
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
          <OddsCalculator escape={escape} />
        </div>
      </div>
    </section>
  );
}
