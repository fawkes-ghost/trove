import { escape, type Escape } from '@/config/prize';

// Every escape the site knows about. One hero escape at a time; the list grows with the
// next destination. Draws are named by destination, never numbered.
export const escapes: Escape[] = [escape];

export function getEscape(slug: string): Escape | null {
  return escapes.find((item) => item.slug === slug) ?? null;
}

// The word for the index and the page. Open, coming, or drawn.
export function statusLabel(status: Escape['status']): string {
  switch (status) {
    case 'open':
      return 'Open';
    case 'drawn':
      return 'Drawn';
    case 'closed':
      return 'Closed';
    default:
      return 'Coming';
  }
}

export function venueLine(e: Escape): string {
  return e.venue.name && e.venue.permissionGranted ? e.venue.name : 'one of England’s finest country houses';
}
