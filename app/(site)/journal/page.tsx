import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { journal, journalPath } from '@/lib/journal';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Places worth the journey, and in time each draw’s result and where the money went.',
  alternates: { canonical: '/journal' },
};

// A list, newest first: each piece is its first photograph, its title and one line. Results
// and where the money went join it after the first draw.
export default function Page() {
  return (
    <main>
      <section className="page">
        <div className="max-w-[40rem]">
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">Journal.</h1>
          <p className="mt-6 text-lg">Places worth the journey. After the first draw we’ll publish every result here, and where the money went.</p>
        </div>
        <ul className="mt-12 flex flex-col">
          {journal.map((piece) => (
            <li key={piece.slug} className="rule-t py-8">
              <Link href={journalPath(piece)} className="grid items-center gap-6 sm:grid-cols-[12rem_minmax(0,34rem)] sm:gap-10">
                <div className="plate aspect-[4/5] w-full max-w-[12rem]">
                  <Image src={piece.places[0].still.src} alt={piece.places[0].still.alt} fill sizes="12rem" className="object-cover" placeholder="blur" blurDataURL={piece.places[0].still.blur} />
                </div>
                <div>
                  <h2 className="display text-[1.75rem] leading-tight underline-offset-4 hover:underline md:text-[2.25rem]">{piece.title}</h2>
                  <p className="mt-3 text-base text-ink/70">{piece.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
