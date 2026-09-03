import { compliance, economics, escape, oddsForEntries, worstCaseOdds, type Escape } from '@/config/prize';
import { count, gbp, numberWord } from '@/lib/format';

type Claim = { figure: string; sentence: string };

// Five claims, each a figure from config with one sentence beneath it. A single column of
// prose: the figure in Fraunces at display size, the sentence in Geist. No cards, no icons.
function claimsFor(e: Escape): Claim[] {
  const largest = e.entry.bundles[e.entry.bundles.length - 1];
  const pence = Math.round(economics.charityShareOfGross * 100);
  return [
    {
      figure: worstCaseOdds(e),
      sentence: 'Your worst-case odds with one entry, if every entry in the cap is taken.',
    },
    {
      figure: count(e.cap),
      sentence: `Entries in the cap, paid and postal together. When the cap is reached the draw closes${compliance.noRollover ? ', and one winner is guaranteed' : ''}.`,
    },
    {
      figure: oddsForEntries(largest.entries, e),
      sentence: `Your odds with ${numberWord(largest.entries)} entries. Fewer entries taken means better odds for everyone in the draw.`,
    },
    {
      figure: gbp(e.prize.value),
      sentence: `The prize: ${e.prize.description[0].charAt(0).toLowerCase()}${e.prize.description[0].slice(1)}, and ${gbp(e.prize.cash)} in cash paid to you.`,
    },
    {
      figure: `${pence}p`,
      sentence: `In every pound of entry sales goes to community and countryside causes in ${e.destination}.`,
    },
  ];
}

export function Proposition() {
  return (
    <section id="proposition" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-36">
      <div className="max-w-[40rem]">
        <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">Your chance is real.</h2>
        <p className="mt-6 text-lg">One prize, one winner, a cap on entries and the odds in plain sight.</p>
        <div className="mt-14 flex flex-col gap-12 md:mt-20 md:gap-16">
          {claimsFor(escape).map((claim) => (
            <div key={claim.figure}>
              <p className="display text-[3rem] leading-none md:text-[4.5rem]">{claim.figure}</p>
              <p className="mt-4 max-w-[34rem] text-lg text-ink/80">{claim.sentence}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
