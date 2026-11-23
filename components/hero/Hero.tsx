import Link from 'next/link';
import { compliance, escape as hampshire, worstCaseOdds, type Escape } from '@/config/prize';
import { count, gbp, numberWord, percent, sentenceCase } from '@/lib/format';
import { prizeLine, venueLine as venuePhrase } from '@/lib/escapes';
import { wordmarkSource } from '@/components/brand/Marks';
import { WaitlistForm } from '@/components/waitlist/WaitlistForm';
import { LoudOnly } from '@/components/preview/LoudOnly';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';
import { HeroFilm } from './HeroFilm';
import { SunSeal } from './SunSeal';
import { WaitlistLink } from './WaitlistLink';
import { ShareButton } from '@/components/share/ShareButton';
import { shareCopy } from '@/lib/share';

// The horizon hero. The film fills the first screen edge to edge, the way a fashion house
// opens, and the words sit low on it over a scrim: one oversized headline, one plain
// promise (what you could win, what an entry costs, the most entries there will ever be
// and so your chance), one button, and the key terms under it. The horizon runs along the
// film's foot with the sun half set on it; tap the sun and it tells you where the money
// goes (SunSeal). Every figure is read from config and the venue is unnamed until
// permission exists. The escape page passes its own headline.
export function Hero({ escape = hampshire, headline, path = '/' }: { escape?: Escape; headline?: string; path?: string }) {
  const venueLine =
    escape.venue.name && escape.venue.permissionGranted
      ? `Win an escape to ${escape.venue.name}.`
      : 'Win an escape to one of England’s finest country houses.';

  const kicker = escape.cadence.announced
    ? `${escape.destination}. Entries open ${escape.cadence.announced}.`
    : `${escape.destination}. ${sentenceCase(numberWord(escape.nights))} nights for ${numberWord(escape.party)}.`;

  const sunLine = `${percent(escape.charity.shareOfGross)} of every paid entry goes to causes in ${escape.destination}.`;

  const overlay = (
    <div className="relative z-20 px-6 pb-[3.25rem] text-snow md:px-10 md:pb-24" data-hero-copy>
      <div className="flex max-w-[56rem] flex-col items-start gap-4 md:gap-6">
        <p className="text-sm font-medium text-snow/85 md:text-base">{kicker}</p>
        <h1 className="display max-w-[16ch] text-balance text-[2.75rem] leading-[0.96] md:text-[5rem] min-[1200px]:text-[6.25rem]">{headline ?? venueLine}</h1>
        {/* The promise, plain: the price and the chance in the first sentence. */}
        <p className="max-w-[38rem] text-base leading-snug text-snow/90 md:text-xl" data-promise>
          {prizeLine(escape)} <strong className="font-semibold text-snow">{gbp(escape.entry.price)} an entry</strong>, and never more than{' '}
          <strong className="font-semibold text-snow">{count(escape.cap)} entries</strong>, so your chance is at least{' '}
          <strong className="font-semibold whitespace-nowrap text-snow">{worstCaseOdds(escape)}</strong>.
          {compliance.noRollover ? ' One winner is guaranteed.' : null}
        </p>
        <div className="flex w-full flex-col gap-2.5 pt-1 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-3">
          <WaitlistLink className="btn group inline-flex items-center justify-center gap-2 bg-sun px-7 py-3.5 text-base font-medium text-ink">
            Secure your place
          </WaitlistLink>
          <Link href="/#how-it-works" className="btn hidden items-center justify-center border border-snow/80 px-7 py-3.5 text-base font-medium hover:bg-snow hover:text-ink min-[480px]:inline-flex">
            How it works
          </Link>
        </div>
        {/* The key terms sit directly under the call to action, so they are on screen
            whenever it is. */}
        <ComplianceStrip className="max-w-[34rem] text-snow/80" />
      </div>
    </div>
  );

  // PREVIEW ONLY, the Loud option. One giant idea, the chance, in the logo's heavy sans; the
  // twist line under it; the prize in one sentence; the email field; the key terms. Five
  // things where the current hero carries nine. Shown only when data-type="loud" is set
  // (app/type-options.css); every figure is still read from config.
  const promises = [
    `${count(escape.cap)} entries. Never more.`,
    compliance.noRollover ? 'One winner guaranteed.' : null,
    'Free entry by post.',
    `${percent(escape.charity.shareOfGross)} to causes in ${escape.destination}.`,
    `${gbp(escape.entry.price)} an entry.`,
  ].filter((line): line is string => Boolean(line));

  const loud = (
    <div className="relative z-20 px-6 pb-8 text-snow md:px-10 md:pb-14" data-hero-loud>
      <p className="loud-kicker" aria-hidden="true">Your chance of winning is at least</p>
      <p className="loud-number">
        <span className="sr-only">Your chance of winning is at least </span>
        {worstCaseOdds(escape)}.
      </p>
      {/* Two halves, so from 900px they can sit side by side and level: the promise, and
          the email field with the key terms under it. One column below that. */}
      <div className="loud-lower">
        <div>
          <p className="loud-twist">
            <span className="loud-twist-out" aria-hidden="true">Unlimited entries.</span>
            <span className="loud-twist-in">
              <span className="loud-mark">{count(escape.cap)}</span> entries. Never more.
            </span>
          </p>
          <h1 className="display loud-prize">
            Win {numberWord(escape.nights)} nights at {venuePhrase(escape)}, and {gbp(escape.prize.cash)} in cash.
          </h1>
        </div>
        <div>
          <div className="loud-form">
            <LoudOnly>
              <WaitlistForm sourceChannel="trove-hero-loud" idPrefix="hero-waitlist" wordmarkSvg={wordmarkSource()} />
            </LoudOnly>
          </div>
          <ComplianceStrip className="max-w-[34rem] text-snow/80" />
        </div>
      </div>
    </div>
  );

  return (
    <section data-hero data-hero-film className="relative">
      <SunSeal
        line={sunLine}
        overlay={
          <>
            {overlay}
            {loud}
          </>
        }
      >
        <HeroFilm media={escape.media} />
      </SunSeal>
      {/* PREVIEW ONLY, the Loud option: the promises on a tilted ribbon, twice over so the
          loop has no seam. The second run is hidden from assistive technology. */}
      <div data-loud-ribbon>
        <div className="loud-ribbon-band">
          <div className="loud-ribbon-track">
            {[0, 1].map((run) => (
              <p key={run} aria-hidden={run === 1 || undefined}>
                {promises.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div data-hero-foot className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 pt-1 pb-10 text-center text-sm text-ink/70 md:pb-14">
        <span>Founding friends can enter before anyone else.</span>
        <ShareButton {...shareCopy(escape, path)} placement="hero" className="text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink" />
      </div>
    </section>
  );
}
