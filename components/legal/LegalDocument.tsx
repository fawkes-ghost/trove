import type { ReactNode } from 'react';

type Heading = { id: string; text: string };

// Two columns above 900px: a sticky contents column from the document's headings, the
// document at a measure under 70 characters. Below 900px the contents collapse into a
// disclosure at the top.
export function LegalDocument({ title, updated, headings, children }: { title: string; updated: string; headings: Heading[]; children: ReactNode }) {
  const contents = (
    <ol className="flex flex-col gap-2 text-sm">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a href={`#${heading.id}`} className="text-ink/70 hover:text-ink">
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <main className="px-6 pt-28 pb-24 md:px-10 md:pt-36 md:pb-32">
      <div className="grid gap-10 min-[900px]:grid-cols-[16rem_minmax(0,40rem)] min-[900px]:gap-16">
        <aside>
          <details className="min-[900px]:hidden">
            <summary className="cursor-pointer text-sm font-medium">Contents</summary>
            <div className="mt-4">{contents}</div>
          </details>
          <div className="hidden min-[900px]:sticky min-[900px]:top-28 min-[900px]:block">
            <p className="text-sm font-medium">Contents</p>
            <div className="mt-4">{contents}</div>
          </div>
        </aside>
        <article className="legal">
          <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">{title}</h1>
          <p className="mt-4 font-mono text-[11px] text-ink/60">{updated}</p>
          {children}
        </article>
      </div>
    </main>
  );
}
