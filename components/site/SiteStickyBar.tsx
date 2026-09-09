import { escape as hampshire, worstCaseOdds, type Escape } from '@/config/prize';
import { organisation } from '@/config/organisation';
import { count } from '@/lib/format';
import { prizeLineShort } from '@/lib/escapes';
import { routes } from '@/lib/routes';
import { iconSource } from '@/components/brand/Marks';
import { StickyBar } from './StickyBar';

// The sticky bar for the open escape, on the server: reads config and hands the client
// strings and route lists only. The middle slot is the worst-case odds until entries open, then the
// entries taken against the cap (static until the ledger is live).
export function SiteStickyBar({ escape = hampshire, entriesTaken = 0 }: { escape?: Escape; entriesTaken?: number }) {
  const middle = escape.status === 'open' ? `${count(entriesTaken)} of ${count(escape.cap)} entries taken.` : `${worstCaseOdds(escape)} worst case.`;
  return <StickyBar prize={prizeLineShort(escape)} middle={middle} review={organisation.review} iconSvg={iconSource()} groups={routes} />;
}
