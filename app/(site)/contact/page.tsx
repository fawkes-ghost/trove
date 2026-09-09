import type { Metadata } from 'next';
import { compliance } from '@/config/prize';
import { contactEmail } from '@/lib/site';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'How to reach Trove: email, postal address and response time.',
  alternates: { canonical: '/contact' },
};

// Email, postal address and response time. The address reads the same one config field the
// postal route uses, so it appears the day the registered office exists.
export default function ContactPage() {
  const address = compliance.freePostalRoute.address;
  return (
    <main>
      <section className="page">
        <div className="max-w-[40rem]">
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">Contact.</h1>
          <dl className="mt-10 flex flex-col">
            <div className="border-t border-ink/15 py-6">
              <dt className="text-sm font-medium text-ink/70">Email</dt>
              <dd className="mt-2 text-lg">
                <a href={`mailto:${contactEmail}`} className="underline underline-offset-4">
                  {contactEmail}
                </a>
              </dd>
            </div>
            <div className="border-t border-ink/15 py-6">
              <dt className="text-sm font-medium text-ink/70">Post</dt>
              <dd className="mt-2 text-lg">
                {address ? (
                  <p className="whitespace-pre-line">{address}</p>
                ) : (
                  <p data-placeholder="address">The postal address is published here as soon as the registered office exists.</p>
                )}
              </dd>
            </div>
            <div className="border-t border-ink/15 py-6">
              <dt className="text-sm font-medium text-ink/70">Response time</dt>
              <dd className="mt-2 text-lg" data-placeholder="copy">
                To be confirmed by the founder before launch.
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="section-strip border-t border-ink/15">
        <ComplianceStrip className="text-ink/75" />
      </section>
    </main>
  );
}
