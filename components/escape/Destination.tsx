import type { Escape } from '@/config/prize';
import { gbp, numberWord } from '@/lib/format';
import { countyProse, reelStills, venueLine } from '@/lib/escapes';
import { Plate, PlateCaption } from '@/components/media/Plate';

// The place: its name and one sentence on the left, the county in prose on the right, then
// the photographs. One runs edge to edge between the rules, drifting slowly in its frame as
// it passes, with its title and one line beneath it; the others follow as a pair of plates.
// The nights and the cash render from config. The venue paragraph is gated on the server:
// until permissionGranted nothing from the venue block reaches the HTML, and the county copy
// holds the section. No venue still until the footage is licensed.
export function Destination({ escape }: { escape: Escape }) {
  const named = Boolean(escape.venue.name && escape.venue.permissionGranted);
  const [lead, ...rest] = reelStills(escape);

  return (
    <section id="destination" className="rule-t">
      <div className="section split">
        <div data-reveal="group">
          <h2 className="display heading-section text-balance">{escape.destination}.</h2>
          <p className="mt-6 max-w-[26rem] text-lg" data-answer>
            This escape is {numberWord(escape.nights)} nights in {escape.destination}, at {venueLine(escape)}.
          </p>
        </div>
        <div className="flex max-w-[38rem] flex-col gap-5 text-lg">
          {countyProse(escape).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            You get {numberWord(escape.nights)} nights at {venueLine(escape)}, breakfast every morning, and {gbp(escape.prize.cash)} in cash to spend however you like.
            {named ? null : ' We’ll name the house as soon as it gives us permission.'}
          </p>
          {named && escape.venue.description ? <p>{escape.venue.description}</p> : null}
          <p>Bring boots and someone you like.</p>
        </div>
      </div>
      {lead ? (
        <figure className="m-0" data-photograph>
          <div className="rule-t rule-b relative h-[56svh] min-h-[20rem] overflow-clip bg-loch md:h-[78svh]">
            <img src={lead.src} alt={lead.alt} className="panel-media absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" draggable={false} />
          </div>
          <PlateCaption title={lead.title} caption={lead.caption} className="px-[var(--gutter)]" />
        </figure>
      ) : null}
      {rest.length ? (
        <div className="section grid gap-12 min-[900px]:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] min-[900px]:gap-[clamp(3rem,7vw,7rem)]">
          {rest.slice(0, 2).map((still, index) => (
            <Plate key={still.src} still={still} ratio={index === 0 ? 'aspect-[4/5]' : 'aspect-[3/2]'} className={index === 1 ? 'min-[900px]:mt-24' : ''} />
          ))}
        </div>
      ) : (
        <div className="section-half" />
      )}
    </section>
  );
}
