import Link from 'next/link';
import { compliance, escape as hampshire, worstCaseOdds, type Escape } from '@/config/prize';
import { count, gbp, numberWord, percent, sentenceCase } from '@/lib/format';
import { prizeLine } from '@/lib/escapes';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';
import { HeroFilm } from './HeroFilm';
import { SunSeal } from './SunSeal';
import { WaitlistLink } from './WaitlistLink';
import { ShareButton } from '@/components/share/ShareButton';
import { shareCopy } from '@/lib/share';

// The horizon hero. The film sits above a loch green horizon line and the sun sits on that
// line, half set, the same construction as the o in the wordmark. Tap the sun and it tells
// you where the money goes (SunSeal). Below the line, one plain promise: what you could win,
// what an entry costs, the most entries there will ever be and so your worst-case odds,
// then one button to act and one to understand. The facts sit on the light page so they read
// on any frame of the film and survive a screenshot. Every figure is read from config and
// the venue is unnamed until permission exists. The escape page passes its own headline.
export function Hero({ escape = hampshire, headline, path = '/' }: { escape?: Escape; headline?: string; path?: string }) {
  const venueLine =
    escape.venue.name && escape.venue.permissionGranted
      ? `Win an escape to ${escape.venue.name}.`
      : 'Win an escape to one of England’s finest country houses.';

  const kicker = escape.cadence.announced
    ? `${escape.destination}. Entries open ${escape.cadence.announced}.`
    : `${escape.destination}. ${sentenceCase(numberWord(escape.nights))} nights for ${numberWord(escape.party)}.`;

  const sunLine = `${percent(escape.charity.shareOfGross)} of every paid entry goes to causes in ${escape.destination}.`;

  return (
    <section data-hero className="relative pt-16 min-[900px]:pt-[4.5rem]">
      <SunSeal line={sunLine}>
        <HeroFilm media={escape.media} />
      </SunSeal>

      <div className="px-6 pt-8 pb-10 md:px-10 md:pt-12 md:pb-16">
        <div className="grid gap-6 min-[900px]:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] min-[900px]:gap-16">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-ink/70">{kicker}</p>
            <h1 className="display text-balance text-[2.35rem] leading-[1.02] md:text-[3.75rem] min-[1200px]:text-[4.5rem]">{headline ?? venueLine}</h1>
          </div>
          <div className="flex flex-col items-start gap-5 min-[900px]:pt-10">
            {/* The promise, Rigged-plain: the price and the odds in the first sentence. */}
            <p className="text-lg leading-snug md:text-xl" data-promise>
              {prizeLine(escape)} <strong className="font-semibold">{gbp(escape.entry.price)} an entry</strong>, and never more than{' '}
              <strong className="font-semibold">{count(escape.cap)} entries</strong>, so your worst-case odds are{' '}
              <strong className="font-semibold whitespace-nowrap">{worstCaseOdds(escape)}</strong>.
            </p>
            {compliance.noRollover ? <p className="rounded-full border border-mist px-3 py-1.5 text-sm">One winner is guaranteed.</p> : null}
            <div className="flex w-full flex-col gap-2.5 min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-3">
              <WaitlistLink className="btn group inline-flex items-center justify-center gap-2 bg-sun px-7 py-3.5 text-base font-medium text-ink">
                Secure your place
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
              </WaitlistLink>
              <Link href="/#how-it-works" className="btn inline-flex items-center justify-center border border-ink/80 px-7 py-3.5 text-base font-medium hover:bg-ink hover:text-snow">
                How it works
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink/70">
              <span>Founding friends enter first, before the public.</span>
              <ShareButton {...shareCopy(escape, path)} placement="hero" className="text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink" />
            </div>
            {/* The significant conditions sit directly under the call to action, so they are
                on screen whenever it is. */}
            <ComplianceStrip className="hero-strip rule-t w-full pt-3 text-ink/75" />
          </div>
        </div>
      </div>
    </section>
  );
}
