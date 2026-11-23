import type { Metadata } from 'next';
import { organisation } from '@/config/organisation';
import { contactEmail } from '@/lib/site';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'How to get in touch with Trove by email or post, and how quickly we reply.',
  alternates: { canonical: '/contact' },
};

// Email, postal address and response time. The address is the registered office from
// config/organisation.ts.
export default function ContactPage() {
  const office = organisation.address;
  const address = office && organisation.legalName ? [organisation.legalName, office.streetAddress, office.addressLocality, office.postalCode].join('\n') : null;
  return (
    <main>
      <section className="page">
        <div className="max-w-[40rem]">
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">Contact.</h1>
          <dl className="mt-10 flex flex-col">
            <div className="rule-t py-6">
              <dt className="text-sm font-medium text-ink/70">Email</dt>
              <dd className="mt-2 text-lg">
                <a href={`mailto:${contactEmail}`} className="underline underline-offset-4">
                  {contactEmail}
                </a>
              </dd>
            </div>
            <div className="rule-t py-6">
              <dt className="text-sm font-medium text-ink/70">Post</dt>
              <dd className="mt-2 text-lg">
                {address ? (
                  <p className="whitespace-pre-line">{address}</p>
                ) : (
                  <p data-placeholder="address">The postal address is published here before entries open.</p>
                )}
              </dd>
            </div>
            <div className="rule-t py-6">
              <dt className="text-sm font-medium text-ink/70">Response time</dt>
              <dd className="mt-2 text-lg" data-placeholder="copy">
                We reply within two working days.
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="rule-t section-strip">
        <ComplianceStrip className="text-ink/75" />
      </section>
    </main>
  );
}
