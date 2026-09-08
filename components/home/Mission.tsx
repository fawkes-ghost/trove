import { missionHeading, missionParagraphs } from '@/lib/mission';

// The mission, directly after the hero. Renders nothing until the founder's copy is in
// lib/mission.ts, so the page never shows placeholder prose.
export function Mission() {
  if (!missionParagraphs.length) return null;
  return (
    <section id="mission" className="px-6 py-24 md:px-10 md:py-32">
      <div className="max-w-[40rem]">
        {missionHeading ? <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">{missionHeading}</h2> : null}
        <div className="mt-8 flex flex-col gap-6 text-lg">
          {missionParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
