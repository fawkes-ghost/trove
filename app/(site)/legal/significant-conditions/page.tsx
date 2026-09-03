import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Significant conditions',
  description: 'The significant conditions of every Trove draw, one click from every promotional surface.',
  alternates: { canonical: '/legal/significant-conditions' },
};

import { RoutePlaceholder } from '@/components/RoutePlaceholder';

export default function Page() {
  return <RoutePlaceholder route="/legal/significant-conditions" />;
}
