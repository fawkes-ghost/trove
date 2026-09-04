import Link from 'next/link';
import { whyParagraphs } from '@/lib/why';

// Two paragraphs from the founder's page, the second and the fourth, from the same source.
export function WhyTrove() {
  const paragraphs = whyParagraphs();
  return (
    <section id="why" className="border-t border-ink/15 px-6 py-24 md:px-10 md:py-32">
      <div className="max-w-[40rem]">
        <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">Why Trove.</h2>
        <div className="mt-8 flex flex-col gap-6 text-lg">
          <p>{paragraphs[1]}</p>
          <p>{paragraphs[3]}</p>
        </div>
        <p className="mt-8 text-base">
          <Link href="/why" className="underline underline-offset-4">
            Why Trove exists, in full
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
