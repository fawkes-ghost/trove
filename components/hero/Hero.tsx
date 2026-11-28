import { compliance, escape as hampshire, worstCaseOdds, type Escape, type Film } from '@/config/prize';
import { count, gbp, numberWord, percent } from '@/lib/format';
import { localCauses, venueLine } from '@/lib/escapes';
import { organisation } from '@/config/organisation';
import { wordmarkSource } from '@/components/brand/Marks';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';
import { WaitlistForm } from '@/components/waitlist/WaitlistForm';
import { HeroFilm } from './HeroFilm';
import { shareCopy } from '@/lib/share';
import { PromiseRibbon } from './PromiseRibbon';

// The hero, in two voices. On the home page the want comes first (28 November 2026): Trove's
// line in the serif and the first escape, still a mystery. Then the one giant idea: the
// chance, set as wide as the screen in the logo's heavy sans, because it is the one figure no
// other draw prints. Under it the
// twist line (what other draws leave open, struck out, then what this one fixes), on the home
// page Trove's tagline in the serif with the first escape's value under it, and no more (the
// founder wants suspense for the waitlist, 28 November 2026) (on the escape
// page the prize in one sentence), the signup form with one line on what signing up brings,
// and the key terms, over the film. The rail of promises runs beneath it. The words sit in the flow at the foot of a film that is at least one screen tall
// and taller when they need it, so on a short window the film grows rather than the words
// sliding under the header. From 900px the lower half is two level columns.
//
// Every figure is read from config and the venue is unnamed until permission exists. The
// escape page passes a lead ("The country hotel escape.") and its own signup channel.
// `film` replaces the escape's own film; only the home page passes one (config homeFilm).
export function Hero({ escape = hampshire, lead, sourceChannel = 'trove-hero', film }: { escape?: Escape; lead?: string; sourceChannel?: string; film?: Film }) {
  const promises = [
    `${count(escape.cap)} entries. Never more.`,
    compliance.noRollover ? 'One winner guaranteed.' : null,
    'Free entry by post.',
    `${percent(escape.charity.shareOfGross)} to ${localCauses(escape)}.`,
    `${gbp(escape.entry.price)} an entry.`,
  ].filter((line): line is string => Boolean(line));

  return (
    <section data-hero data-hero-film className="relative">
      <div className="hero-sky relative flex min-h-[max(36rem,calc(100svh-2.75rem))] flex-col justify-end overflow-clip bg-loch pt-24">
        <HeroFilm media={film ?? escape.media} />
        <div aria-hidden="true" className="hero-scrim pointer-events-none absolute inset-0 z-10" />
        <div className="relative z-20 px-6 pb-8 text-snow md:px-10 md:pb-14" data-hero-copy>
          {/* On the home page the want comes first: Trove's line and the first escape, kept a
              mystery until launch. Then the chance and the cap, as the reason to act now. */}
          {lead ? null : (
            <div className="hero-desire">
              <h1 className="display hero-prize">{organisation.tagline}</h1>
              <p className="hero-first">
                {escape.destinationPublic
                  ? `The first is in ${escape.destination}: a ${gbp(escape.prize.value)} escape.`
                  : `We begin with a winter escape for ${numberWord(escape.party)} at a country hotel in England, worth ${gbp(escape.prize.value)}. We’ll name it on the morning entries open.`}
              </p>
            </div>
          )}
          <p className="hero-kicker" aria-hidden="true">
            {lead ? `${lead} ` : null}Your chance of winning is at least
          </p>
          <p className="hero-number">
            <span className="sr-only">Your chance of winning is at least </span>
            {worstCaseOdds(escape)}.
          </p>
          <div className="hero-lower">
            <div>
              {/* The struck line is decoration: it is hidden from assistive technology and,
                  without motion, never shown. Its words come from CSS, not the page text, so a
                  search engine or answer engine reading the page never quotes "unlimited
                  entries" for a capped draw. The promise itself is always in the page. */}
              <p className="hero-twist">
                <span className="hero-twist-out" aria-hidden="true" />
                <span className="hero-twist-in">
                  <span className="mark-box">{count(escape.cap)}</span> entries. Never more.
                </span>
              </p>
              {/* The escape page keeps the prize as its headline here, because that page is
                  about one escape. The home page's headline sits above the chance. */}
              {lead ? (
                <h1 className="display hero-prize">
                  Win {numberWord(escape.nights)} nights at {venueLine(escape)}, and {gbp(escape.prize.cash)} in cash.
                </h1>
              ) : null}
            </div>
            <div>
              <div className="hero-form">
                <WaitlistForm sourceChannel={sourceChannel} idPrefix="hero-waitlist" wordmarkSvg={wordmarkSource()} share={shareCopy(escape, lead ? `/escapes/${escape.slug}` : '/')} />
              </div>
              {escape.status === 'open' ? null : (
                <p className="hero-note">We’ll write to you once, on the morning entries open. There is nothing to pay today.</p>
              )}
              {/* The key terms sit directly under the call to action, so they are on screen
                  whenever it is. */}
              <ComplianceStrip className="max-w-[34rem] text-snow/80" />
            </div>
          </div>
        </div>
      </div>
      <PromiseRibbon lines={promises} />
    </section>
  );
}
