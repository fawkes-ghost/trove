import Link from 'next/link';
import { compliance, type Escape } from '@/config/prize';
import { count } from '@/lib/format';
import { freePostalRoute } from '@/lib/routes';

// One paragraph and the link. Free postal entries count inside the same cap with identical odds.
export function PostalEntry({ escape }: { escape: Escape }) {
  return (
    <section id="free-entry-by-post" className="rule-t section">
      <div className="max-w-[40rem]">
        <h2 data-reveal="item" className="display text-balance text-[2.5rem] leading-[1] md:text-[4rem]">Free entry by post.</h2>
        <p className="mt-6 text-lg">
          If you’re {compliance.minimumAge} or over and live in the {compliance.residency}, you can enter free by sending a postcard. Each postcard is one entry, with the same chance as a paid one, and postal entries close at the same moment as paid ones.{' '}
          <Link href={freePostalRoute} className="underline underline-offset-4">
            How to enter by post
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
