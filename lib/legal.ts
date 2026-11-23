import { readFileSync } from 'node:fs';
import path from 'node:path';
import { compliance, economics, escape, spendCeiling, worstCaseOdds } from '@/config/prize';
import { count, gbp, numberWord, percent, sentenceCase } from '@/lib/format';
import { signposting } from '@/lib/routes';
import { slug } from '@/lib/slug';
import { contactEmail } from '@/lib/site';
import { organisation } from '@/config/organisation';

// Every figure the legal documents state, read from config. The MDX files import this and
// never type a number.
// The promoter as the legal documents name it, built from config/organisation.ts so the
// company's details are written in one place.
function promoterLine(): string {
  const { legalName, companyNumber, address } = organisation;
  if (!legalName || !companyNumber || !address) return 'Trove [promoter details to follow]';
  return `${legalName}, trading as Trove, a company registered in England and Wales with company number ${companyNumber}, whose registered office is at ${address.streetAddress}, ${address.addressLocality} ${address.postalCode}`;
}

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
  stayWindow: escape.prize.stayWindow,
  datesOffered: numberWord(escape.prize.datesOffered),
  longstopDays: String(escape.cadence.longstopDays),
  charityShare: percent(economics.charityShareOfGross),
  beneficiary: escape.charity.beneficiary ?? 'a partner named once the agreement is signed',
  // The same giving line the site uses, so the terms and the pages never say it two ways.
  givingLine: `${percent(economics.charityShareOfGross)} of every paid entry goes to local charities protecting the ${escape.destination} countryside.`,
  postalAddress: compliance.freePostalRoute.address ?? 'the free entry address published on the free entry by post page before entries open',
  creditCardMonthlyCap: gbp(compliance.dcmsVoluntaryCode.creditCardMonthlyCap),
  gamCare: signposting.GamCare,
  gambleAware: signposting.GambleAware,
  contactEmail,
  promoter: promoterLine(),
  significantConditionsPath: compliance.significantConditionsPath,
};


// The second-level headings of a legal document, for the contents column.
export function headingsOf(file: string): { id: string; text: string }[] {
  const source = readFileSync(path.join(process.cwd(), 'content', 'legal', file), 'utf8');
  return [...source.matchAll(/^## (.+)$/gm)].map((m) => ({ id: slug(m[1]), text: m[1] }));
}
