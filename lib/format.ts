import type { Money } from '@/config/prize';

// Pounds are formatted here and nowhere else. app/ and components/ never write a pound sign.
export function gbp(value: Money): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}
