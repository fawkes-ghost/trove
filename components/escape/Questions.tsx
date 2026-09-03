import type { ReactNode } from 'react';
import { compliance, economics, oddsForEntries, worstCaseOdds, type Escape } from '@/config/prize';
import { count, gbp, numberWord, sentenceCase } from '@/lib/format';

type Question = { question: string; answer: ReactNode };

// Nine questions answered plainly. Every figure is read from config or computed from it;
// no number is typed in the copy.
function questionsFor(escape: Escape): Question[] {
  const { prize } = escape;
  const bundles = escape.entry.bundles.filter((bundle) => bundle.entries > 1);
  const bundleOdds = bundles
    .map((bundle, index) => `${index === 0 ? sentenceCase(numberWord(bundle.entries)) : numberWord(bundle.entries)} entries give you ${oddsForEntries(bundle.entries, escape)}`)
    .join(', and ');
  const pence = Math.round(economics.charityShareOfGross * 100);

  return [
    {
      question: 'Who can enter?',
      answer: (
        <p>
          You need to be {compliance.minimumAge} or over and resident in the {compliance.residency}. People who work for Trove, and their households, cannot enter.
        </p>
      ),
    },
    {
      question: 'How do I enter?',
      answer: (
        <p>
          Choose how many entries you would like and pay online, or enter for free by post. Every entry, paid or postal, goes into the same ledger with the same odds.
        </p>
      ),
    },
    {
      question: 'What are my odds?',
      answer: (
        <p>
          The worst-case odds are {worstCaseOdds(escape)}. That is your chance with one entry if every entry in the cap is taken. Fewer entries taken means better odds. {bundleOdds}.
        </p>
      ),
    },
    {
      question: 'What exactly do I win?',
      answer: (
        <>
          <ul className="flex flex-col gap-1">
            {prize.description.map((line) => (
              <li key={line}>{line}.</li>
            ))}
          </ul>
          <p className="mt-3">
            The escape is for {numberWord(escape.party)} people and the cash is paid to you to spend as you choose. The venue is named as soon as we have their written permission to do so.
          </p>
        </>
      ),
    },
    {
      question: 'What if I would rather have the cash?',
      answer: (
        <p>
          You can choose a cash alternative of {gbp(prize.cashAlternative)} instead of the escape. You have {prize.claimWindowDays} days from the draw to choose. The escape itself can be taken within {prize.stayValidMonths} months, subject to availability and the blackout dates in the terms.
        </p>
      ),
    },
    {
      question: 'When does the draw close?',
      answer: (
        <p>
          Entries close when the cap of {count(escape.cap)} is reached, or on the longstop date we publish when entries open, whichever comes first. We never extend a closing date.
        </p>
      ),
    },
    {
      question: 'How is the winner chosen?',
      answer: (
        <p>
          One entry is drawn at random from every entry in the ledger, paid and postal together. We publish the winning entry number and how it was drawn on the result page.
          {compliance.noRollover ? ' One winner is guaranteed.' : null}
        </p>
      ),
    },
    {
      question: 'Where does the money go?',
      answer: (
        <p>
          {sentenceCase(numberWord(pence))} pence in every pound of entry sales goes to community and countryside causes in {escape.destination}. We name the partner as soon as the agreement is signed, and we publish what was given after every draw.
        </p>
      ),
    },
    {
      question: 'Can I enter for free?',
      answer: (
        <p>
          Yes. Send a postcard as described on the free entry by post page. Each postcard is one entry, counted inside the same cap with identical odds to a paid entry.
        </p>
      ),
    },
  ];
}

export function Questions({ escape }: { escape: Escape }) {
  return (
    <section id="questions" className="border-t border-ink/15 px-6 py-24 md:px-10 md:py-32">
      <div className="max-w-[40rem]">
        <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">Questions.</h2>
        <dl className="mt-10 flex flex-col">
          {questionsFor(escape).map(({ question, answer }) => (
            <div key={question} className="border-t border-ink/15 py-6">
              <dt className="text-lg font-medium">{question}</dt>
              <dd className="mt-3 text-base text-ink/80">{answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
