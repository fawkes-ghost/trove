import { readFileSync } from 'node:fs';
import path from 'node:path';
import { compliance, escape as hampshire, type Escape } from '@/config/prize';
import { count } from '@/lib/format';
import { prizeLine } from '@/lib/escapes';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';
import { HeroFilm } from './HeroFilm';
import { LogoMoment } from './LogoMoment';
import { WaitlistLink } from './WaitlistLink';
import { StickyCta } from '@/components/site/StickyCta';
import { Kicker } from '@/components/site/Kicker';

// One centred column over the film: headline, the prize line, chip, button, the founding
// friends line. Snow on a heavy scrim; the accent fills the call to action. Every figure is read
// from config and the venue is unnamed until permission exists. The escape page passes its
// own headline (the destination) so it does not repeat the home hero. After the logo
// moment the hero is complete: every line visible at once, one viewport tall, no scroll
// dependency.
export function Hero({ escape = hampshire, moment = true, headline }: { escape?: Escape; moment?: boolean; headline?: string }) {
  const venueLine =
    escape.venue.name && escape.venue.permissionGranted
      ? `Win an escape to ${escape.venue.name}.`
      : 'Win an escape to one of England’s finest country houses.';

  const sweetener = prizeLine(escape);

  const chip = `${compliance.noRollover ? 'One winner guaranteed. ' : ''}Only ${count(escape.cap)} entries available.`;

  const iconSvg = readFileSync(path.join(process.cwd(), 'public', 'brand', 'icon.svg'), 'utf8');

  return (
    <section data-hero className="relative isolate grid min-h-dvh grid-rows-[1fr_auto_1fr_auto] text-snow">
      {moment ? <LogoMoment iconSvg={iconSvg} /> : null}
      <StickyCta />
      <HeroFilm media={escape.media} />

      <div className="relative z-30 row-start-2 px-6 pt-24 pb-8 md:px-10">
        <div className="mx-auto flex max-w-[44rem] flex-col items-center gap-5 text-center">
          {escape.cadence.announced ? <Kicker tone="film">Coming {escape.cadence.announced}.</Kicker> : null}
          <h1 data-hero-line className="display text-balance text-[2.5rem] md:text-[4.25rem]">
            {headline ?? venueLine}
          </h1>
          <p className="text-base md:text-lg">
            {sweetener}
          </p>
          <p className="w-full border border-snow/60 px-3 py-2 text-sm md:w-auto">
            {chip}
          </p>
          <div data-hero-cta className="flex w-full flex-col items-center gap-4 md:w-auto">
            <WaitlistLink className="btn inline-flex w-full items-center justify-center bg-accent px-6 py-3.5 text-base font-medium text-ink md:w-auto">
              Secure your place
            </WaitlistLink>
            <p className="text-sm text-snow/85">Founding friends enter first, before the public.</p>
          </div>
        </div>
      </div>

      <div className="hero-strip relative z-30 row-start-4 border-t border-snow/20 px-6 py-3 md:px-10">
        <ComplianceStrip />
      </div>
    </section>
  );
}
