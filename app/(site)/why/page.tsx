import type { Metadata } from 'next';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { founder, whyHeading, whyParagraphs } from '@/lib/why';

export const metadata: Metadata = {
  title: 'Why Trove',
  description: 'Why Trove exists: a fair draw for a great English escape, and something left behind where it lands.',
  alternates: { canonical: '/why' },
};

// The founder's words and one portrait. Licensed imagery only: the portrait renders
// once the file is in public/media; until then the frame says what belongs there.
export default function WhyPage() {
  const hasPortrait = existsSync(path.join(process.cwd(), 'public', founder.portrait));
  return (
    <main className="px-6 pt-28 pb-24 md:px-10 md:pt-36 md:pb-32">
      <div className="grid gap-12 md:grid-cols-[minmax(0,40rem)_minmax(16rem,24rem)] md:gap-20">
        <article>
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">{whyHeading}</h1>
          <div className="mt-10 flex flex-col gap-6 text-lg">
            {whyParagraphs().map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-10 text-lg">
            {founder.name}.
            <br />
            {founder.role}.
          </p>
        </article>
        <aside className="md:pt-24">
          {hasPortrait ? (
            <img src={founder.portrait} alt={`${founder.name}, founder of Trove`} className="aspect-[4/5] w-full max-w-[64vh] object-cover" loading="lazy" decoding="async" />
          ) : (
            <div className="flex aspect-[4/5] w-full max-w-[64vh] items-end border border-ink/20 bg-ink/5 p-4" role="img" aria-label="Portrait of the founder, licensed photograph" data-placeholder="image">
              <p className="font-mono text-[11px] text-ink/60">Portrait, licensed photograph. Drop it at public{founder.portrait}.</p>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
