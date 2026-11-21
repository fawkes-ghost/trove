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
    <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-[3.25rem] text-snow md:px-10 md:pb-24" data-hero-copy>
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

  return (
    <section data-hero data-hero-film className="relative">
      <SunSeal line={sunLine} overlay={overlay}>
        <HeroFilm media={escape.media} />
      </SunSeal>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 pt-1 pb-10 text-center text-sm text-ink/70 md:pb-14">
        <span>Founding friends can enter before anyone else.</span>
        <ShareButton {...shareCopy(escape, path)} placement="hero" className="text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink" />
      </div>
    </section>
  );
}
