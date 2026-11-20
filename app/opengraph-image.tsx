import { escape } from '@/config/prize';
import { shareCard, shareCardSize } from '@/lib/share-card';

export const alt = `Trove. ${escape.destination}. The escape, the prize and the published odds.`;
export const size = shareCardSize;
export const contentType = 'image/png';

// The home page shares the open escape's card: on a social feed the prize is the point.
export default function Image() {
  return shareCard(escape);
}
