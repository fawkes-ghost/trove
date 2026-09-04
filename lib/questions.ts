import { compliance, economics, oddsForEntries, spendCeiling, worstCaseOdds, type Escape } from '@/config/prize';
import { count, gbp, numberWord, sentenceCase } from '@/lib/format';

export type Question = { question: string; answer: string };

// The ten questions and their answers, in plain text so the page and the FAQPage
// structured data read from one source. Every figure comes from config or is computed
// from it; no number is typed in the copy.
export function questionsFor(escape: Escape): Question[] {
  const { prize } = escape;
  const bundles = escape.entry.bundles.filter((bundle) => bundle.entries > 1);
  const bundleOdds = bundles
    .map((bundle, index) => `${index === 0 ? sentenceCase(numberWord(bundle.entries)) : numberWord(bundle.entries)} entries give you ${oddsForEntries(bundle.entries, escape)}`)
    .join(', and ');
  const pence = Math.round(economics.charityShareOfGross * 100);

  return [
    {
      question: 'Who can enter?',
      answer: `You need to be ${compliance.minimumAge} or over and resident in the ${compliance.residency}. People who work for Trove, and their households, cannot enter.`,
    },
    {
      question: 'How do I enter?',
      answer: 'Choose how many entries you would like and pay online, or enter for free by post. Every entry, paid or postal, goes into the same ledger with the same odds.',
    },
    {
      question: 'What are my odds?',
      answer: `The worst-case odds are ${worstCaseOdds(escape)}. That is your chance with one entry if every entry in the cap is taken. Fewer entries taken means better odds. ${bundleOdds}.`,
    },
    {
      question: 'What exactly do I win?',
      answer: `${prize.description.join('. ')}. The escape is for ${numberWord(escape.party)} people and the cash is paid to you to spend as you choose. The venue is named as soon as we have their written permission to do so.`,
    },
    {
      question: 'What if I would rather have the cash?',
      answer: `You can choose a cash alternative of ${gbp(prize.cashAlternative)} instead of the escape. You have ${prize.claimWindowDays} days from the draw to choose. The escape itself can be taken within ${prize.stayValidMonths} months, subject to availability and the blackout dates in the terms.`,
    },
    {
      question: 'When does the draw close?',
      answer: `Entries close when the cap of ${count(escape.cap)} is reached, or on the longstop date we publish when entries open, whichever comes first. We never extend a closing date.`,
    },
    {
      question: 'How is the winner chosen?',
      answer: `One entry is drawn at random from every entry in the ledger, paid and postal together. We publish the winning entry number and how it was drawn on the result page.${compliance.noRollover ? ' One winner is guaranteed.' : ''}`,
    },
    {
      question: 'Where does the money go?',
      answer: `${sentenceCase(numberWord(pence))} pence in every pound of entry sales goes to community and countryside causes in ${escape.destination}. We name the partner as soon as the agreement is signed, and we publish what was given after every draw.`,
    },
    {
      question: 'Is there a limit on entries?',
      answer: `Yes. The most any one person can hold in a draw is ${count(escape.entry.maxPerPerson)} entries, paid and postal together. At the single entry price that is a ceiling of ${gbp(spendCeiling(escape))} in a draw.`,
    },
    {
      question: 'Can I enter for free?',
      answer: 'Yes. Send a postcard as described on the free entry by post page. Each postcard is one entry, counted inside the same cap with identical odds to a paid entry.',
    },
  ];
}
