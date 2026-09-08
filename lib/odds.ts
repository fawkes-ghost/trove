// Odds arithmetic with no import from config, so client components can use it without
// serialising the config object into their bundle (CLAUDE.md rule 5).

// Worst-case odds for a number of entries: the share of a full cap those entries hold,
// written as "1 in N". Rounded up, so published odds never overstate the chance.
export function oddsForEntries(entries: number, e: { cap: number }): string {
  const held = Math.min(Math.max(Math.round(entries), 1), e.cap);
  return `1 in ${Math.ceil(e.cap / held).toLocaleString('en-GB')}`;
}
