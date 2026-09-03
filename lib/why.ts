import { economics, escape } from '@/config/prize';
import { numberWord, sentenceCase } from '@/lib/format';

// Why Trove exists, in the founder's words. One source: the page shows all four
// paragraphs, the home page shows the second and the fourth. The share of entry sales
// renders from config.
export const whyHeading = 'Why Trove exists.';

export function whyParagraphs(): string[] {
  const pence = Math.round(economics.charityShareOfGross * 100);
  return [
    'Some of the finest places in this country sit just out of reach for most of us. A winter weekend at a great English country house is the kind of thing you promise yourself, look up the rates for, and quietly close the tab on.',
    'Trove exists to hand that weekend to someone, fairly. One escape at a time. A capped draw, so you always know exactly how many entries you are up against. Published worst-case odds. A free postal route with identical odds. One winner, every time, with no rollovers and no small print that moves.',
    `And every draw leaves something behind where it lands. ${sentenceCase(numberWord(pence))} pence in every pound of entry sales goes to community and countryside causes at the destination, and after every draw we publish what was given. That is not a feature of Trove. It is the reason it exists.`,
    `We are starting close to home, in ${escape.destination}, on purpose. Prove the draw is honest, prove the money lands where we say it will, and earn the right to go further. The escapes will grow wilder and the causes bigger, but the rules will never change: capped entries, published odds, a guaranteed winner, and something left behind.`,
  ];
}

export const founder = { name: 'Stefan Bateson', role: 'Founder', portrait: '/media/founder.jpg' };
