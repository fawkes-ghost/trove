import type { Metadata } from 'next';
import Link from 'next/link';
import { escape, worstCaseOdds } from '@/config/prize';
import { escapes, prizeLine, statusLabel } from '@/lib/escapes';

export const metadata: Metadata = {
  title: 'Escapes',
  description: `Every Trove escape: open, coming and drawn. One prize per draw and a cap on entries. ${escape.charity.localityStatement}`,
  alternates: { canonical: '/escapes' },
};

// A vertical list, not a card grid. Each row: film still, destination, nights, prize value,
// odds, status, one line of the locality statement.
export default function EscapesPage() {
  return (
    <main className="px-6 pt-28 pb-24 md:px-10 md:pt-36 md:pb-32">
      <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">Escapes.</h1>
      <ol className="mt-12 flex flex-col md:mt-16">
        {escapes.map((item) => (
          <li key={item.slug} className="rule-t py-8 md:py-10">
            <Link href={`/escapes/${item.slug}`} className="grid gap-6 md:grid-cols-[18rem_1fr] md:gap-10">
              <div className="aspect-[4/3] w-full overflow-hidden bg-ink/10">
                {item.media.poster ? (
                  <img src={item.media.poster} alt={item.media.posterAlt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                ) : (
                  <div className="h-full w-full bg-[linear-gradient(180deg,#4F4256_0%,#8E6A6A_34%,#D39A72_56%,#3B3631_80%,#1A1917_100%)]" />
                )}
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[11px] text-ink/60">{statusLabel(item.status)}</p>
                <h2 className="display text-[2rem] md:text-[2.5rem]">{item.destination}.</h2>
                <p className="text-lg">{prizeLine(item)}</p>
                <p className="font-mono text-base">Worst-case odds are {worstCaseOdds(item)} with one entry.</p>
                <p className="text-base text-ink/70">{item.charity.localityStatement}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
