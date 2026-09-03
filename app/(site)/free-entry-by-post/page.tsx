import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free entry by post',
  description: 'How to enter every Trove draw for free by post, with identical odds inside the same cap.',
  alternates: { canonical: '/free-entry-by-post' },
};

import { RoutePlaceholder } from '@/components/RoutePlaceholder';

export default function Page() {
  return <RoutePlaceholder route="/free-entry-by-post" />;
}
