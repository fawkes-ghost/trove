import { escape as hampshire, type Escape } from '@/config/prize';
import { reelStills } from '@/lib/escapes';
import { Panels } from './Panels';

// The pictures for an escape, on the server: reads config, keeps venue stills back until the
// footage is licensed, and hands the panels values only.
export function EscapeReel({ escape = hampshire }: { escape?: Escape }) {
  return <Panels stills={reelStills(escape)} label={`Pictures of ${escape.destination}.`} />;
}
