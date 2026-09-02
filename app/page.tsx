import { escape, worstCaseOdds } from '@/config/prize';
import { gbp } from '@/lib/format';
import { Icon, Wordmark } from '@/components/brand/Marks';

// Scaffold placeholder. Every figure below is read from config/prize.ts.
export default function Home() {
  const rows: [string, string][] = [
    ['Destination', escape.destination],
    ['Prize value', gbp(escape.prize.value)],
    ['Cash', gbp(escape.prize.cash)],
    ['Entry price', gbp(escape.entry.price)],
    ['Worst-case odds', worstCaseOdds(escape)],
  ];

  return (
    <main className="p-6 font-mono text-sm">
      <p>/</p>
      <div className="mt-6 flex items-center gap-[10px]">
        <Icon height={28} />
        <Wordmark height={22} />
      </div>
      <dl className="mt-6 grid max-w-sm grid-cols-2 gap-y-1">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
