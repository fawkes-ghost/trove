import { escape } from '@/config/prize';
import { numberWord } from '@/lib/format';

// Why Trove exists, in the founder's words, verbatim. The nights and the destination render
// from config and read exactly as written. "Fifteen per cent" is the founder's prose and is
// left as prose on purpose: check:figures exemption, the share lives in
// economics.charityShareOfGross and every figure surface reads it from there. The Amazon,
// the Serengeti and Antarctica are ambition, not named prizes.
export const whyHeading = 'Why Trove exists.';

export function whyParagraphs(): string[] {
  return [
    'Some of the finest places in Britain, and the wild places beyond it, stay out of reach for almost everyone. A great house in the English countryside. A hotel at the end of a road that stops. A camp at the edge of the savannah, where you hear lions after dark. These are real places, and they sit where luxury and wilderness meet. Nearly all of them are exclusive, and nearly all of them are expensive.',
    'They are also under pressure. Chalk streams run low and are fouled by what we let into them. Woodland thins. Further away, the reefs and forests that make a wild place wild are fighting to survive, and the people who live beside them are usually the ones holding the line.',
    'We think both problems have one answer. Open the places up, one person at a time, and make every escape pay something back to the ground it stands on: the community that lives there and the land it protects.',
    'That is Trove. Each draw offers one escape to one winner, guaranteed. Fifteen per cent of every pound entered goes directly, in cash, to a local charity partner at the destination, and after every draw we publish what was given. The winner arrives knowing the place they are standing in has already been helped by their being there.',
    `We begin in ${escape.destination}, with ${numberWord(escape.nights)} nights at one of England’s finest country houses. As we grow, we want the escapes to go wilder and further: a lodge in the Amazon, a camp in the Serengeti, and one day the wildest place of all, Antarctica. The larger the escape, the more we can give to the ground beneath it.`,
    'Before we offer any escape, we find a charity partner rooted in that destination, one where our money goes furthest in protecting the land and the people who depend on it.',
    'One escape, one winner, and a place left better than we found it.',
  ];
}

export const founder = { name: 'Stefan Bateson', role: 'Founder', portrait: '/media/founder.jpg' };
