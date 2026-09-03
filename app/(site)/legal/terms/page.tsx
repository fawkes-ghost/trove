import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'The full terms of every Trove draw.',
  alternates: { canonical: '/legal/terms' },
};

import { RoutePlaceholder } from '@/components/RoutePlaceholder';

export default function Page() {
  return <RoutePlaceholder route="/legal/terms" />;
}
