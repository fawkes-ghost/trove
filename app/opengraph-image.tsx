import { escape } from '@/config/prize';
import { gatePassphrase } from '@/lib/gate';
import { logoCard, shareCard, shareCardSize } from '@/lib/share-card';

// While the gate is on, every link resolves to the holding page, which states no figure,
// so the card and its alt text carry none either.
const gated = Boolean(gatePassphrase());

export const alt = gated ? 'Trove' : `Trove. ${escape.destination}. The escape, the prize and the published odds.`;
export const size = shareCardSize;
export const contentType = 'image/png';

// Open: the home page shares the open escape's card, because on a social feed the prize is the point.
export default function Image() {
  return gated ? logoCard() : shareCard(escape);
}
