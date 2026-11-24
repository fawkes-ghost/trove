import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { escape, worstCaseOdds } from '@/config/prize';
import { escapes, prizeLine, reelStills, statusLabel } from '@/lib/escapes';

export const metadata: Metadata = {
  title: 'Escapes',
  description: `Every Trove escape, past and coming up. One prize per draw and a fixed number of entries. ${escape.charity.localityStatement}`,
  alternates: { canonical: '/escapes' },
};

// A vertical list, not a card grid. Each row: the escape's first photograph, destination,
// nights, prize value, odds, status, one line of the locality statement. Without a photograph the row takes the film's poster, and without that
// the gradient.
export default function EscapesPage() {
  return (
    <main className="page">
      <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">Escapes.</h1>
      <ol className="mt-12 flex flex-col md:mt-16">
        {escapes.map((item) => {
          const [photograph] = reelStills(item);
          return (
          <li key={item.slug} className="rule-t py-8 md:py-10">
            <Link href={`/escapes/${item.slug}`} className="grid gap-6 md:grid-cols-[18rem_1fr] md:gap-10">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink/10">
                {photograph ? (
                  <Image src={photograph.src} alt={photograph.alt} fill sizes="(min-width: 768px) 18rem, 100vw" className="object-cover" placeholder={photograph.blur ? 'blur' : 'empty'} blurDataURL={photograph.blur} />
                ) : item.media.poster ? (
                  <img src={item.media.poster} alt={item.media.posterAlt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                ) : (
                  <div className="h-full w-full bg-[linear-gradient(180deg,#4F4256_0%,#8E6A6A_34%,#D39A72_56%,#3B3631_80%,#1A1917_100%)]" />
                )}
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="display text-[2rem] md:text-[2.5rem]">{item.destination}.</h2>
                <p className="text-[11px] text-ink/60">{statusLabel(item.status)}</p>
                <p className="text-lg">{prizeLine(item)}</p>
                <p className="text-base">Your chance with one entry: at least {worstCaseOdds(item)}.</p>
                <p className="text-base text-ink/70">{item.charity.localityStatement}</p>
              </div>
            </Link>
          </li>
          );
        })}
      </ol>
    </main>
  );
}
