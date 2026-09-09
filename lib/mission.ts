import { economics } from '@/config/prize';
import { percent } from '@/lib/format';

// The mission panel on the home page, in the founder's words. The share renders from config.
export const missionKicker = 'Why we do this.';
export const missionStatement = 'We hand extraordinary escapes to ordinary people, fairly, and leave the places they visit better than we found them.';
export const missionGivingShare = percent(economics.charityShareOfGross);
export const missionGivingLine = 'of every entry goes to local charities protecting the countryside you escape to.';
