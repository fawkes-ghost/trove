import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How Trove handles personal data.',
  alternates: { canonical: '/legal/privacy' },
};

import { RoutePlaceholder } from '@/components/RoutePlaceholder';

export default function Page() {
  return (
    <>
      <RoutePlaceholder route="/legal/privacy" />
      <section className="px-6 pb-16 md:px-10">
        <p className="max-w-[40rem] text-base">
          When you join the waitlist we record how you arrived at the site: the campaign tags in the link you followed, the page that referred you and the page you landed on. Nothing is recorded until you submit the form.
        </p>
      </section>
    </>
  );
}
