import type { Escape } from '@/config/prize';
import { venueLine } from '@/lib/escapes';

// The destination in pictures and 150 words. The prose below is a placeholder for the
// founder to replace; the venue is unnamed until permission exists; no venue imagery
// until footage is licensed.
export function Destination({ escape }: { escape: Escape }) {
  const house = venueLine(escape);
  const placeholder = [
    `Placeholder copy, to be replaced by the founder. ${escape.destination} in winter is the point of this escape: low sun across the downs, chalk streams running clear and cold, and lanes that empty after the last of the walkers has gone home.`,
    `The stay is at ${house}. Mornings begin with breakfast and no plan; afternoons are for the river path, a long lunch in a village pub, or nothing at all. The cash is yours to spend on the journey, dinners, a treatment, or to keep.`,
    `This is a place that rewards slowness. Bring boots, a book and someone you like, and let the county do the rest.`,
  ];

  return (
    <section id="destination" className="border-t border-ink/15 px-6 py-24 md:px-10 md:py-32">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="max-w-[40rem]">
          <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">{escape.destination}.</h2>
          <p className="mt-6 font-mono text-[11px] text-ink/60" data-placeholder="copy">
            Placeholder prose. The founder replaces these three paragraphs.
          </p>
          <div className="mt-6 flex flex-col gap-5 text-lg">
            {placeholder.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <ImagePlaceholder label="Photograph placeholder: the countryside, licensed" ratio="aspect-[4/5]" />
          <ImagePlaceholder
            label={escape.venue.footageLicensed ? 'Photograph placeholder: the house' : 'Photograph placeholder: no venue imagery until footage is licensed'}
            ratio="aspect-[4/3]"
          />
        </div>
      </div>
    </section>
  );
}

function ImagePlaceholder({ label, ratio }: { label: string; ratio: string }) {
  return (
    <div className={`${ratio} flex w-full items-end border border-ink/20 bg-ink/5 p-4`} data-placeholder="image" role="img" aria-label={label}>
      <p className="font-mono text-[11px] text-ink/60">{label}</p>
    </div>
  );
}
