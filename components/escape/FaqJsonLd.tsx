import type { Escape } from '@/config/prize';
import { questionsFor } from '@/lib/questions';

// FAQPage structured data from the same ten questions the page shows.
export function FaqJsonLd({ escape }: { escape: Escape }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questionsFor(escape).map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
