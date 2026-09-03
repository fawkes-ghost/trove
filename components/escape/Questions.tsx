// Eight questions, headings only. The founder supplies the answers.
const questions = [
  'How does the draw work?',
  'When does the draw close?',
  'Who can enter?',
  'How is the winner chosen?',
  'What if the winner would rather have the cash?',
  'How do free postal entries work?',
  'Where does the money go?',
  'How do I set a limit or close my account?',
];

export function Questions() {
  return (
    <section id="questions" className="border-t border-ink/15 px-6 py-24 md:px-10 md:py-32">
      <div className="max-w-[40rem]">
        <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">Questions.</h2>
        <p className="mt-6 font-mono text-[11px] text-ink/60" data-placeholder="copy">
          Answers to come from the founder.
        </p>
        <dl className="mt-10 flex flex-col">
          {questions.map((question) => (
            <div key={question} className="border-t border-ink/15 py-5">
              <dt className="text-lg font-medium">{question}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
