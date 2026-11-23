import type { Metadata } from 'next';
import { Unsubscribe } from '@/components/unsubscribe/Unsubscribe';
import { contactEmail } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Unsubscribe',
  robots: { index: false, follow: false },
};

// The page the unsubscribe link in a Trove email lands on. The handle-email-unsubscribe edge
// function redirects a plain visit here, because only a press of the button may unsubscribe:
// mail scanners follow links, they do not press buttons. The function checks this page is
// live by looking for data-unsubscribe-page in its HTML, so the attribute stays on <main>,
// in the server-rendered response.
export default function UnsubscribePage() {
  return (
    <main className="page min-h-[70svh]" data-unsubscribe-page>
      <Unsubscribe contactEmail={contactEmail} />
    </main>
  );
}
