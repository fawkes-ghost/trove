import Link from 'next/link';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { compliance, escape } from '@/config/prize';
import { count, gbp, numberWord, sentenceCase } from '@/lib/format';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';
import { LogoMoment } from './LogoMoment';
import { ScrollButton } from './ScrollButton';

// The five lines over the film. Every figure is read from config. The venue is unnamed
// until permission exists. The poster is a warm winter gradient until footage is licensed.
export function Hero() {
  const venueLine =
    escape.venue.name && escape.venue.permissionGranted
      ? `A long weekend at ${escape.venue.name}.`
      : "A long weekend at one of England’s finest country houses.";

  const sweetener = `${sentenceCase(numberWord(escape.nights))} nights, breakfast, and ${gbp(escape.prize.cash)} in cash. A ${gbp(escape.prize.value)} prize.`;

  const chip = `${compliance.noRollover ? 'One winner is guaranteed. ' : ''}Entries are capped at ${count(escape.cap)}.`;

  const iconSvg = readFileSync(path.join(process.cwd(), 'public', 'brand', 'icon.svg'), 'utf8');

  return (
    <section data-hero className="relative isolate grid min-h-svh grid-rows-[1fr_auto_auto_auto] text-snow">
      <LogoMoment iconSvg={iconSvg} />

      {/* Film layer. Replace the gradient with the licensed poster and loop; keep the scrim. */}
      <div className="hero-poster absolute inset-0 -z-10" aria-hidden="true" data-film="poster">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#4F4256_0%,#8E6A6A_34%,#D39A72_56%,#3B3631_80%,#1A1917_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_16%_60%,#FFBE78BF,#FFBE7800_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,18,20,0)_35%,rgba(16,18,20,0.55)_72%,rgba(16,18,20,0.85)_100%)]" />
      </div>

      <div className="row-start-2 px-6 pt-40 pb-10 md:px-10 md:pt-48">
        <div className="flex max-w-[40rem] flex-col items-start gap-5">
          <p data-hero-line className="text-sm font-medium text-snow/75">
            Your chance to win
          </p>
          <h1 data-hero-line className="display text-[2.5rem] md:text-[4.25rem]">
            {venueLine}
          </h1>
          <p data-hero-line className="text-lg md:text-xl">
            For you and your favourite person.
          </p>
          <p data-hero-line className="text-base md:text-lg">
            {sweetener}
          </p>
          <p data-hero-line className="w-full border border-snow/60 px-3 py-2 text-sm md:w-auto">
            {chip}
          </p>
          <div data-hero-line className="flex w-full flex-col items-start gap-4 md:w-auto">
            <Link
              href="#waitlist"
              className="inline-flex w-full items-center justify-center bg-accent px-6 py-3.5 text-base font-medium text-ink md:w-auto"
            >
              Join the waitlist
            </Link>
            <p className="text-sm">{escape.charity.localityStatement}</p>
          </div>
        </div>
      </div>

      <div className="row-start-3 flex justify-center pb-6">
        <ScrollButton targetId="ledger" />
      </div>

      <div className="row-start-4 border-t border-snow/20 px-6 py-3 md:px-10">
        <ComplianceStrip />
      </div>
    </section>
  );
}
