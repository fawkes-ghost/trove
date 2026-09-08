import Link from 'next/link';
import { escape as hampshire, worstCaseOdds, type Escape } from '@/config/prize';
import { prizeLine } from '@/lib/escapes';

// The open escape as one card: the poster, the destination, the prize line, the odds and
// the link to its page. Every line is read from config; no motion.
export function EscapeCard({ escape = hampshire }: { escape?: Escape }) {
  const href = `/escapes/${escape.slug}`;
  return (
    <section id="escape" className="border-t border-ink/15 px-6 py-24 md:px-10 md:py-32">
      <div className="grid gap-8 md:grid-cols-[minmax(0,32rem)_minmax(0,40rem)] md:gap-16">
        <Link href={href} className="block aspect-[4/3] w-full overflow-hidden bg-ink/10">
          {escape.media.poster ? (
            <img src={escape.media.poster} alt={escape.media.posterAlt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(180deg,#4F4256_0%,#8E6A6A_34%,#D39A72_56%,#3B3631_80%,#1A1917_100%)]" />
          )}
        </Link>
        <div className="flex flex-col justify-center">
          <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">{escape.destination}.</h2>
          <p className="mt-6 text-lg">{prizeLine(escape)}</p>
          <p className="mt-3 text-lg">Worst-case odds are {worstCaseOdds(escape)} with one entry.</p>
          <p className="mt-8 text-lg">
            <Link href={href} className="underline decoration-ink/30 decoration-1 underline-offset-8 hover:decoration-ink">
              See the {escape.destination} escape.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
