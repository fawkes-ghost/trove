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
    `We’re starting close to home, with ${numberWord(escape.nights)} nights at one of England’s finest country hotels. As we grow, we want to go further: a lodge in the Amazon, a camp in the Serengeti, and one day Antarctica. The bigger the escape, the more we can give.`,
    'Before we offer any escape, we find a local charity there that will make the money count.',
  ];
}

export const founder = {
  name: 'Stefan Bateson',
  role: 'Founder',
  portrait: '/media/founder.jpg',
  // A 16px copy of the portrait, shown while the real one loads on a slow connection.
  portraitBlur: 'data:image/jpeg;base64,/9j/2wBDABIMDRANCxIQDhAUExIVGywdGxgYGzYnKSAsQDlEQz85Pj1HUGZXR0thTT0+WXlaYWltcnNyRVV9hnxvhWZwcm7/2wBDARMUFBsXGzQdHTRuST5Jbm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAYABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQAG/8QAJBAAAgEEAgAHAQAAAAAAAAAAAQMCAAQFERIhBhMUMUFRofH/xAAWAQEBAQAAAAAAAAAAAAAAAAABAAL/xAAYEQADAQEAAAAAAAAAAAAAAAAAARExIf/aAAwDAQACEQMRAD8A0GWzEsfcKQtJnNmjsnQHeqKzeQc7HF8WhLFkrmvkdT38xpjLWVtc3CJ3AJlD2AOgfrdA+IEoRYRQIsn5zORPPoa/v5WXR5B10luiPRMVzHepb6ozJWjL5Ai8hfCYIMO+td7qqqeCth//2Q==',
};
