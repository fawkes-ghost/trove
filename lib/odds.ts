// Odds arithmetic with no import from config, so client components can use it without
// serialising the config object into their bundle (CLAUDE.md rule 5).

// Worst-case odds for a number of entries: the share of a full cap those entries hold,
// written as "1 in N". Rounded up, so published odds never overstate the chance.
export function oddsForEntries(entries: number, e: { cap: number }): string {
  const held = Math.min(Math.max(Math.round(entries), 1), e.cap);
  return `1 in ${Math.ceil(e.cap / held).toLocaleString('en-GB')}`;
}

// What n entries cost, taking the largest bundles first and singles for the rest. The
// bundles are values from config; the client never sees the config object.
export function costFor(n: number, bundles: { entries: number; price: number }[], single: number): number {
  let left = Math.max(0, Math.round(n));
  let cost = 0;
  for (const bundle of [...bundles].sort((a, b) => b.entries - a.entries)) {
    if (bundle.entries <= 1) continue;
    const take = Math.floor(left / bundle.entries);
    cost += take * bundle.price;
    left -= take * bundle.entries;
  }
  return cost + left * single;
}
