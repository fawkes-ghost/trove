import type { Escape } from '@/config/prize';
import { gbp, numberWord } from '@/lib/format';
import { reelStills, venueLine } from '@/lib/escapes';
import { Reel } from '@/components/media/Reel';

// The destination in prose, then the captioned gallery full-bleed beneath, sitting on the
// rules. The nights and the cash render from config. The venue paragraph is gated on the
// server: until permissionGranted nothing from the venue block reaches the HTML, and the
// county copy holds the section. No venue still until the footage is licensed.
export function Destination({ escape }: { escape: Escape }) {
  const named = Boolean(escape.venue.name && escape.venue.permissionGranted);

  return (
    <section id="destination" className="rule-t">
      <div className="section">
        <div className="max-w-[40rem]" data-reveal="item">
          <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">{escape.destination}.</h2>
          <p className="mt-6 text-lg" data-answer>
            This escape is {numberWord(escape.nights)} nights in {escape.destination}, at {venueLine(escape)}.
          </p>
          <div className="mt-6 flex flex-col gap-5 text-lg">
            <p>
              {escape.destination} in winter means chalk streams and short days. The Test and the Itchen run clear and cold through the water meadows, and from the downs above you can see for miles.
            </p>
            <p>
              The villages still have their pubs and their fires, and lunch can take all afternoon.
            </p>
            <p>
              You get {numberWord(escape.nights)} nights at {venueLine(escape)}, breakfast every morning, and {gbp(escape.prize.cash)} in cash to spend however you like.
              {named ? null : ' We’ll name the house as soon as it gives us permission.'}
            </p>
            {named && escape.venue.description ? <p>{escape.venue.description}</p> : null}
            <p>Bring boots and someone you like.</p>
          </div>
        </div>
      </div>
      <div className="rule-t">
        <Reel stills={reelStills(escape)} label={`Pictures of ${escape.destination}.`} />
      </div>
    </section>
  );
}
