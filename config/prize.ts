// config/prize.ts
// The only place a prize figure, entry price, cap, odds, charity share, destination
// or cadence is written. Components and copy read from here and never restate a number.
// Source of truth for the numbers: Notion, DRAW Headquarters, "19 CFO model and draw config".
// Change a value here, update Notion in the same commit.

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

export type Escape = {
  slug: string;                     // route segment, destination only
  destination: string;              // what the draw is called
  venue: {
    name: string | null;            // null until written permission from the venue exists
    permissionGranted: boolean;
    footageLicensed: boolean;       // no venue footage until this is true
  };
  nights: number;
  party: number;
  prize: {
    value: Money;                   // the figure published as the prize value
    stayBudget: Money;              // booked stay, bought as a voucher at close
    cash: Money;                    // paid to the winner in cash; covers travel, dinners, the experience
    contingency: Money;             // seasonality and rate movement
    cashAlternative: Money;         // if the winner declines the stay; below value, published in terms
    claimWindowDays: number;        // winner must confirm stay or cash within this window
    stayValidMonths: number;        // from claim, subject to availability and stated blackout dates
    description: string[];          // factual components, no adjectives
  };
  theme: {
    accent: string;                 // one accent per escape, drawn from the destination in season
  };
  media: {
    poster: string | null;          // first frame of the film, shown on first paint and under reduced motion
    loop: string | null;            // silent looping film; null falls back to the gradient
  };
  entry: {
    price: Money;                   // single entry
    bundles: EntryBundle[];         // must keep the cap multiple above economics.capMultipleMinimum
  };
  cap: number;                      // entries, paid and postal together
  cadence: {
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

export const escape: Escape = {
  slug: 'hampshire',
  destination: 'Hampshire',
  venue: { name: null, permissionGranted: false, footageLicensed: false },
  nights: 3,
  party: 2,
  prize: {
    value: 4000,
    stayBudget: 2300,               // 3 nights incl breakfast, VAT and 10% service, winter rate
    cash: 1300,                     // published as cash; the winner spends it on dinners, a treatment, the chauffeur, or not
    contingency: 400,
    cashAlternative: 3000,
    claimWindowDays: 90,
    stayValidMonths: 12,
    description: [
      'Three nights for two, breakfast included',
      '£1,300 in cash',
    ],
  },
  theme: { accent: '#D9455F' },     // rosehip, Hampshire in winter; provisional until the design plan is signed off
  media: {
    poster: '/media/hero-poster.jpg', // first visible frame of the loop below (frame zero is black), extracted once and committed
    // Serengeti placeholder, to be replaced by the Hampshire film once footage is licensed. Not the venue.
    loop: 'https://uvnhwgbqmwzzdvxxdgzm.supabase.co/storage/v1/object/public/media/hero-montage-desktop-v2-web-v3.mp4',
  },
  entry: {
    price: 5,
    bundles: [
      { entries: 1, price: 5 },
      { entries: 3, price: 14 },
      { entries: 5, price: 23 },
    ],
  },
  cap: 3000,
  cadence: { opens: null, longstop: null, longstopDays: 56 },
  charity: {
    shareOfGross: economics.charityShareOfGross,
    beneficiary: null,
    localityStatement: 'Fifteen pence in every pound goes to community and countryside causes in Hampshire.',
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

// Worst-case odds for a number of entries: the share of a full cap those entries hold,
// written as "1 in N" and rounded to the nearest whole number.
export function oddsForEntries(entries: number, e: Escape = escape): string {
  const held = Math.min(Math.max(Math.round(entries), 1), e.cap);
  return `1 in ${Math.round(e.cap / held).toLocaleString('en-GB')}`;
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
  if (e.prize.stayBudget + e.prize.cash + e.prize.contingency > e.prize.value) problems.push('prize components exceed published prize value');
  if (e.prize.cashAlternative >= e.prize.value) problems.push('cash alternative must be below the published prize value');
  if (e.venue.name && !e.venue.permissionGranted) problems.push('venue named without written permission');
  if (e.charity.beneficiary) problems.push('charity named before counsel cleared the commercial participator agreement');
  if (/\b(draw|trove)\s*\d+/i.test(e.destination + e.slug)) problems.push('draws are named by destination, never numbered');
  if (problems.length) throw new Error(`prize config: ${problems.join('; ')}`);
}
