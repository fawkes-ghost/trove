import { economics, escape } from '@/config/prize';
import { percent } from '@/lib/format';

// The mission section on the home page, in the founder's words. The share of entry sales
// and the destination render from config.
export const missionHeading = 'Why we do this.';

export function missionParagraphs(): string[] {
  return [
    'The finest places in this country, and the wild places beyond it, are out of reach for almost everyone who would love them most. Trove exists to hand one of them to someone, fairly, and to leave the place better for it.',
    `${percent(economics.charityShareOfGross)} of every entry goes to local charities protecting the countryside you escape to. We start in ${escape.destination}. The wild places of the world come next.`,
  ];
}
