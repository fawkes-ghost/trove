import { oddsForEntries, type Escape } from '@/config/prize';
import { count, gbp, gbpPence, numberWord, sentenceCase } from '@/lib/format';
import { freePostalRoute } from '@/lib/routes';
import { EntryChooser } from './EntryChooser';

// The entry decision. The answer sentence stays as plain text for search and answer
// engines; the choice itself is the chooser beneath it, with the free postal route given
// the same weight as the paid options. No strikethrough, no badge, no default to a bundle.
export function Enter({ escape }: { escape: Escape }) {
  const open = escape.status === 'open';
  const options = escape.entry.bundles.map((bundle) => ({
    entries: bundle.entries,
    label: `${sentenceCase(numberWord(bundle.entries))} ${bundle.entries === 1 ? 'entry' : 'entries'}`,
    price: gbp(bundle.price),
    odds: oddsForEntries(bundle.entries, escape),
    causes: `${gbpPence(bundle.price * escape.charity.shareOfGross)} to ${escape.destination} causes`,
  }));
  return (
    <section id="enter" className="rule-t section">
      <div className="max-w-[64rem]">
        <h2 data-reveal="item" className="display text-balance text-[2rem] md:text-[2.75rem]">Enter.</h2>
        <p className="mt-6 max-w-[40rem] text-lg" data-answer>
          A single entry is {gbp(escape.entry.price)}, and bundles are {escape.entry.bundles.filter((b) => b.entries > 1).map((b) => `${numberWord(b.entries)} for ${gbp(b.price)}`).join(' and ')}, paid online or free by post.
        </p>
        <EntryChooser
          options={options}
          open={open}
          postal={{
            href: freePostalRoute,
            line: `Send a postcard. Identical odds, inside the same cap of ${count(escape.cap)}.`,
          }}
        />
      </div>
    </section>
  );
}
