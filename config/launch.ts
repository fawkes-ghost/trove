// config/launch.ts
// What is true about the site today, in one place. The footer says each of these in plain
// words, so a visitor always knows what is real and what is still being finished. Flip a
// line the day it becomes true; the copy follows without an edit.
export const launch = {
  // The terms, key terms and playing responsibly pages carry "Draft for solicitor review.
  // Not yet in force." until this is true. Stefan sets it once he has signed the terms off.
  termsInForce: false,
  // The film and stills are AI-generated stand-ins for mood, not the escape itself. Set true
  // once every one is replaced with licensed photography and film.
  imageryLicensed: false,
  // The entry flow (choose, details, pay) is built but off. Off, its routes do not exist on
  // the live site; previews show it so it can be reviewed. Turn on only once the terms are in
  // force, the legal opinion exists and a payment provider has accepted the business.
  entryFlowLive: false,
} as const;

export const draftLabel = 'Draft for solicitor review. Not yet in force.';
