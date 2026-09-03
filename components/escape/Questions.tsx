import type { Escape } from '@/config/prize';
import { questionsFor } from '@/lib/questions';

// Ten questions answered plainly, from the same source as the FAQPage structured data.
export function Questions({ escape }: { escape: Escape }) {
  return (
    <section id="questions" className="border-t border-ink/15 px-6 py-24 md:px-10 md:py-32">
      <div className="max-w-[40rem]">
        <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">Questions.</h2>
        <dl className="mt-10 flex flex-col">
          {questionsFor(escape).map(({ question, answer }) => (
            <div key={question} className="border-t border-ink/15 py-6">
              <dt className="text-lg font-medium">{question}</dt>
              <dd className="mt-3 text-base text-ink/80">
                <p>{answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
