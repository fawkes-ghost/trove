import { escape as hampshire, type Escape } from '@/config/prize';
import { Kicker } from '@/components/site/Kicker';

// Snow: the kicker and the headline that introduce the reel beneath. The destination is
// read from config; the venue stays unnamed until permission exists.
export function DestinationSection({ escape = hampshire }: { escape?: Escape }) {
  const where = escape.venue.name && escape.venue.permissionGranted ? escape.venue.name : `an exclusive country estate in ${escape.destination}`;
  return (
    <section id="destination" className="section">
      <div className="max-w-[44rem]">
        <Kicker>The destination.</Kicker>
        <h2 className="display mt-6 text-balance text-[2rem] md:text-[2.75rem]">Where we’re going first: {where}.</h2>
      </div>
    </section>
  );
}
