import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How it works',
  description: 'Enter, we draw, you escape. The cap, the odds and the free postal route, in plain words.',
  alternates: { canonical: '/how-it-works' },
};

import { RoutePlaceholder } from '@/components/RoutePlaceholder';

export default function Page() {
  return <RoutePlaceholder route="/how-it-works" />;
}
