import { compliance, oddsForEntries, type Escape } from '@/config/prize';
import { numberWord, sentenceCase } from '@/lib/format';
import { venueLine } from '@/lib/escapes';

// Structured data for the escape as an Event with one Offer per bundle. Every value comes
// from config. Dates appear only once they are set, and are never moved later.
export function EscapeJsonLd({ escape, url }: { escape: Escape; url: string }) {
  const availability = escape.status === 'open' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `The ${escape.destination} escape`,
    description: `${escape.prize.description.join('. ')}. A stay at ${venueLine(escape)}. ${escape.charity.localityStatement}`,
    url,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    ...(escape.cadence.opens ? { startDate: escape.cadence.opens } : {}),
    ...(escape.cadence.longstop ? { endDate: escape.cadence.longstop } : {}),
    location: {
      '@type': 'Place',
      name: escape.destination,
      address: { '@type': 'PostalAddress', addressRegion: escape.destination, addressCountry: 'GB' },
    },
    organizer: { '@type': 'Organization', name: 'Trove' },
    typicalAgeRange: `${compliance.minimumAge}-`,
    offers: escape.entry.bundles.map((bundle) => ({
      '@type': 'Offer',
      name: `${sentenceCase(numberWord(bundle.entries))} ${bundle.entries === 1 ? 'entry' : 'entries'}`,
      description: `Worst-case odds ${oddsForEntries(bundle.entries, escape)}`,
      price: bundle.price,
      priceCurrency: 'GBP',
      availability,
      url: `${url}#enter`,
      eligibleRegion: { '@type': 'Country', name: escape.destination ? 'GB' : 'GB' },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
