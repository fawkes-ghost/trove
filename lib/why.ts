import { compliance, economics, escape } from '@/config/prize';
import { numberWord, percent } from '@/lib/format';

// Why Trove exists, in the founder's voice, made plainer at his request (21 November 2026).
// The nights and the destination render from config. The Amazon, the Serengeti and
// Antarctica are ambition, not named prizes.
export const whyHeading = 'Why Trove exists.';

export function whyParagraphs(): string[] {
  return [
    'The best places to stay in the world, from country houses hidden in English valleys to safari camps in Africa, are out of reach for most people. They cost too much, and most of us never hear about them.',
    'Many of these places are also under pressure. Chalk streams run low and dirty. Woods are thinning. Further afield, reefs and forests are disappearing, and the people who live beside them do most of the work to protect them.',
    `Trove tries to help with both. Each draw has one escape and one winner.${compliance.noRollover ? ' There is always a winner.' : ''} ${percent(economics.charityShareOfGross)} of every paid entry goes to local charities where the escape is, and after every draw we publish exactly what we gave.`,
    `We’re starting in ${escape.destination}, with ${numberWord(escape.nights)} nights at one of England’s finest country houses. As we grow, we want to go further: a lodge in the Amazon, a camp in the Serengeti, and one day Antarctica. The bigger the escape, the more we can give.`,
    'Before we offer any escape, we find a local charity there that will make the money count.',
  ];
}

export const founder = { name: 'Stefan Bateson', role: 'Founder', portrait: '/media/founder.jpg' };
