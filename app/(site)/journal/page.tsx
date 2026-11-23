import type { Metadata } from 'next';
import Link from 'next/link';
import { escape } from '@/config/prize';

// Not indexed and not in the menu until the first piece is written: an empty journal is
// not something to send search engines or visitors to.
export const metadata: Metadata = {
  title: 'Journal',
  description: 'Stories from each escape, every draw’s result, and where the money went.',
  alternates: { canonical: '/journal' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <main>
      <section className="page">
        <div className="max-w-[40rem]">
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">Journal.</h1>
          <p className="mt-6 text-lg">
            The journal starts with the first draw. We’ll write about each destination, publish every result and show where the money went.
          </p>
          <p className="rule-t mt-8 pt-6 text-base">
            Until then, read about{' '}
            <Link href={`/escapes/${escape.slug}`} className="underline underline-offset-4">
              the {escape.destination} escape
            </Link>{' '}
            or{' '}
            <Link href="/how-it-works" className="underline underline-offset-4">
              how it works
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
