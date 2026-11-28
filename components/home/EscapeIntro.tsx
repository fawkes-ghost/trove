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
  // While the place is unannounced the home page is a teaser, written for a stranger with a
  // minute to spare: what it is worth, who it is for and when, then the one thing to do. The
  // chance is in the hero and its working in the field below, so it is not repeated here. The escape page and the key terms keep the full prize, one click away.
  const teasing = !escape.destinationPublic;
  const included = teasing
    ? [
        { term: 'Worth', detail: `${gbp(prize.value)}.` },
        { term: 'For', detail: `${sentenceCase(numberWord(escape.party))}.` },
        { term: 'When', detail: `${prize.stayWhen.split(',')[0]}.` }, // the season only; the full window is on the escape page
      ]
    : [
        { term: 'The stay', detail: `${stay}.` },
        { term: 'The cash', detail: `${gbp(prize.cash)} to spend however you like.` },
        { term: 'When', detail: prize.stayWhen },
        { term: 'Prize value', detail: `${gbp(prize.value)}.` },
      ];

  return (
    <section id="destination" className="section">
      <div className="grid gap-12 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[900px]:items-start min-[900px]:gap-[clamp(2.5rem,5vw,5rem)]">
        <div data-reveal="group">
          <Kicker>{teasing ? 'The first escape.' : 'The escape.'}</Kicker>
          <h2 className="display heading-section mt-6 text-balance">
            {teasing ? 'We’re beginning in the English countryside, in winter.' : `${sentenceCase(numberWord(escape.nights))} nights away, for ${numberWord(escape.party)}.`}
          </h2>
          <p className="mt-8 max-w-[34rem] text-lg" data-answer>
            {teasing
              ? `A country hotel in England, for you and someone you’d like to take, at the time of year when it is good to be somewhere warm with nowhere to be. We’ll name it on the morning entries open, and write to you then, once.`
              : countyProse()[0]}
            {teasing || named ? null : ' Named when entries open.'}
          </p>
          <dl className="mt-10 max-w-[34rem]">
            {included.map((row) => (
              <div key={row.term} className="rule-t grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 py-4 text-base">
                <dt className="text-ink/60">{row.term}</dt>
                <dd>{row.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="rule-t flex max-w-[34rem] flex-wrap gap-x-8 gap-y-3 pt-6 text-base">
            {teasing ? (
              <Link href="#waitlist" className="link-quiet font-medium">
                Join the list.
              </Link>
            ) : null}
            <Link href={`/escapes/${escape.slug}`} className="link-quiet">
              {teasing ? 'Read what we can share so far.' : `See ${escapeName(escape)}.`}
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
