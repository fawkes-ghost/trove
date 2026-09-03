import Link from 'next/link';
import { compliance, type Escape } from '@/config/prize';
import { count } from '@/lib/format';
import { freePostalRoute } from '@/lib/routes';

// One paragraph and the link. Free postal entries count inside the same cap with identical odds.
export function PostalEntry({ escape }: { escape: Escape }) {
  return (
    <section id="free-entry-by-post" className="border-t border-ink/15 px-6 py-24 md:px-10 md:py-32">
      <div className="max-w-[40rem]">
        <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">Free entry by post.</h2>
        <p className="mt-6 text-lg">
          Anyone aged {compliance.minimumAge} or over and resident in the {compliance.residency} can enter by post for free. Each postcard is one entry with identical odds inside the same cap of {count(escape.cap)}, and the route closes when the cap is reached or at the longstop date, never earlier.{' '}
          <Link href={freePostalRoute} className="underline underline-offset-4">
            How to enter by post
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
