import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { compliance, oddsForEntries } from '@/config/prize';
import { count, gbp, gbpPence, numberWord, percent, sentenceCase } from '@/lib/format';
import { escapeName, escapeTitle, getEscape } from '@/lib/escapes';
import { freePostalRoute, signposting } from '@/lib/routes';
import { entryFlowAvailable, entryFlowIsPreview } from '@/lib/entry-flow';
import { EntryFlow, type FlowOption } from '@/components/entry/EntryFlow';
import { shareCopy } from '@/lib/share';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getEscape(slug);
  return {
    title: item ? `Enter ${escapeName(item)}` : 'Enter',
    robots: { index: false, follow: false },
  };
}

// The entry flow: choose, about you (which is also the account), check and pay, then the
// confirmation. Built from the "Trove entry flow" design. Every string with a figure is made
// here from config and handed to the client as a value. It takes no payment and writes
// nothing: the payment provider and the account backend are not connected yet, and the
// route does not exist on the live site until config/launch.ts turns it on.
export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ entries?: string }> }) {
  if (!entryFlowAvailable()) notFound();
  const { slug } = await params;
  const item = getEscape(slug);
  if (!item) notFound();
  const { entries } = await searchParams;

  const options: FlowOption[] = item.entry.bundles.map((bundle) => ({
    entries: bundle.entries,
    label: `${sentenceCase(numberWord(bundle.entries))} ${bundle.entries === 1 ? 'entry' : 'entries'}`,
    price: gbp(bundle.price),
    odds: oddsForEntries(bundle.entries, item),
    causes: gbpPence(bundle.price * item.charity.shareOfGross),
  }));
  const start = Math.max(0, options.findIndex((option) => String(option.entries) === entries));
  const [first, second] = compliance.dcmsVoluntaryCode.signposting;

  return (
    <EntryFlow
      preview={entryFlowIsPreview()}
      escapeHref={`/escapes/${item.slug}`}
      destination={escapeTitle(item)}
      options={options}
      start={start}
      facts={{
        cap: count(item.cap),
        maxPerPerson: count(item.entry.maxPerPerson),
        share: percent(item.charity.shareOfGross),
        creditCardCap: gbp(compliance.dcmsVoluntaryCode.creditCardMonthlyCap),
        minimumAge: compliance.minimumAge,
        residency: compliance.residency,
      }}
      share={shareCopy(item, `/escapes/${item.slug}`)}
      links={{
        postal: freePostalRoute,
        keyTerms: compliance.significantConditionsPath,
        terms: '/legal/terms',
        privacy: '/legal/privacy',
        playingResponsibly: '/legal/playing-responsibly',
        signposting: [
          { label: first, href: signposting[first] },
          { label: second, href: signposting[second] },
        ],
      }}
    />
  );
}
