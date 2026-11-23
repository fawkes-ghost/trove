type Still = { src: string; alt: string; title?: string | null; caption?: string | null };

// The pictures as full-bleed panels, one after another, each nearly a screen tall, the way a
// fashion house sequences a campaign. One short title and one line over the foot of each
// frame on a scrim, nothing else: no arrows, no dots, no progress bars. Motion is the scroll
// itself: each picture drifts slowly inside its frame as it passes, in CSS (a scroll-driven
// animation), so there is no script and no cost where it is not supported. Reduced motion
// leaves the pictures still. Server rendered; takes values only, and the server has already
// decided which stills may be shown.
export function Panels({ stills, label }: { stills: Still[]; label: string }) {
  if (stills.length === 0) return null;
  return (
    <section aria-label={label} data-panels>
      {stills.map((still) => {
        const captioned = Boolean(still.title || still.caption);
        return (
          <figure key={still.src} className="panel relative m-0 h-[88svh] min-h-[28rem] overflow-clip bg-loch md:h-[100svh]" data-panel>
            <img src={still.src} alt={still.alt} className="panel-media absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" draggable={false} />
            {captioned ? (
              <figcaption className="panel-scrim absolute inset-x-0 bottom-0 px-6 pt-40 pb-12 text-snow md:px-10 md:pb-20">
                {still.title ? <p className="display text-[3.25rem] leading-[0.95] md:text-[6.25rem]">{still.title}</p> : null}
                {still.caption ? <p className="mt-4 max-w-[30rem] text-base text-snow/85 md:text-lg">{still.caption}</p> : null}
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </section>
  );
}
