type Still = { src: string; alt: string; title?: string | null; caption?: string | null };

// A photograph in the house register: a plate with its title and one line beneath it, never
// over it. Server rendered; takes values only, and the server has already decided which
// stills may be shown.
export function Plate({ still, ratio, className = '' }: { still: Still; ratio: string; className?: string }) {
  return (
    <figure className={`m-0 ${className}`}>
      <div className={`plate ${ratio}`}>
        <img src={still.src} alt={still.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
      </div>
      <PlateCaption title={still.title} caption={still.caption} />
    </figure>
  );
}

export function PlateCaption({ title, caption, className = '' }: { title?: string | null; caption?: string | null; className?: string }) {
  if (!title && !caption) return null;
  return (
    <figcaption className={`mt-4 max-w-[30rem] ${className}`}>
      {title ? <p className="display text-[1.375rem] leading-tight">{title}</p> : null}
      {caption ? <p className="mt-1 text-sm text-ink/70">{caption}</p> : null}
    </figcaption>
  );
}
