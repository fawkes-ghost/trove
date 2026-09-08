import { compliance, economics, escape, oddsForEntries, spendCeiling, worstCaseOdds } from '@/config/prize';
import { count, gbp, numberWord, sentenceCase } from '@/lib/format';
import { venueLine } from '@/lib/escapes';
import { gatePassphrase } from '@/lib/gate';
import { contactEmail, siteUrl } from '@/lib/site';

// A plain-text summary for answer engines, in the llms.txt convention. Rendered once at
// build; every figure is read from config. While the gate is up it does not exist.
export const dynamic = 'force-static';

export function GET() {
  if (gatePassphrase()) return new Response('Not yet.', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });

  const e = escape;
  const pence = Math.round(economics.charityShareOfGross * 100);
  const bundles = e.entry.bundles.map((b) => `${b.entries === 1 ? 'one entry' : `${numberWord(b.entries)} entries`} for ${gbp(b.price)} (worst-case odds ${oddsForEntries(b.entries, e)})`);
  const lines = [
    `# Trove`,
    ``,
    `> Trove is a UK luxury travel prize draw. One prize per draw, called an escape. ${e.charity.localityStatement}`,
    ``,
    `Trove runs one escape at a time. Entries are capped and the cap is published and never raised. Every entry, paid or free by post, has identical odds. The draw closes when the cap is reached or on a longstop date set once when entries open, whichever comes first, and it is never extended.${compliance.noRollover ? ' One winner is guaranteed; there is no rollover.' : ''} ${sentenceCase(numberWord(pence))} pence in every pound of entry sales goes to local causes at the destination, and what was given is published after every draw.`,
    ``,
    `## The current escape: ${e.destination}`,
    ``,
    `- Prize: ${e.prize.description.join('; ')}. Published value ${gbp(e.prize.value)}, of which ${gbp(e.prize.cash)} is cash.`,
    `- Stay: ${numberWord(e.nights)} nights for ${numberWord(e.party)} at ${venueLine(e)}. The venue is named once written permission exists.`,
    `- Cash alternative: ${gbp(e.prize.cashAlternative)}, chosen within ${e.prize.claimWindowDays} days of the draw, replacing the whole prize.`,
    `- Status: ${e.status}.`,
    ``,
    `## The odds`,
    ``,
    `- Cap: ${count(e.cap)} entries, paid and postal together.`,
    `- Worst-case odds with one entry: ${worstCaseOdds(e)}.`,
    `- Entries: ${bundles.join('; ')}.`,
    `- Limit: ${count(e.entry.maxPerPerson)} entries per person per draw, a spend ceiling of ${gbp(spendCeiling(e))} at the single entry price.`,
    ``,
    `## Where the money goes`,
    ``,
    `- ${e.charity.localityStatement} That is ${pence} per cent of gross entry sales.`,
    `- The partner is named once the agreement is signed. What was given is published after every draw.`,
    ``,
    `## Free entry by post`,
    ``,
    `- Anyone aged ${compliance.minimumAge} or over and resident in the ${compliance.residency} can enter for free by post. Each postcard is one entry with identical odds inside the same cap. The route closes with the cap or the longstop, never earlier.`,
    ``,
    `## Pages`,
    ``,
    `- [Home](${siteUrl}/)`,
    `- [The ${e.destination} escape](${siteUrl}/escapes/${e.slug})`,
    `- [How it works](${siteUrl}/how-it-works)`,
    `- [Free entry by post](${siteUrl}/free-entry-by-post)`,
    `- [Why Trove exists](${siteUrl}/why)`,
    `- [Significant conditions](${siteUrl}${compliance.significantConditionsPath})`,
    `- [Terms](${siteUrl}/legal/terms)`,
    `- [Playing responsibly](${siteUrl}/legal/playing-responsibly)`,
    `- [Contact](${siteUrl}/contact), ${contactEmail}`,
    ``,
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
