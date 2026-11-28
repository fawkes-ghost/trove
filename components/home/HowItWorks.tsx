import Link from 'next/link';
import { numberWord, sentenceCase } from '@/lib/format';
import { freePostalRoute } from '@/lib/routes';

// Three steps, in order. The first thing a visitor from a social feed asks is "how does
// this work, and is it real", so the answer is three ruled columns of plain words: a step,
// a short title in the serif, one short sentence. No cards and no badges. Three beats only:
// the proof (cap, guarantee, publishing) is in How we keep it fair, the odds in the field.
export function HowItWorks() {
  const steps = [
    {
      title: 'Choose your entries.',
      body: (
        <>
          Pay online, or{' '}
          <Link href={freePostalRoute} className="link-quiet">
            enter free by post
          </Link>
          .
        </>
      ),
    },
    {
      title: 'We draw one winner.',
      body: (
        <>
          When the entries are gone, or on the closing date, we pick one at random.
        </>
      ),
    },
    { title: 'You escape.', body: <>We send you dates to choose from, and the rest is yours.</> },
  ];
  return (
    <section id="how-it-works" className="section">
      <h2 data-reveal="item" className="display text-balance heading-section">How it works.</h2>
      <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
        {steps.map((step, index) => (
          <li key={step.title} className="rule-t flex flex-col gap-3 pt-6">
            <span className="text-sm font-medium text-ink/60">{sentenceCase(numberWord(index + 1))}.</span>
            <p className="display text-[1.625rem] leading-tight md:text-[1.875rem]">{step.title}</p>
            <p className="max-w-[26rem] text-base text-ink/80">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
