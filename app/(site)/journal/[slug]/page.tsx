import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { closerToHome, journal, journalPath, journalPiece } from '@/lib/journal';
import { escape } from '@/config/prize';
import { wordmarkSource } from '@/components/brand/Marks';
import { WaitlistForm } from '@/components/waitlist/WaitlistForm';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';

export function generateStaticParams() {
  return journal.map((piece) => ({ slug: piece.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const piece = journalPiece((await params).slug);
  if (!piece) return {};
  return { title: piece.title.replace(/\.$/, ''), description: piece.description, alternates: { canonical: journalPath(piece) } };
}

// A journal piece: a heading, two lines, then the places one after another, each a tall
// photograph with its name, a few sentences and when to go. The photographs are the page;
// nothing moves except their fade as they arrive. It ends where Trove begins, with the first
// escape and the founding friends form, whose signups are stored against this piece.
export default async function JournalPiecePage({ params }: { params: Promise<{ slug: string }> }) {
  const piece = journalPiece((await params).slug);
  if (!piece) notFound();
  return (
    <main>
      <article>
        <header className="page-head">
          <div className="max-w-[44rem]">
            <p className="text-sm font-medium text-ink/70">
              <Link href="/journal" className="underline underline-offset-4">
                Journal
              </Link>
            </p>
            <h1 className="display mt-4 text-balance text-[2.5rem] md:text-[3.5rem]">{piece.title}</h1>
            <div className="mt-6 flex flex-col gap-3 text-lg">
              {piece.intro.map((line) => (
                <p key={line.slice(0, 24)}>{line}</p>
              ))}
            </div>
          </div>
        </header>
        <ol className="page-body flex flex-col gap-16 md:gap-24" data-journal-places>
          {piece.places.map((place, index) => (
            <li key={place.name} className="grid items-end gap-6 md:grid-cols-[minmax(0,34rem)_minmax(0,26rem)] md:gap-14">
              <div className="plate aspect-[4/5]">
                <Image src={place.still.src} alt={place.still.alt} fill sizes="(min-width: 768px) 34rem, 100vw" className="object-cover" placeholder="blur" blurDataURL={place.still.blur} priority={index === 0} />
              </div>
              <div className="md:pb-2">
                <h2 className="display text-[2rem] leading-tight md:text-[2.5rem]">{place.name}</h2>
                <p className="mt-4 text-lg">{place.text}</p>
                <p className="mt-3 text-base text-ink/70">{place.when}</p>
              </div>
            </li>
          ))}
        </ol>
      </article>
      <section id="waitlist" className="scroll-mt-24 rule-t section">
        <div className="max-w-[40rem]">
          <h2 className="display text-balance heading-section">Closer to home.</h2>
          <p className="mt-6 text-lg">
            {closerToHome()}{' '}
            <Link href={`/escapes/${escape.slug}`} className="underline underline-offset-4">
              See the {escape.destination} escape
            </Link>
            .
          </p>
          <p className="mt-4 text-lg">Join the founding friends list and we’ll email you once, on the day entries open.</p>
          <div className="mt-8">
            <WaitlistForm sourceChannel={piece.channel} idPrefix="journal-waitlist" wordmarkSvg={wordmarkSource()} />
          </div>
          <p className="mt-4 text-sm text-ink/70">
            You can unsubscribe at any time.{' '}
            <Link href="/legal/privacy" className="underline underline-offset-4">
              Privacy
            </Link>
            .
          </p>
          <ComplianceStrip className="mt-6 text-ink/70" />
        </div>
      </section>
    </main>
  );
}
