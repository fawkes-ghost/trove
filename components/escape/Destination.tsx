import type { Escape } from '@/config/prize';
import { gbp, numberWord } from '@/lib/format';
import { countyProse, escapeTitle, reelStills, venueLine } from '@/lib/escapes';
import Image from 'next/image';
import { Plate, PlateCaption } from '@/components/media/Plate';

// The place: its name and one sentence on the left, the county in prose on the right, then
// the photographs. One runs edge to edge, drifting slowly in its frame as it passes, with its
// title and one line beneath it; the others follow close under it as an even pair, so there
// is no empty space around them. The nights and the cash render from config. The venue
// paragraph is decided on the server: until permissionGranted nothing from the venue block
// reaches the HTML, and the county copy holds the section. No venue still until the footage
// is licensed.
export function Destination({ escape }: { escape: Escape }) {
  const named = Boolean(escape.venue.name && escape.venue.permissionGranted);
  const [lead, ...rest] = reelStills(escape);

  return (
    <section id="destination" className="rule-t">
      <div className="section split">
        <div data-reveal="group">
          <h2 className="display heading-section text-balance">{escapeTitle(escape)}.</h2>
          <p className="mt-6 max-w-[26rem] text-lg" data-answer>
            This escape is {numberWord(escape.nights)} nights at {venueLine(escape)}{escape.destinationPublic ? `, in ${escape.destination}` : ', close to home'}.
          </p>
        </div>
        <div className="flex max-w-[38rem] flex-col gap-5 text-lg">
          {countyProse().map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            You get {numberWord(escape.nights)} nights at {venueLine(escape)}, breakfast every morning, and {gbp(escape.prize.cash)} in cash to spend however you like.
            {named ? null : ' We’ll name the hotel as soon as it gives us permission.'}
          </p>
          {named && escape.venue.description ? <p>{escape.venue.description}</p> : null}
          <p>Bring boots and someone you like.</p>
        </div>
      </div>
      {lead ? (
        <figure className="m-0" data-photograph>
          <div className="rule-t rule-b relative h-[56svh] min-h-[20rem] overflow-clip bg-loch md:h-[78svh]">
            <Image src={lead.src} alt={lead.alt} fill sizes="100vw" className="panel-media object-cover" placeholder={lead.blur ? 'blur' : 'empty'} blurDataURL={lead.blur} draggable={false} />
          </div>
          <PlateCaption title={lead.title} caption={lead.caption} className="px-[var(--gutter)]" />
        </figure>
      ) : null}
      {rest.length ? (
        <div className="grid gap-6 px-[var(--gutter)] pt-10 pb-[var(--space-section)] sm:grid-cols-2 md:pt-12">
          {rest.slice(0, 2).map((still) => (
            <Plate key={still.src} still={still} ratio="aspect-[3/2]" sizes="(min-width: 640px) 50vw, 100vw" />
          ))}
        </div>
      ) : (
        <div className="section-half" />
      )}
    </section>
  );
}
