import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Complaints',
  description: 'How to complain and how Trove responds.',
  alternates: { canonical: '/legal/complaints' },
};

import { RoutePlaceholder } from '@/components/RoutePlaceholder';

export default function Page() {
  return <RoutePlaceholder route="/legal/complaints" />;
}
