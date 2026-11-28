import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { closerToHome, journal, journalPath, journalPiece } from '@/lib/journal';
import { escape } from '@/config/prize';
import { wordmarkSource } from '@/components/brand/Marks';
import { WaitlistForm } from '@/components/waitlist/WaitlistForm';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';
import { escapeName } from '@/lib/escapes';

export function generateStaticParams() {
  return journal.map((piece) => ({ slug: piece.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const piece = journalPiece((await params).slug);
  if (!piece) return {};
  return { title: piece.title.replace(/\.$/, ''), description: piece.description, alternates: { canonical: journalPath(piece) } };
}

// A journal piece: a heading, two lines and a list of the places, then each place in turn. A
// place is one tall photograph that stays in view on a wide screen while its guide scrolls
// beside it (why go, what to do, what to eat, where to base yourself, when, how to get there,
// what most people miss), then two more photographs side by side. The photographs are the
// page; nothing moves but their fade as they arrive. It ends where Trove begins, with the
// first escape and the founding friends form, whose signups are stored against this piece.
function Part({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rule-t pt-5">
      <h3 className="text-sm font-medium text-ink/70">{label}</h3>
      <div className="mt-2 text-base leading-relaxed">{children}</div>
    </div>
  );
}

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
            <nav aria-label="In this guide" className="mt-8">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-base">
                {piece.places.map((place) => (
                  <li key={place.id}>
                    <a href={`#${place.id}`} className="underline underline-offset-4">
                      {place.name.replace(/\.$/, '')}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <div className="page-body flex flex-col gap-20 md:gap-28" data-journal-places>
          {piece.places.map((place, index) => (
            <section key={place.id} id={place.id} className="scroll-mt-24" data-journal-place>
              <div className="grid items-start gap-8 md:grid-cols-[minmax(0,30rem)_minmax(0,34rem)] md:gap-14">
                <div className="plate aspect-[4/5] md:sticky md:top-24">
                  <Image src={place.still.src} alt={place.still.alt} fill sizes="(min-width: 768px) 30rem, 100vw" className="object-cover" placeholder="blur" blurDataURL={place.still.blur} priority={index === 0} />
                </div>
                <div>
                  <h2 className="display text-[2rem] leading-tight md:text-[2.75rem]">{place.name}</h2>
                  <p className="display mt-3 text-[1.375rem] leading-snug text-ink/80">{place.standfirst}</p>
                  <div className="mt-6 flex flex-col gap-4 text-lg">
                    {place.why.map((line) => (
                      <p key={line.slice(0, 24)}>{line}</p>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-col gap-5">
                    <Part label="What to do">
                      <dl className="flex flex-col gap-4">
                        {place.do.map(([what, detail]) => (
                          <div key={what}>
                            <dt className="font-medium">{what}</dt>
                            <dd className="mt-1">{detail}</dd>
                          </div>
                        ))}
                      </dl>
                    </Part>
                    <Part label="What to eat">{place.eat}</Part>
                    <Part label="Where to base yourself">{place.base}</Part>
                    <Part label="When to go">{place.when}</Part>
                    <Part label="Getting there">{place.how}</Part>
                    <Part label="What most people miss">{place.tip}</Part>
                  </div>
                </div>
              </div>
              <div className="mt-10 grid max-w-[66rem] grid-cols-2 gap-4 md:mt-14 md:gap-6">
                {place.more.map((still) => (
                  <figure key={still.src} className="m-0">
                    <div className="plate aspect-[4/5]">
                      <Image src={still.src} alt={still.alt} fill sizes="(min-width: 768px) 33rem, 50vw" className="object-cover" placeholder="blur" blurDataURL={still.blur} />
                    </div>
                    {still.caption ? <figcaption className="mt-2 text-sm text-ink/70">{still.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
      <section id="waitlist" className="scroll-mt-24 rule-t section">
        <div className="max-w-[40rem]">
          <h2 className="display text-balance heading-section">Closer to home.</h2>
          <p className="mt-6 text-lg">
            {closerToHome()}{' '}
            <Link href={`/escapes/${escape.slug}`} className="underline underline-offset-4">
              See {escapeName(escape)}
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
