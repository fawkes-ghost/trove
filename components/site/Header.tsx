import { escape as hampshire, worstCaseOdds, type Escape } from '@/config/prize';
import { count, gbp } from '@/lib/format';
import { prizeLineShort } from '@/lib/escapes';
import { routes, freePostalRoute } from '@/lib/routes';
import { iconSource, wordmarkSource } from '@/components/brand/Marks';
import { HeaderShell } from './HeaderShell';

// The primary routes, shown in the header from 900px up. Below that the hamburger overlay
// carries every route.
const primary = [
  { label: 'Escapes', href: '/escapes' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Why Trove', href: '/why' },
  { label: 'Free entry by post', href: freePostalRoute },
];

// The header, on the server: reads the marks and config and hands the client shell strings
// and route lists only. The centre's second state carries the worst-case odds until entries
// open, then the entries taken against the cap (static until the ledger is live).
export function Header({ escape = hampshire, entriesTaken = 0 }: { escape?: Escape; entriesTaken?: number }) {
  const odds = escape.status === 'open' ? `${count(entriesTaken)} of ${count(escape.cap)} entries taken.` : `${worstCaseOdds(escape)} worst case.`;
  return (
    <HeaderShell
      iconSvg={iconSource()}
      wordmarkSvg={wordmarkSource()}
      primary={primary}
      groups={routes}
      prize={prizeLineShort(escape)}
      prizeValue={`A ${gbp(escape.prize.value)} prize.`}
      odds={odds}
    />
  );
}
