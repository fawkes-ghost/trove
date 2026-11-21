import { draftLabel, launch } from '@/config/launch';
import type { Metadata } from 'next';
import Document from '@/content/legal/significant-conditions.mdx';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { headingsOf } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Significant conditions',
  description: 'The key terms of every Trove draw on one page: who can enter, the prize, your chances, free entry by post and how the winner is chosen.',
  alternates: { canonical: '/legal/significant-conditions' },
};

// The document lives in content/legal/significant-conditions.mdx and every figure in it comes from config.
export default function Page() {
  return (
    <LegalDocument title="Significant conditions." updated={launch.termsInForce ? undefined : draftLabel} headings={headingsOf('significant-conditions.mdx')}>
      <Document />
    </LegalDocument>
  );
}
