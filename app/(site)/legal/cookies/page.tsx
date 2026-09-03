import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookies',
  description: 'The one analytics cookie Trove sets, and only after consent.',
  alternates: { canonical: '/legal/cookies' },
};

import { RoutePlaceholder } from '@/components/RoutePlaceholder';

export default function Page() {
  return <RoutePlaceholder route="/legal/cookies" />;
}
