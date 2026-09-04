import type { Metadata } from 'next';
import Document from '@/content/legal/playing-responsibly.mdx';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { headingsOf } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Playing responsibly',
  description: 'Limits, suspension and closure, and where to find support.',
  alternates: { canonical: '/legal/playing-responsibly' },
};

// The document lives in content/legal/playing-responsibly.mdx and every figure in it comes from config.
export default function Page() {
  return (
    <LegalDocument title="Playing responsibly." updated="Draft for solicitor review. Not yet in force." headings={headingsOf('playing-responsibly.mdx')}>
      <Document />
    </LegalDocument>
  );
}
