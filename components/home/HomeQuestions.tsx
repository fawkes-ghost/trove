import Link from 'next/link';
import { escape as hampshire, type Escape } from '@/config/prize';
import { questionsFor } from '@/lib/questions';
import { escapeName } from '@/lib/escapes';

// The four questions that stop someone from joining, answered where they decide: is it
// real, can I enter free, what are my odds, where does the money go. Native disclosure
// elements, so they work without script, and FAQPage structured data from the same source
// so answer engines can cite them.
const PICK = ['How is the winner chosen?', 'What are my odds?', 'Can I enter for free?', 'Where does the money go?'];

export function HomeQuestions({ escape = hampshire }: { escape?: Escape }) {
  const all = questionsFor(escape);
  const picked = PICK.map((q) => all.find((item) => item.question === q)).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: picked.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
  };
  return (
    <section id="questions" className="rule-t section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <div className="max-w-[44rem]">
        <h2 data-reveal="item" className="display text-balance heading-section">Questions people ask us.</h2>
        <div className="mt-8 flex flex-col">
          {picked.map(({ question, answer }) => (
            <details key={question} className="group rule-t py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {question}
                <span aria-hidden="true" className="relative block h-5 w-5 shrink-0">
                  <span className="absolute top-1/2 left-0 block h-[2px] w-5 -translate-y-1/2 rounded-full bg-ink" />
                  <span className="absolute top-0 left-1/2 block h-5 w-[2px] -translate-x-1/2 rounded-full bg-ink transition-transform group-open:scale-y-0" />
                </span>
              </summary>
              <p className="mt-3 text-base text-ink/80">{answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-base">
          <Link href={`/escapes/${escape.slug}#questions`} className="underline underline-offset-4">
            All questions about {escapeName(escape)}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
