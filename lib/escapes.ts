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

export function venueLine(e: Escape): string {
  return e.venue.name && e.venue.permissionGranted ? e.venue.name : 'one of England’s finest country houses';
}

// The stills the reel may show: every licensed still, but no venue still until the venue's
// footage is licensed. Returns values only, for the client-side reel.
export function reelStills(e: Escape): { src: string; alt: string; title: string | null; caption: string | null }[] {
  return e.media.stills.filter((still) => !still.venue || e.venue.footageLicensed).map(({ src, alt, title, caption }) => ({ src, alt, title, caption }));
}
