import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { slug } from '@/lib/slug';

// Typography for the legal documents: measure under 70 characters, headings in Fraunces,
// numbered clauses as ordered lists. Internal links go through next/link.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]" {...props} />,
    h2: ({ children, ...props }) => (
      <h2 id={slug(String(children))} className="display mt-14 scroll-mt-28 text-[1.75rem] md:text-[2.25rem]" {...props}>
        {children}
      </h2>
    ),
    h3: (props) => <h3 className="mt-8 text-lg font-medium" {...props} />,
    p: (props) => <p className="mt-4 text-base leading-relaxed" {...props} />,
    ol: (props) => <ol className="mt-4 flex list-decimal flex-col gap-2 pl-6 text-base leading-relaxed" {...props} />,
    ul: (props) => <ul className="mt-4 flex list-disc flex-col gap-2 pl-6 text-base leading-relaxed" {...props} />,
    li: (props) => <li className="pl-1" {...props} />,
    a: ({ href = '', ...props }) =>
      href.startsWith('/') ? <Link href={href} className="underline underline-offset-4" {...props} /> : <a href={href} className="underline underline-offset-4" rel="noopener" {...props} />,
    strong: (props) => <strong className="font-medium" {...props} />,
    ...components,
  };
}
