import type { Escape } from '@/config/prize';
import { gbp } from '@/lib/format';

// Directly under the escape hero: one mono row, ink on snow, a rule above and below. The
// nights, the guests, the cash and the prize value, all from config. Two by two on narrow
// screens. No icons.
export function PrizeStrip({ escape }: { escape: Escape }) {
  const items = [
    { figure: String(escape.nights), unit: escape.nights === 1 ? 'night' : 'nights' },
    { figure: String(escape.party), unit: escape.party === 1 ? 'guest' : 'guests' },
    { figure: gbp(escape.prize.cash), unit: 'cash' },
    { figure: gbp(escape.prize.value), unit: 'prize' },
  ];
  return (
    <section aria-label="The prize in figures" className="rule-t rule-b px-6 md:px-10" data-prize-strip>
      <dl className="grid grid-cols-2 md:grid-cols-4">
        {items.map((item, i) => (
          <div key={item.unit} className={`py-5 font-mono text-base ${i % 2 === 1 ? 'rule-l pl-6' : ''} ${i >= 2 ? 'rule-t md:rule-t-0' : ''} ${i > 0 ? 'md:rule-l md:pl-6' : ''}`}>
            <dd className="inline text-[1.5rem] leading-none">{item.figure}</dd> <dt className="inline text-ink/70">{item.unit}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
