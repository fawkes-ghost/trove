import { oddsForEntries, type Escape } from '@/config/prize';
import { count, gbp, gbpPence, numberWord, sentenceCase } from '@/lib/format';
import { freePostalRoute } from '@/lib/routes';
import { EntryChooser } from './EntryChooser';
import { entryFlowAvailable, entryFlowIsPreview } from '@/lib/entry-flow';

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
    causes: `${gbpPence(bundle.price * escape.charity.shareOfGross)} goes to charities in ${escape.destination}`,
  }));
  return (
    <section id="enter" className="rule-t section">
      <div className="max-w-[64rem]">
        <h2 data-reveal="item" className="display text-balance text-[2.5rem] leading-[1] md:text-[4rem]">Enter.</h2>
        <p className="mt-6 max-w-[40rem] text-lg" data-answer>
          One entry is {gbp(escape.entry.price)}, or {escape.entry.bundles.filter((b) => b.entries > 1).map((b) => `${numberWord(b.entries)} for ${gbp(b.price)}`).join(' or ')}. Or enter free by post.
        </p>
        <EntryChooser
          options={options}
          open={open}
          flow={entryFlowAvailable() ? { href: `/escapes/${escape.slug}/enter`, preview: entryFlowIsPreview() } : null}
          postal={{
            href: freePostalRoute,
            line: `Send us a postcard. Same chance of winning as a paid entry, and part of the same ${count(escape.cap)}.`,
          }}
        />
      </div>
    </section>
  );
}
