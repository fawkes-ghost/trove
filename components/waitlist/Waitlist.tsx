import Link from 'next/link';
import { WaitlistForm } from './WaitlistForm';

// The waitlist section. The only call to action until entries open.
export function Waitlist() {
  return (
    <section id="waitlist" className="scroll-mt-24 border-t border-ink/15 px-6 py-24 md:px-10 md:py-32">
      <div className="max-w-[40rem]">
        <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">Be a founding friend.</h2>
        <div className="mt-8">
          <WaitlistForm />
        </div>
        <p className="mt-4 text-sm text-ink/70">
          Founding friends hear first when entries open. You can unsubscribe at any time.{' '}
          <Link href="/legal/privacy" className="underline underline-offset-4">
            Privacy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
