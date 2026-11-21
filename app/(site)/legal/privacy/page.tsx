import type { Metadata } from 'next';
import Document from '@/content/legal/privacy.mdx';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { headingsOf } from '@/lib/legal';
import { draftLabel, launch } from '@/config/launch';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'What personal details Trove collects, why, who sees them, and your rights.',
  alternates: { canonical: '/legal/privacy' },
};

// The document lives in content/legal/privacy.mdx. Draft until the terms are signed off.
export default function Page() {
  return (
    <LegalDocument title="Privacy." updated={launch.termsInForce ? undefined : draftLabel} headings={headingsOf('privacy.mdx')}>
      <Document />
    </LegalDocument>
  );
}
