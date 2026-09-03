import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ConfirmPlace } from '@/components/confirm/ConfirmPlace';

export const metadata: Metadata = {
  title: 'Confirm your place',
  robots: { index: false, follow: false },
};

// The page a founding friend lands on from the confirmation email. Reads the token from
// the query string and does nothing until the button is pressed.
export default function ConfirmPage() {
  return (
    <main className="min-h-[70svh] px-6 pt-28 pb-24 md:px-10">
      <Suspense fallback={null}>
        <ConfirmPlace />
      </Suspense>
    </main>
  );
}
