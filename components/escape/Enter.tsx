import { oddsForEntries, type Escape } from '@/config/prize';
import { count, gbp, gbpPence, numberWord, sentenceCase } from '@/lib/format';
import { freePostalRoute } from '@/lib/routes';
import { EntryChooser } from './EntryChooser';
import { entryFlowAvailable, entryFlowIsPreview } from '@/lib/entry-flow';
import { Wordmark } from '@/components/brand/Marks';
import { Signed } from '@/components/site/Signed';

// The entry decision, on the company's headed paper: the wordmark as a letterhead, the
// choice as ruled rows, one button, and the registered name and number at the foot. The
// answer sentence stays as plain text for search and answer engines. The free postal route
// is a row of the same weight as the paid ones. No strikethrough, no badge, no default to a
// bundle.
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
    <section id="enter" className="section bg-cloud">
      <div className="sheet" data-reveal="item">
        <Wordmark height={22} className="text-ink" />
        <h2 className="display heading-section mt-10 text-balance">Enter.</h2>
        <p className="mt-6 max-w-[38rem] text-lg" data-answer>
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
        <Signed className="mt-10" />
      </div>
    </section>
  );
}
