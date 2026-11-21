import type { Metadata } from 'next';
import Document from '@/content/legal/cookies.mdx';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { headingsOf } from '@/lib/legal';
import { draftLabel, launch } from '@/config/launch';

export const metadata: Metadata = {
  title: 'Cookies',
  description: 'What Trove stores in your browser, and the analytics cookies it sets only if you say yes.',
  alternates: { canonical: '/legal/cookies' },
};

// The document lives in content/legal/cookies.mdx. Draft until the terms are signed off.
export default function Page() {
  return (
    <LegalDocument title="Cookies." updated={launch.termsInForce ? undefined : draftLabel} headings={headingsOf('cookies.mdx')}>
      <Document />
    </LegalDocument>
  );
}
