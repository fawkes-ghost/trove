import Link from 'next/link';
import { WaitlistForm } from './WaitlistForm';
import { wordmarkSource } from '@/components/brand/Marks';
import { Kicker } from '@/components/site/Kicker';
import { escape } from '@/config/prize';
import { shareCopy } from '@/lib/share';

// The founding friend section. The only call to action until entries open.
export function Waitlist() {
  return (
    <section id="waitlist" className="scroll-mt-24 rule-t section">
      <div className="max-w-[40rem]" data-reveal="group">
        <Kicker>Founding friends enter first.</Kicker>
        <h2 className="display mt-6 text-balance heading-section">Become a founding friend.</h2>
        <p className="mt-6 text-lg">
          We’ll email you once, on the day entries open. Founding friends can enter before anyone else.
        </p>
        <div className="mt-8">
          <WaitlistForm wordmarkSvg={wordmarkSource()} share={shareCopy(escape)} />
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
