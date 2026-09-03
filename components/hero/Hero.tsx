import Link from 'next/link';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { compliance, escape } from '@/config/prize';
import { count, gbp, numberWord, sentenceCase } from '@/lib/format';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';
import { HeroFilm } from './HeroFilm';
import { LogoMoment } from './LogoMoment';
import { ScrollButton } from './ScrollButton';

// One centred column over the film: kicker, headline, sweetener, chip, button, the charity
// line. Snow on a heavy scrim; the accent does not appear in the hero. Every figure is read
// from config and the venue is unnamed until permission exists.
export function Hero() {
  const venueLine =
    escape.venue.name && escape.venue.permissionGranted
      ? `A long weekend at ${escape.venue.name}.`
      : "A long weekend at one of England’s finest country houses.";

  const sweetener = `${sentenceCase(numberWord(escape.nights))} nights, breakfast, and ${gbp(escape.prize.cash)} in cash. A ${gbp(escape.prize.value)} prize.`;

  const chip = `${compliance.noRollover ? 'One winner is guaranteed. ' : ''}Entries are capped at ${count(escape.cap)}.`;

  const iconSvg = readFileSync(path.join(process.cwd(), 'public', 'brand', 'icon.svg'), 'utf8');

  return (
    <section data-hero className="relative isolate grid min-h-svh grid-rows-[1fr_auto_1fr_auto_auto] text-snow">
      <LogoMoment iconSvg={iconSvg} />
      <HeroFilm />

      <div className="row-start-2 px-6 pt-24 pb-8 md:px-10">
        <div className="mx-auto flex max-w-[44rem] flex-col items-center gap-5 text-center">
          <p data-hero-line className="text-sm font-medium text-snow/75">
            Your chance to win
          </p>
          <h1 data-hero-line className="display text-[2.5rem] md:text-[4.25rem]">
            {venueLine}
          </h1>
          <p data-hero-line className="text-base md:text-lg">
            {sweetener}
          </p>
          <p data-hero-line className="w-full border border-snow/60 px-3 py-2 text-sm md:w-auto">
            {chip}
          </p>
          <div data-hero-line className="flex w-full flex-col items-center gap-4 md:w-auto">
            <Link
              href="#waitlist"
              className="inline-flex w-full items-center justify-center bg-snow px-6 py-3.5 text-base font-medium text-ink md:w-auto"
            >
              Join the waitlist
            </Link>
            <p className="text-sm text-snow/85">{escape.charity.localityStatement}</p>
          </div>
        </div>
      </div>

      <div className="row-start-4 flex justify-center pb-6">
        <ScrollButton targetId="ledger" />
      </div>

      <div className="row-start-5 border-t border-snow/20 px-6 py-3 md:px-10">
        <ComplianceStrip />
      </div>
    </section>
  );
}
