import { draftLabel, launch } from '@/config/launch';
import type { Metadata } from 'next';
import Document from '@/content/legal/playing-responsibly.mdx';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { headingsOf } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Playing responsibly',
  description: 'Set a spending limit, take a break or close your account, and where to get free support.',
  alternates: { canonical: '/legal/playing-responsibly' },
};

// The document lives in content/legal/playing-responsibly.mdx and every figure in it comes from config.
export default function Page() {
  return (
    <LegalDocument title="Playing responsibly." updated={launch.termsInForce ? undefined : draftLabel} headings={headingsOf('playing-responsibly.mdx')}>
      <Document />
    </LegalDocument>
  );
}
