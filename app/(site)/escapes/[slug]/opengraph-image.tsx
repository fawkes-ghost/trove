import { escapes, getEscape } from '@/lib/escapes';
import { escape as fallback } from '@/config/prize';
import { shareCard, shareCardSize } from '@/lib/share-card';

export const alt = 'Trove. The escape, the prize and the published odds.';
export const size = shareCardSize;
export const contentType = 'image/png';

export function generateStaticParams() {
  return escapes.map((item) => ({ slug: item.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return shareCard(getEscape(slug) ?? fallback);
}
