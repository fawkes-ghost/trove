import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Destinations, winners and where the money went.',
  alternates: { canonical: '/journal' },
};

import { RoutePlaceholder } from '@/components/RoutePlaceholder';

export default function Page() {
  return <RoutePlaceholder route="/journal" />;
}
