import Link from 'next/link';
import { WaitlistForm } from './WaitlistForm';
import { iconSource } from '@/components/brand/Marks';
import { Kicker } from '@/components/site/Kicker';

// The founding friend section. The only call to action until entries open.
export function Waitlist() {
  return (
    <section id="waitlist" className="section scroll-mt-24 border-t border-ink/15">
      <div className="max-w-[40rem]">
        <Kicker>Founding friends enter first.</Kicker>
        <h2 className="display mt-6 text-balance text-[2rem] md:text-[2.75rem]">Become a founding friend.</h2>
        <p className="mt-6 text-lg">
          Founding friends are told the day entries open and can enter before the public. We send one email when that happens.
        </p>
        <div className="mt-8">
          <WaitlistForm iconSvg={iconSource()} />
        </div>
        <p className="mt-4 text-sm text-ink/70">
          You can unsubscribe at any time.{' '}
          <Link href="/legal/privacy" className="underline underline-offset-4">
            Privacy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
