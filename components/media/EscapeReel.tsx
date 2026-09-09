import { escape as hampshire, type Escape } from '@/config/prize';
import { reelStills } from '@/lib/escapes';
import { Reel } from './Reel';

// The reel for an escape, on the server: reads config, keeps venue stills back until the
// footage is licensed, and hands the client values only.
export function EscapeReel({ escape = hampshire }: { escape?: Escape }) {
  return <Reel stills={reelStills(escape)} label={`Licensed stills of the ${escape.destination} escape.`} />;
}
