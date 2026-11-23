import { compliance, oddsForEntries, spendCeiling, worstCaseOdds, type Escape } from '@/config/prize';
import { count, gbp, numberWord, sentenceCase } from '@/lib/format';

export type Question = { question: string; answer: string };

// The ten questions and their answers, as plain strings so the page and the FAQPage
// structured data read from one source. Every figure comes from config or is computed
// from it; no number is typed in the copy.
export function questionsFor(escape: Escape): Question[] {
  const { prize } = escape;
  const bundles = escape.entry.bundles.filter((bundle) => bundle.entries > 1);
  // "Three entries make that 1 in 1,000, and five make it 1 in 600."
  const bundleOdds = bundles
    .map((bundle, index) =>
      index === 0
        ? `${sentenceCase(numberWord(bundle.entries))} entries make that ${oddsForEntries(bundle.entries, escape)}`
        : `${numberWord(bundle.entries)} make it ${oddsForEntries(bundle.entries, escape)}`,
    )
    .join(', and ');

  return [
    {
      question: 'Who can enter?',
      answer: `Anyone ${compliance.minimumAge} or over who lives in the ${compliance.residency}. People who work for Trove, and the people they live with, can’t enter.`,
    },
    {
      question: 'How do I enter?',
      answer: 'Buy entries online, or send us a postcard to enter free. Both kinds of entry have exactly the same chance of winning.',
    },
    {
      question: 'What are my odds?',
      answer: `With one entry, at least ${worstCaseOdds(escape)}. That’s if every entry sells. If fewer sell, your chance is better. ${bundleOdds}.`,
    },
    {
      question: 'What exactly do I win?',
      answer: `${prize.description.join('. ')}. The escape is for ${numberWord(escape.party)}. The cash is yours to spend however you like. We’ll name the house as soon as it gives us written permission.`,
    },
    {
      question: 'Can I take cash instead?',
      answer: `Yes. Once you’ve replied to our email we send you at least ${numberWord(prize.datesOffered)} sets of dates, and you have ${prize.claimWindowDays} days to pick one or take the cash alternative. If you choose neither, you get the cash. The stay is taken within ${prize.stayValidMonths} months, on the dates you picked. The terms give the amount.`,
    },
    {
      question: 'When is the draw?',
      answer: `As soon as all ${count(escape.cap)} entries have gone, or on the closing date we publish when entries open, whichever comes first. We never move the closing date.`,
    },
    {
      question: 'How is the winner chosen?',
      answer: `We draw one entry at random from all the entries, paid and postal. Then we publish the winning entry number and how it was drawn.${compliance.noRollover ? ' There is always a winner.' : ''}`,
    },
    {
      question: 'Where does the money go?',
      answer: `${escape.charity.localityStatement} After every draw we publish exactly how much we gave.`,
    },
    {
      question: 'How many entries can I have?',
      answer: `Up to ${count(escape.entry.maxPerPerson)} in a draw, paid and postal together. That’s ${gbp(spendCeiling(escape))} at the single entry price.`,
    },
    {
      question: 'Can I enter for free?',
      answer: 'Yes. Send us a postcard: the free entry by post page says what to write. Each postcard is one entry, with the same chance of winning as a paid one.',
    },
  ];
}
