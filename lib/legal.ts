import { readFileSync } from 'node:fs';
import path from 'node:path';
import { compliance, economics, escape, spendCeiling, worstCaseOdds } from '@/config/prize';
import { count, gbp, numberWord, sentenceCase } from '@/lib/format';
import { signposting } from '@/lib/routes';
import { slug } from '@/lib/slug';

// Every figure the legal documents state, read from config. The MDX files import this and
// never type a number.
const pence = Math.round(economics.charityShareOfGross * 100);

export const t = {
  destination: escape.destination,
  escapeName: `the ${escape.destination} escape`,
  minimumAge: String(compliance.minimumAge),
  residency: compliance.residency,
  cap: count(escape.cap),
  worstCaseOdds: worstCaseOdds(escape),
  entryPrice: gbp(escape.entry.price),
  bundles: escape.entry.bundles.map((b) => `${sentenceCase(numberWord(b.entries))} ${b.entries === 1 ? 'entry' : 'entries'} for ${gbp(b.price)}`),
  maxPerPerson: count(escape.entry.maxPerPerson),
  spendCeiling: gbp(spendCeiling(escape)),
  nights: numberWord(escape.nights),
  party: numberWord(escape.party),
  prizeValue: gbp(escape.prize.value),
  prizeCash: gbp(escape.prize.cash),
  prizeDescription: escape.prize.description,
  cashAlternative: gbp(escape.prize.cashAlternative),
  winnerResponseDays: String(escape.prize.winnerResponseDays),
  claimWindowDays: String(escape.prize.claimWindowDays),
  stayValidMonths: String(escape.prize.stayValidMonths),
  longstopDays: String(escape.cadence.longstopDays),
  charityPence: `${sentenceCase(numberWord(pence))} pence`,
  charityShare: `${pence} per cent`,
  beneficiary: escape.charity.beneficiary ?? 'a partner named once the agreement is signed',
  localityStatement: escape.charity.localityStatement,
  postalAddress: compliance.freePostalRoute.address ?? 'the free entry address published on the free entry by post page once the registered office exists',
  creditCardMonthlyCap: gbp(compliance.dcmsVoluntaryCode.creditCardMonthlyCap),
  gamCare: signposting.GamCare,
  gambleAware: signposting.GambleAware,
  contactEmail: 'hello@trovewild.com',
  promoter: 'Trove [promoter details to follow incorporation: company name, number and registered office]',
  significantConditionsPath: compliance.significantConditionsPath,
};


// The second-level headings of a legal document, for the contents column.
export function headingsOf(file: string): { id: string; text: string }[] {
  const source = readFileSync(path.join(process.cwd(), 'content', 'legal', file), 'utf8');
  return [...source.matchAll(/^## (.+)$/gm)].map((m) => ({ id: slug(m[1]), text: m[1] }));
}
