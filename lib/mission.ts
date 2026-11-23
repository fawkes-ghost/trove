import { economics } from '@/config/prize';
import { percent } from '@/lib/format';

// The mission panel on the home page, in the founder's words. The share renders from config.
export const missionKicker = 'Why we do this.';
export const missionStatement = 'Someone wins a trip they’d never normally book, and the place they visit gets something back.';
export const missionGivingShare = percent(economics.charityShareOfGross);
export const missionGivingLine = 'of every paid entry goes to local charities looking after the countryside you visit.';
