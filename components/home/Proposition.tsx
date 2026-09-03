import { compliance, economics, escape, oddsForEntries, worstCaseOdds, type Escape } from '@/config/prize';
import { count, numberWord, sentenceCase } from '@/lib/format';

type Claim = { lead: string; rest: string };

// Five claims in a single column of prose. The opening clause of each is set in Fraunces
// at display size, the rest in Geist beneath. Every figure is read from config or computed
// from the cap. No cards, no icons, no grid.
function claimsFor(e: Escape): Claim[] {
  const largest = e.entry.bundles[e.entry.bundles.length - 1];
  const pence = Math.round(economics.charityShareOfGross * 100);
  const claims: Claim[] = [
    {
      lead: `${count(e.cap)} entries.`,
      rest: 'That is the most that will ever be in this draw, paid and postal together.',
    },
    {
      lead: `${worstCaseOdds(e)}.`,
      rest: `Your odds with one entry if every entry is taken. If the draw closes early, they are better. ${sentenceCase(numberWord(largest.entries))} entries are ${oddsForEntries(largest.entries, e)}.`,
    },
  ];
  if (compliance.noRollover) {
    claims.push({
      lead: 'One winner is guaranteed.',
      rest: 'The draw happens when the cap is reached or on the published longstop date, whichever comes first. No rollover, no extension.',
    });
  }
  claims.push(
    {
      lead: 'Free entry by post, same odds, same cap.',
      rest: 'A postcard counts exactly as a paid entry does.',
    },
    {
      lead: `${sentenceCase(numberWord(pence))} pence in every pound goes to community and countryside causes in ${e.destination}.`,
      rest: 'That is the point.',
    },
  );
  return claims;
}

export function Proposition() {
  return (
    <section id="proposition" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-36">
      <div className="max-w-[40rem]">
        <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">Your chance is real.</h2>
        <p className="mt-6 text-lg">
          Most prize draws don’t tell you how many entries they sell. We cap ours, publish the number, and never raise it.
        </p>
        <div className="mt-14 flex flex-col gap-12 md:mt-20 md:gap-16">
          {claimsFor(escape).map((claim) => (
            <div key={claim.lead}>
              <p className="display text-balance text-[2.25rem] leading-[1.05] md:text-[3.25rem]">{claim.lead}</p>
              <p className="mt-4 max-w-[34rem] text-lg text-ink/80">{claim.rest}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
