import { economics } from '@/config/prize';
import { percent } from '@/lib/format';

// The mission panel on the home page, in the founder's words (statement chosen 28 November 2026). The share renders from config.
export const missionKicker = 'Why we do this.';
export const missionStatement = 'A rare place made accessible to more than a handful of people, with the landscape around it left better off for the visit.';
export const missionGivingShare = percent(economics.charityShareOfGross);
export const missionGivingLine = 'of every paid entry goes to local charities looking after the countryside you visit.';
