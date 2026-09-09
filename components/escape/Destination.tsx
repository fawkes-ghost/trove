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
      <div className="px-6 py-16 md:px-10 md:py-32">
        <div className="max-w-[40rem]">
          <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">{escape.destination}.</h2>
          <p className="mt-6 text-lg" data-answer>
            This escape is {numberWord(escape.nights)} nights in {escape.destination}, at {venueLine(escape)}.
          </p>
          <div className="mt-6 flex flex-col gap-5 text-lg">
            <p>
              {escape.destination} in winter is a county of chalk streams and short days. The Test and the Itchen run clear and cold through water meadows that flood and freeze, and the downs above them are bare enough to see the shape of the land.
            </p>
            <p>
              The villages keep their pubs and their fires. Lunch takes the afternoon. Beech woods hold the last of the light until four, and the lanes empty once the dog walkers have gone home.
            </p>
            <p>
              This escape is {numberWord(escape.nights)} nights at {venueLine(escape)}, with breakfast each morning and {gbp(escape.prize.cash)} in cash in your pocket for dinners, a treatment, or nothing at all.
              {named ? null : ' The house is named the moment we have its permission to name it.'}
            </p>
            {named && escape.venue.description ? <p>{escape.venue.description}</p> : null}
            <p>Bring boots, a book and your favourite person. The county does the rest.</p>
          </div>
        </div>
      </div>
      <div className="rule-t">
        <Reel stills={reelStills(escape)} label={`Licensed stills of the ${escape.destination} escape.`} />
      </div>
    </section>
  );
}
