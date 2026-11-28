import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

// Any address the site does not have. It renders outside app/(site), so it brings the header
// and footer itself, and it speaks in the site's voice rather than the framework's default.
export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="page">
          <div className="max-w-[40rem]">
            <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">We can’t find that page.</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              The link may be missing a letter, or the page may have moved. The first escape, and the list to hear the morning entries open, are both on the home page.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link href="/" className="btn inline-flex h-12 items-center bg-accent px-6 text-base font-medium text-ink">
                Back to the home page
              </Link>
              <Link href="/how-it-works" className="link-quiet">
                How it works
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
