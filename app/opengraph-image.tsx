import { escape } from '@/config/prize';
import { gatePassphrase } from '@/lib/gate';
import { logoCard, shareCard, shareCardSize } from '@/lib/share-card';
import { escapeTitle } from '@/lib/escapes';

// While the gate is on, every link resolves to the holding page, which states no figure,
// so the card and its alt text carry none either.
const gated = Boolean(gatePassphrase());

export const alt = gated ? 'Trove' : `Trove. ${escapeTitle(escape)}. The escape, the prize and the published odds.`;
export const size = shareCardSize;
export const contentType = 'image/png';

// Card design of 28 November 2026 (quiet register). Editing this file changes the image's
// URL hash, which makes WhatsApp and other apps fetch the new card instead of a cached one.
// Open: the home page shares the open escape's card, because on a social feed the prize is the point.
export default function Image() {
  return gated ? logoCard() : shareCard(escape);
}
