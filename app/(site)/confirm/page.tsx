import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ConfirmPlace } from '@/components/confirm/ConfirmPlace';
import { iconSource } from '@/components/brand/Marks';

export const metadata: Metadata = {
  title: 'Confirm your place',
  robots: { index: false, follow: false },
};

// The page a founding friend lands on from the confirmation email. Reads the token from
// the query string and does nothing until the button is pressed.
export default function ConfirmPage() {
  return (
    <main className="page min-h-[70svh]">
      <Suspense fallback={null}>
        <ConfirmPlace iconSvg={iconSource()} />
      </Suspense>
    </main>
  );
}
