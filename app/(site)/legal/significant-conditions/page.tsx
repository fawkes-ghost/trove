import type { Metadata } from 'next';
import Document from '@/content/legal/significant-conditions.mdx';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { headingsOf } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Significant conditions',
  description: 'The significant conditions of every Trove draw, one click from every promotional surface.',
  alternates: { canonical: '/legal/significant-conditions' },
};

// The document lives in content/legal/significant-conditions.mdx and every figure in it comes from config.
export default function Page() {
  return (
    <LegalDocument title="Significant conditions." updated="Draft for solicitor review. Not yet in force." headings={headingsOf('significant-conditions.mdx')}>
      <Document />
    </LegalDocument>
  );
}
