import type { Money } from '@/config/prize';

// Pounds are formatted here and nowhere else. app/ and components/ never write a pound sign.
export function gbp(value: Money): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}

// Counts with UK thousands separators, for caps and entry totals.
export function count(value: number): string {
  return value.toLocaleString('en-GB');
}

const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

// Small numbers as words for prose ("three nights"); larger numbers stay numerals.
export function numberWord(value: number): string {
  return Number.isInteger(value) && value >= 0 && value < words.length ? words[value] : count(value);
}

export function sentenceCase(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
