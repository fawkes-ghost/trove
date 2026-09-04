import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playing responsibly',
  description: 'Limits, suspension and closure, and where to find support.',
  alternates: { canonical: '/legal/playing-responsibly' },
};

import { RoutePlaceholder } from '@/components/RoutePlaceholder';

export default function Page() {
  return <RoutePlaceholder route="/legal/playing-responsibly" />;
}
