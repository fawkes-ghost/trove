import Link from 'next/link';
import { escape } from '@/config/prize';
import { freePostalRoute } from '@/lib/routes';

// Three numbered steps, because it is literally a sequence. The postal route is linked
// from the first step; the full page from the end.
export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-ink/15 px-6 py-24 md:px-10 md:py-32">
      <div className="max-w-[40rem]">
        <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">How it works.</h2>
        <ol className="mt-10 flex flex-col">
          <Step number={1} title="Enter.">
            Choose how many entries you would like and pay online, or{' '}
            <Link href={freePostalRoute} className="underline underline-offset-4">
              enter for free by post
            </Link>
            .
          </Step>
          <Step number={2} title="We draw.">
            When the cap is reached or the longstop date passes, one entry is drawn at random from every entry in the ledger, paid and postal together.
          </Step>
          <Step number={3} title="You escape.">
            The winner chooses the escape or the cash alternative within {escape.prize.claimWindowDays} days, and we publish the result.
          </Step>
        </ol>
        <p className="mt-10 text-base">
          <Link href="/how-it-works" className="underline underline-offset-4">
            How it works in full
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <li className="grid gap-2 border-t border-ink/15 py-6 md:grid-cols-[3rem_1fr]">
      <p className="font-mono text-sm text-ink/60">{number}</p>
      <div>
        <h3 className="display text-[1.75rem] leading-tight md:text-[2rem]">{title}</h3>
        <p className="mt-2 text-lg">{children}</p>
      </div>
    </li>
  );
}
