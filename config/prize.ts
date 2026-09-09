// config/prize.ts
// The only place a prize figure, entry price, cap, odds, charity share, destination
// or cadence is written. Components and copy read from here and never restate a number.
// Source of truth for the numbers: Notion, DRAW Headquarters, "19 CFO model and draw config".
// Change a value here, update Notion in the same commit.

import { gbp, numberWord, percent, sentenceCase } from '../lib/format';

export type Money = number; // GBP, whole pounds unless stated

// ---------------------------------------------------------------------------
// Economics that apply to every escape. Change with a CFO note, not on a branch whim.
// ---------------------------------------------------------------------------
export const economics = {
  charityShareOfGross: 0.15,        // 15% of gross entry sales to the destination's community and countryside partners
  paymentProcessing: 0.025,         // blended card fee on gross
  postalShareOfCap: { plan: 0.135, stress: 0.30 }, // free postal entries inside the same cap
  capMultipleMinimum: 3.0,          // cap x blended entry price must be >= 3x prize value
  entryPriceOfPrizeValue: { min: 0.001, max: 0.002 }, // hero entry ~0.1% to 0.2% of prize value
  perPersonSpendCeiling: 500,       // GBP; maxPerPerson is the most entries that fit inside it at the single entry price
  cashAlternativeFloor: 0.6,        // the cash alternative is never less than this share of the published prize value
} as const;

// ---------------------------------------------------------------------------
// Compliance canon. These are not settings; they are terms the site must honour.
// ---------------------------------------------------------------------------
export const compliance = {
  minimumAge: 18,
  residency: 'UK' as const,
  freePostalRoute: {
    identicalOdds: true,
    insideSameCap: true,
    address: null as string | null, // set when the registered office exists
  },
  noRollover: true,                 // "One winner is guaranteed" is only sayable while this is true
  closeRule: 'cap-or-longstop' as const, // never publish a closing date and then extend it
  significantConditionsPath: '/legal/significant-conditions', // one click from every promotional surface (CAP 8.17)
  dcmsVoluntaryCode: {
    creditCardMonthlyCap: 250,      // GBP
    selfSetLimits: true,
    accountSuspensionAndClosure: true,
    signposting: ['GamCare', 'GambleAware'] as const,
  },
} as const;

// ---------------------------------------------------------------------------
// The escape. One hero escape at a time. Named by destination, never numbered.
// ---------------------------------------------------------------------------
export type EntryBundle = { entries: number; price: Money };
export type Still = {
  src: string;
  alt: string;
  venue: boolean;
  title: string | null;           // over the lower third of the reel, once the founder writes it
  caption: string | null;         // one sentence beneath the title
};

export type Escape = {
  slug: string;                     // route segment, destination only
  destination: string;              // what the draw is called
  venue: {
    name: string | null;            // null until written permission from the venue exists
    description: string | null;     // the house in a paragraph; stored here, rendered only when permissionGranted
    permissionGranted: boolean;
    footageLicensed: boolean;       // no venue footage until this is true
  };
  nights: number;
  party: number;
  prize: {
    value: Money;                   // the figure published as the prize value
    stayBudget: Money;              // booked stay, bought as a voucher at close
    transport: Money;               // booked chauffeur transfers, not exchangeable for cash
    cash: Money;                    // paid to the winner in cash, to spend as they choose
    contingency: Money;             // seasonality and rate movement
    cashAlternative: Money;         // if the winner declines the stay; below value, published in terms
    winnerResponseDays: number;     // days to answer the winner notification before the entry is redrawn
    claimWindowDays: number;        // winner must confirm stay or cash within this window
    stayValidMonths: number;        // from claim, subject to availability and stated blackout dates
    stayWindow: string;             // the season the stay is valid in, stated in terms
    description: string[];          // factual components in order: the stay, then the cash; no adjectives, every figure derived
  };
  theme: {
    accent: string;                 // one accent per escape, drawn from the destination in season
  };
  media: {
    poster: string | null;          // first frame of the film, shown on first paint and under reduced motion
    posterAlt: string;              // what the poster shows, truthfully, for alt text
    loop: string | null;            // silent looping film; null falls back to the gradient
    stills: Still[];                // licensed stills for the reel, in order; venue stills need venue.footageLicensed
  };
  entry: {
    price: Money;                   // single entry
    bundles: EntryBundle[];         // must keep the cap multiple above economics.capMultipleMinimum
    maxPerPerson: number;           // entries one person may hold in a draw, paid and postal together
  };
  cap: number;                      // entries, paid and postal together
  cadence: {
    announced: string | null;       // the month entries open, in words, shown as the hero kicker once the founder sets it
    opens: string | null;           // ISO date, set once
    longstop: string | null;        // ISO date, set once, never moved later
    longstopDays: number;           // planning length if longstop not yet fixed
  };
  charity: {
    shareOfGross: number;
    beneficiary: string | null;     // null until charity counsel clears the commercial participator agreement
    localityStatement: string;      // where the money goes, in fact form
  };
  status: 'planning' | 'waitlist' | 'open' | 'closed' | 'drawn';
};

// Words that identify the venue before permission exists. lib/venue-guard.ts fails the build
// if any appears outside this file.
export const unpublishedVenueTerms = ['Heckfield'] as const;

// Named once here so the description strings can restate them without a second literal.
const hampshireNights = 3;
const hampshireParty = 2;
const hampshireCash: Money = 1600;

export const escape: Escape = {
  slug: 'hampshire',
  destination: 'Hampshire',
  venue: {
    name: null,
    // Held here until permission; the build fails if the house's name appears anywhere but this file.
    description:
      'Heckfield Place is a Georgian house on 438 acres of Hampshire woodland and water, an hour or so from London. Its owner spent the best part of a decade restoring it, and the rooms are furnished from his own collection: the chair you sit in was chosen by him, not by a hotel. There is a cinema, and every afternoon there is tea and cake in the drawing room. The estate farms biodynamically, and the kitchen at Marle cooks what the farm and the market garden produce that week. The copper beeches are older than the house, and the arborists will walk you round them. In the evening there is a fire in the Moon Bar. It is a house people who could go anywhere choose to come back to, and for three nights you are invited to live its countryside life as a guest. It is the reason Trove begins in Hampshire.',
    permissionGranted: false,
    footageLicensed: false,
  },
  nights: hampshireNights,
  party: hampshireParty,
  prize: {
    value: 6500,
    stayBudget: 4550,               // 3 nights Chamber Room, Fri to Mon, priced at a Feb peak weekend incl breakfast, VAT and 10% service
    transport: 0,                   // no transfers in this escape; the winner travels as they choose
    cash: hampshireCash,            // paid to the winner in cash, to spend on the escape or not
    contingency: 350,
    cashAlternative: 4500,
    winnerResponseDays: 14,
    claimWindowDays: 90,
    stayValidMonths: 12,
    stayWindow: 'Friday to Monday between November and March, excluding 20 December to 3 January, subject to availability',
    description: [
      `${sentenceCase(numberWord(hampshireNights))} nights for you and your plus one, breakfast included`,
      `${gbp(hampshireCash)} in cash`,
    ],
  },
  theme: { accent: '#D9455F' },     // rosehip, Hampshire in winter; provisional until the design plan is signed off
  media: {
    poster: '/media/hero-poster.jpg', // first visible frame of the loop below (frame zero is black), extracted once and committed
    posterAlt: 'A lion cub beside a lioness in long grass at dusk. A placeholder still until the Hampshire film is licensed.',
    // A placeholder montage while the site is behind the gate, replaced by the licensed
    // Hampshire film before launch. The poster above is its first visible frame.
    loop: 'https://uvnhwgbqmwzzdvxxdgzm.supabase.co/storage/v1/object/public/media/hero-montage-desktop-v2-web-v3.mp4',
    // Frames of the same placeholder montage, until licensed Hampshire stills replace them.
    // None is venue imagery.
    stills: [
      { src: '/media/placeholder-still-1.jpg', alt: 'A placeholder still from the montage used while the Hampshire film is licensed.', venue: false, title: null, caption: null },
      { src: '/media/placeholder-still-2.jpg', alt: 'A placeholder still from the montage used while the Hampshire film is licensed.', venue: false, title: null, caption: null },
      { src: '/media/placeholder-still-3.jpg', alt: 'A placeholder still from the montage used while the Hampshire film is licensed.', venue: false, title: null, caption: null },
    ],
  },
  entry: {
    price: 8,
    bundles: [
      { entries: 1, price: 8 },
      { entries: 3, price: 23 },
      { entries: 5, price: 38 },
    ],
    maxPerPerson: 62,               // the most entries inside economics.perPersonSpendCeiling at the single entry price
  },
  cap: 3000,
  cadence: { announced: null, opens: null, longstop: null, longstopDays: 56 },
  charity: {
    shareOfGross: economics.charityShareOfGross,
    beneficiary: null,
    localityStatement: `${percent(economics.charityShareOfGross)} of every entry goes to local charities protecting the Hampshire countryside.`,
  },
  status: 'planning',
};

// ---------------------------------------------------------------------------
// Minis. On brand, tied to the destination, drawn from the same ledger rules.
// ---------------------------------------------------------------------------
export type Mini = Omit<Escape, 'nights' | 'party' | 'venue'> & { escapeSlug: string };

export const minis: Mini[] = [];    // populate when the first mini is costed; never AirPods

// ---------------------------------------------------------------------------
// Derived figures. Components call these; they never do the arithmetic themselves.
// ---------------------------------------------------------------------------
export function worstCaseOdds(e: Escape = escape): string {
  return `1 in ${e.cap.toLocaleString('en-GB')}`;
}

// Worst-case odds for a number of entries live in lib/odds.ts, which imports nothing from
// this file, so a client component can use them without pulling config into its bundle.
export { oddsForEntries } from '../lib/odds';

// The most one person can spend in a draw at the single entry price.
export function spendCeiling(e: Escape = escape): Money {
  return e.entry.maxPerPerson * e.entry.price;
}

export function blendedEntryPrice(e: Escape = escape, mixAtBundle = 0.5): Money {
  // Planning blend: half of paid entries bought singly, half via the largest bundle.
  const top = e.entry.bundles[e.entry.bundles.length - 1];
  const bundleUnit = top.price / top.entries;
  return e.entry.price * (1 - mixAtBundle) + bundleUnit * mixAtBundle;
}

export function paidEntriesAt(sellThrough: number, postal = economics.postalShareOfCap.plan, e: Escape = escape): number {
  return Math.round(e.cap * sellThrough * (1 - postal));
}

export function grossAt(sellThrough: number, postal = economics.postalShareOfCap.plan, e: Escape = escape): Money {
  return Math.round(paidEntriesAt(sellThrough, postal, e) * blendedEntryPrice(e));
}

export function netRevenueAt(sellThrough: number, postal = economics.postalShareOfCap.plan, e: Escape = escape): Money {
  const gross = grossAt(sellThrough, postal, e);
  return Math.round(gross * (1 - e.charity.shareOfGross - economics.paymentProcessing));
}

export function grossProfitAt(sellThrough: number, postal = economics.postalShareOfCap.plan, e: Escape = escape): Money {
  return netRevenueAt(sellThrough, postal, e) - e.prize.value;
}

export function breakEvenSellThrough(postal = economics.postalShareOfCap.plan, e: Escape = escape): number {
  const netPerFullCap = netRevenueAt(1, postal, e);
  return e.prize.value / netPerFullCap;
}

export function capMultiple(e: Escape = escape): number {
  return (e.cap * blendedEntryPrice(e)) / e.prize.value;
}

// Fails the build if the config breaks the economics or the canon.
export function assertEscape(e: Escape = escape): void {
  const problems: string[] = [];
  if (capMultiple(e) < economics.capMultipleMinimum) problems.push(`cap multiple ${capMultiple(e).toFixed(2)}x is below ${economics.capMultipleMinimum}x`);
  const ratio = e.entry.price / e.prize.value;
  if (ratio < economics.entryPriceOfPrizeValue.min || ratio > economics.entryPriceOfPrizeValue.max) problems.push(`entry price is ${(ratio * 100).toFixed(2)}% of prize value`);
  if (e.prize.stayBudget + e.prize.transport + e.prize.cash + e.prize.contingency !== e.prize.value) problems.push('prize components must sum exactly to the published prize value');
  if (e.prize.cashAlternative >= e.prize.value) problems.push('cash alternative must be below the published prize value');
  if (e.prize.cashAlternative < economics.cashAlternativeFloor * e.prize.value) problems.push(`cash alternative is below the floor of ${Math.round(economics.cashAlternativeFloor * 100)}% of the prize value`);
  if (e.venue.name && !e.venue.permissionGranted) problems.push('venue named without written permission');
  if (e.charity.beneficiary) problems.push('charity named before counsel cleared the commercial participator agreement');
  if (e.status === 'open' && !(compliance.freePostalRoute.address ?? '').trim()) problems.push('entries cannot open without a live free postal route address');
  if (/\b(draw|trove)\s*\d+/i.test(e.destination + e.slug)) problems.push('draws are named by destination, never numbered');
  const largestBundle = Math.max(...e.entry.bundles.map((b) => b.entries));
  if (e.entry.maxPerPerson < largestBundle) problems.push('per-person limit is below the largest bundle');
  if (e.entry.maxPerPerson >= e.cap) problems.push('per-person limit must be below the cap');
  if (e.entry.maxPerPerson !== Math.floor(economics.perPersonSpendCeiling / e.entry.price)) problems.push(`per-person limit must be the most entries inside the ${economics.perPersonSpendCeiling} spend ceiling, ${Math.floor(economics.perPersonSpendCeiling / e.entry.price)} at the current price`);
  if (problems.length) throw new Error(`prize config: ${problems.join('; ')}`);
}
