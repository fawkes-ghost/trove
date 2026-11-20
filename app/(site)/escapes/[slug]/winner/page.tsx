import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { escapes, getEscape, statusLabel } from '@/lib/escapes';

export function generateStaticParams() {
  return escapes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getEscape(slug);
  if (!item) return {};
  return {
    title: `${item.destination} result`,
    description: `The published result of the ${item.destination} draw: the winning entry, how it was drawn and what was given.`,
    alternates: { canonical: `/escapes/${item.slug}/winner` },
  };
}

// The result page. Until the draw has happened it says so plainly and lists exactly what
// will be published here, as the terms promise. The draw mechanism fills it in (build step 6).
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getEscape(slug);
  if (!item) notFound();

  const promised = [
    'The winning entry number.',
    'How it was drawn, with the record of the draw so anyone can check it.',
    'The winner’s first name and county.',
    'How many entries the draw held, paid and postal together.',
    'What was given to causes in the destination, and to whom.',
  ];

  return (
    <main>
      <section className="page">
        <div className="max-w-[40rem]">
          <p className="text-sm font-medium text-ink/70">{item.destination}. The result.</p>
          <h1 className="display mt-4 text-balance text-[2.5rem] md:text-[3.5rem]">
            {item.status === 'drawn' ? 'The result.' : 'Not drawn yet.'}
          </h1>
          <p className="mt-6 text-lg">{statusLabel(item.status)} When this escape is drawn, this page will publish:</p>
          <ul className="mt-6 flex flex-col">
            {promised.map((line) => (
              <li key={line} className="rule-t py-3 text-lg">
                {line}
              </li>
            ))}
          </ul>
          <p className="rule-t mt-2 pt-6 text-base">
            <Link href={`/escapes/${item.slug}`} className="underline underline-offset-4">
              Back to the {item.destination} escape
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
