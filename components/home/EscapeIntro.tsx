import Link from 'next/link';
import { escape as hampshire, type Escape } from '@/config/prize';
import { gbp, numberWord, sentenceCase } from '@/lib/format';
import { countyProse, reelStills, venueLine } from '@/lib/escapes';
import { Kicker } from '@/components/site/Kicker';
import { Plate } from '@/components/media/Plate';

// The escape, in the house register: what it is, where it is, and exactly what is included,
// set the way a hotel sets a letter. Words in a narrow column on the left, one tall
// photograph on the right, the remaining photographs as a pair beneath, each with its title
// and one line under it rather than over it. Every figure is read from config; the house is
// unnamed until it gives permission, and no venue still shows until its footage is licensed.
export function EscapeIntro({ escape = hampshire }: { escape?: Escape }) {
  const { prize } = escape;
  const named = Boolean(escape.venue.name && escape.venue.permissionGranted);
  const [lead, ...rest] = reelStills(escape);
  const [stay] = prize.description;
  const included = [
    { term: 'The stay', detail: `${stay}.` },
    { term: 'The cash', detail: `${gbp(prize.cash)}, yours to spend on the trip, or on anything else.` },
    { term: 'When', detail: `The stay is taken ${prize.stayWindow}.` },
    { term: 'Or instead', detail: `${gbp(prize.cashAlternative)} in cash instead of the escape, if you would rather.` },
    { term: 'In all', detail: `A ${gbp(prize.value)} prize.` },
  ];

  return (
    <section id="destination" className="section">
      <div className="grid gap-12 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] min-[900px]:items-start min-[900px]:gap-[clamp(3rem,7vw,7rem)]">
        <div data-reveal="group">
          <Kicker>The escape.</Kicker>
          <h2 className="display heading-section mt-6 text-balance">
            {sentenceCase(numberWord(escape.nights))} nights at {venueLine(escape)}.
          </h2>
          <p className="mt-8 max-w-[34rem] text-lg" data-answer>
            {countyProse(escape)[0]}
            {named ? null : ' We’ll name the house as soon as it gives us permission.'}
          </p>
          <dl className="mt-10 max-w-[34rem]">
            {included.map((row) => (
              <div key={row.term} className="rule-t grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 py-4 text-base">
                <dt className="text-ink/60">{row.term}</dt>
                <dd>{row.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="rule-t max-w-[34rem] pt-6 text-base">
            <Link href={`/escapes/${escape.slug}`} className="link-quiet">
              See the {escape.destination} escape.
            </Link>
          </p>
        </div>
        {lead ? <Plate still={lead} ratio="aspect-[4/5]" className="min-[900px]:mt-20" /> : null}
      </div>
      {rest.length ? (
        <div className="mt-12 grid gap-12 min-[900px]:mt-24 min-[900px]:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] min-[900px]:gap-[clamp(3rem,7vw,7rem)]">
          {rest.slice(0, 2).map((still, index) => (
            <Plate key={still.src} still={still} ratio={index === 0 ? 'aspect-[4/5]' : 'aspect-[3/2]'} className={index === 1 ? 'min-[900px]:mt-24' : ''} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
