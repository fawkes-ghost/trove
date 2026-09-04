import type { Metadata } from 'next';
import Document from '@/content/legal/terms.mdx';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { headingsOf } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'The full terms of every Trove draw.',
  alternates: { canonical: '/legal/terms' },
};

// The document lives in content/legal/terms.mdx and every figure in it comes from config.
export default function Page() {
  return (
    <LegalDocument title="Terms." updated="Draft for solicitor review. Not yet in force." headings={headingsOf('terms.mdx')}>
      <Document />
    </LegalDocument>
  );
}
