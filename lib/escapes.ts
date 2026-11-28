import { escape, type Escape } from '@/config/prize';
import { gbp, numberWord, sentenceCase } from '@/lib/format';

// Every escape the site knows about. One hero escape at a time; the list grows with the
// next destination. Draws are named by destination, never numbered.
export const escapes: Escape[] = [escape];

export function getEscape(slug: string): Escape | null {
  return escapes.find((item) => item.slug === slug) ?? null;
}

// The status as a sentence for the index. Open, drawn, closed, or coming.
export function statusLabel(status: Escape['status']): string {
  switch (status) {
    case 'open':
      return 'Entries are open.';
    case 'drawn':
      return 'This escape has been drawn.';
    case 'closed':
      return 'Entries have closed.';
    default:
      return 'Entries open soon.';
  }
}

// The prize in its short form, for the sticky bar.
export function prizeLineShort(e: Escape): string {
  return `${sentenceCase(numberWord(e.nights))} nights and ${gbp(e.prize.cash)} in cash. A ${gbp(e.prize.value)} prize.`;
}

// The prize in one line, for the hero, the escape card and the holding page.
export function prizeLine(e: Escape): string {
  return `${sentenceCase(numberWord(e.nights))} nights for you and your plus one, and ${gbp(e.prize.cash)} in cash. A ${gbp(e.prize.value)} prize.`;
}

// What the pages call an escape. While its place is unannounced (destinationPublic false) the
// site says "the country hotel escape" and never names where it is; once the founder makes
// the place public the same calls name the place. Every page reads these, so
// the switch is one line in config.
export function placeName(e: Escape): string {
  return e.destinationPublic ? e.destination : e.publicName;
}

// "The country hotel escape", capitalised for a heading or the start of a sentence.
export function escapeTitle(e: Escape): string {
  return `The ${placeName(e)} escape`;
}

// "the country hotel escape", for the middle of a sentence.
export function escapeName(e: Escape): string {
  return `the ${placeName(e)} escape`;
}

// Where the giving goes, in a few words: "local causes" until the place is public.
export function localCauses(e: Escape): string {
  return e.destinationPublic ? `causes in ${e.destination}` : 'local causes';
}

export function localCharities(e: Escape): string {
  return e.destinationPublic ? `charities in ${e.destination}` : 'local charities';
}

export function venueLine(e: Escape): string {
  return e.venue.name && e.venue.permissionGranted ? e.venue.name : 'one of England’s finest country hotels';
}

// The stills the pages may show: every licensed still, but no venue still until the venue's
// footage is licensed. Returns values only.
export function reelStills(e: Escape): { src: string; alt: string; title: string | null; caption: string | null; blur?: string }[] {
  return e.media.stills.filter((still) => !still.venue || e.venue.footageLicensed).map(({ src, alt, title, caption, blur }) => ({ src, alt, title, caption, blur }));
}

// The place in two short paragraphs, for the escape page and the home page's escape
// section, so the words are written once. They describe the countryside, not the county:
// the place stays unnamed until escape.destinationPublic is true.
export function countyProse(): string[] {
  return [
    'Our first escape is close to home. Winter there means chalk streams and short days: clear, cold rivers through the water meadows, and downs where you can see for miles.',
    'The villages still have their pubs and their fires, and lunch can take all afternoon.',
  ];
}
