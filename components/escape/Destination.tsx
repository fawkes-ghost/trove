import type { Escape } from '@/config/prize';
import { gbp, numberWord } from '@/lib/format';
import { venueLine } from '@/lib/escapes';

// The destination in pictures and prose. The nights and the cash render from config; the
// venue is unnamed until permission exists; no venue imagery until footage is licensed.
export function Destination({ escape }: { escape: Escape }) {
  const named = Boolean(escape.venue.name && escape.venue.permissionGranted);
  const label = `${escape.destination} countryside, licensed photograph`;

  return (
    <section id="destination" className="border-t border-ink/15 px-6 py-24 md:px-10 md:py-32">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="max-w-[40rem]">
          <h2 className="display text-balance text-[2rem] md:text-[2.75rem]">{escape.destination}.</h2>
          <div className="mt-8 flex flex-col gap-5 text-lg">
            <p>
              {escape.destination} in winter is a county of chalk streams and short days. The Test and the Itchen run clear and cold through water meadows that flood and freeze, and the downs above them are bare enough to see the shape of the land.
            </p>
            <p>
              The villages keep their pubs and their fires. Lunch takes the afternoon. Beech woods hold the last of the light until four, and the lanes empty once the dog walkers have gone home.
            </p>
            <p>
              This escape is {numberWord(escape.nights)} nights at {venueLine(escape)}, with breakfast each morning and {gbp(escape.prize.cash)} in cash in your pocket for dinners, a treatment, the car from London, or nothing at all.
              {named ? null : ' The house is named the moment we have its permission to name it.'}
            </p>
            <p>Bring boots, a book and your favourite person. The county does the rest.</p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <ImagePlaceholder label={label} />
          <ImagePlaceholder label={label} />
        </div>
      </div>
    </section>
  );
}

// A 4:5 frame no taller than 80vh, waiting for the licensed photograph.
function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-[4/5] w-full max-w-[64vh] items-end border border-ink/20 bg-ink/5 p-4" data-placeholder="image" role="img" aria-label={label}>
      <p className="font-mono text-[11px] text-ink/60">{label}</p>
    </div>
  );
}
