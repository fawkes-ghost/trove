import { compliance, escape as hampshire, type Escape } from '@/config/prize';
import { count, numberWord, sentenceCase } from '@/lib/format';
import { prizeLine } from '@/lib/escapes';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';
import { HeroFilm } from './HeroFilm';
import { WaitlistLink } from './WaitlistLink';

// The horizon hero. The film sits above a loch green horizon line and the sun sits on that
// line, half set, the same construction as the o in the wordmark. The facts sit below the
// line on the light page, so they read on any frame of the film, at any brightness, and
// survive a screenshot. On first paint the line draws across and the sun rises onto it
// (CSS only, see app/globals.css); reduced motion shows the final state. Every figure is
// read from config and the venue is unnamed until permission exists. The escape page passes
// its own headline so it does not repeat the home hero.
export function Hero({ escape = hampshire, headline }: { escape?: Escape; headline?: string }) {
  const venueLine =
    escape.venue.name && escape.venue.permissionGranted
      ? `Win an escape to ${escape.venue.name}.`
      : 'Win an escape to one of England’s finest country houses.';

  const kicker = escape.cadence.announced
    ? `${escape.destination}. Entries open ${escape.cadence.announced}.`
    : `${escape.destination}. ${sentenceCase(numberWord(escape.nights))} nights for ${numberWord(escape.party)}.`;

  const chip = `${compliance.noRollover ? 'One winner is guaranteed. ' : ''}Entries are capped at ${count(escape.cap)}.`;

  return (
    <section data-hero className="relative pt-16 min-[900px]:pt-[4.5rem]">
      <div className="hero-sky relative h-[36svh] min-h-[15rem] overflow-hidden md:h-[48svh]">
        <HeroFilm media={escape.media} />
        {/* The sun on the horizon: half set, clipped by the line beneath it. */}
        <div aria-hidden="true" className="hero-sun absolute bottom-0 left-1/2 z-30 aspect-square w-[4.5rem] rounded-full bg-sun md:w-32" />
      </div>
      <div aria-hidden="true" className="hero-horizon h-[6px] bg-loch" />

      <div className="px-6 pt-6 pb-10 md:px-10 md:pt-10 md:pb-16">
        <div className="grid gap-5 min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] min-[900px]:gap-16">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-ink/70">{kicker}</p>
            <h1 className="display text-balance text-[2rem] md:text-[3.25rem] min-[1200px]:text-[3.75rem]">{headline ?? venueLine}</h1>
          </div>
          <div className="flex flex-col items-start gap-4 min-[900px]:pt-9">
            <p className="text-base md:text-lg">{prizeLine(escape)}</p>
            <p className="rounded-2xl border border-mist px-3 py-1.5 text-[13px] md:rounded-full md:text-sm">{chip}</p>
            <WaitlistLink className="btn mt-1 inline-flex w-full items-center justify-center bg-sun px-7 py-3.5 text-base font-medium text-ink min-[900px]:w-auto">
              Secure your place
            </WaitlistLink>
            <p className="text-sm text-ink/70">Founding friends enter first, before the public.</p>
            {/* The significant conditions sit directly under the call to action, so they are
                on screen whenever it is. */}
            <ComplianceStrip className="hero-strip rule-t mt-1 w-full pt-3 text-ink/75" />
          </div>
        </div>
      </div>
    </section>
  );
}
