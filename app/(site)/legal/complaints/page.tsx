import type { Metadata } from 'next';
import Document from '@/content/legal/complaints.mdx';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { headingsOf } from '@/lib/legal';
import { draftLabel, launch } from '@/config/launch';

export const metadata: Metadata = {
  title: 'Complaints',
  description: 'How to complain to Trove, how quickly we answer, and where to go if you are still unhappy.',
  alternates: { canonical: '/legal/complaints' },
};

// The document lives in content/legal/complaints.mdx. Draft until the terms are signed off.
export default function Page() {
  return (
    <LegalDocument title="Complaints." updated={launch.termsInForce ? undefined : draftLabel} headings={headingsOf('complaints.mdx')}>
      <Document />
    </LegalDocument>
  );
}
