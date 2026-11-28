import Link from 'next/link';
import { escape as hampshire, type Escape } from '@/config/prize';
import { gbp, numberWord, sentenceCase } from '@/lib/format';
import { countyProse, escapeName, reelStills } from '@/lib/escapes';
import { Kicker } from '@/components/site/Kicker';
import { Plate } from '@/components/media/Plate';

// The escape: what it is, where it is and what is included, beside its photographs. Words in
// a narrow column on the left; on the right one wide photograph with the other two side by
// side under it, so the pictures fill the column and nothing is left empty beside them. Each
// has its title and one line beneath it. Every figure is read from config; the house is
// unnamed until it gives permission, and no venue still shows until its footage is licensed.
export function EscapeIntro({ escape = hampshire }: { escape?: Escape }) {
  const { prize } = escape;
  const named = Boolean(escape.venue.name && escape.venue.permissionGranted);
  const [lead, ...rest] = reelStills(escape);
  const [stay] = prize.description;
  const included = [
    { term: 'The stay', detail: `${stay}.` },
    { term: 'The cash', detail: `${gbp(prize.cash)} to spend however you like.` },
    { term: 'When', detail: prize.stayWhen },
    { term: 'Prize value', detail: `${gbp(prize.value)}.` },
  ];

  return (
    <section id="destination" className="section">
      <div className="grid gap-12 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[900px]:items-start min-[900px]:gap-[clamp(2.5rem,5vw,5rem)]">
        <div data-reveal="group">
          <Kicker>The escape.</Kicker>
          <h2 className="display heading-section mt-6 text-balance">
            {sentenceCase(numberWord(escape.nights))} nights away, for {numberWord(escape.party)}.
          </h2>
          <p className="mt-8 max-w-[34rem] text-lg" data-answer>
            {countyProse()[0]}
            {named ? null : ' We’ll name the hotel as soon as it gives us permission.'}
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
              See {escapeName(escape)}.
            </Link>
          </p>
        </div>
        {lead ? (
          <div className="grid gap-6">
            <Plate still={lead} ratio="aspect-[3/2]" sizes="(min-width: 900px) 56vw, 100vw" />
            {rest.length ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {rest.slice(0, 2).map((still) => (
                  <Plate key={still.src} still={still} ratio="aspect-[3/2]" sizes="(min-width: 900px) 28vw, (min-width: 640px) 50vw, 100vw" />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
