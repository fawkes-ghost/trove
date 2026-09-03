import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Trove',
  description: 'Why Trove exists: a fair draw for a great English escape, and something left behind where it lands.',
  alternates: { canonical: '/why' },
};

import { RoutePlaceholder } from '@/components/RoutePlaceholder';

export default function Page() {
  return <RoutePlaceholder route="/why" />;
}
