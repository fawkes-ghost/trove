import Link from 'next/link';
import { compliance, escape as hampshire, type Escape } from '@/config/prize';
import { count } from '@/lib/format';
import { prizeLine } from '@/lib/escapes';
import { freePostalRoute } from '@/lib/routes';

// Three steps, numbered because they are literally a sequence. The first thing a visitor
// from a social feed asks is "how does this work, and is it real", so the answer sits
// straight under the odds. Every figure from config.
export function HowItWorks({ escape = hampshire }: { escape?: Escape }) {
  const steps = [
    {
      title: 'Choose your entries.',
      body: (
        <>
          Pay online, or{' '}
          <Link href={freePostalRoute} className="underline underline-offset-4">
            enter free by post
          </Link>
          . Same odds, same cap of {count(escape.cap)}.
        </>
      ),
    },
    {
      title: 'We draw one winner.',
      body: (
        <>
          When the cap is reached or at the longstop date, whichever comes first, one entry is drawn at random and the result is published.
          {compliance.noRollover ? ' One winner is guaranteed.' : ''}
        </>
      ),
    },
    { title: 'You escape.', body: <>{prizeLine(escape)}</> },
  ];
  return (
    <section id="how-it-works" className="section">
      <h2 data-reveal="item" className="display text-balance text-[2rem] md:text-[2.75rem]">How it works.</h2>
      <ol className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-3 rounded-3xl bg-cloud p-6 md:p-8">
            <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-loch text-base font-medium text-snow">
              {index + 1}
            </span>
            <p className="display text-[1.5rem] leading-tight md:text-[1.75rem]">{step.title}</p>
            <p className="text-base text-ink/80">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
