import Image from 'next/image';

type Still = { src: string; alt: string; title?: string | null; caption?: string | null; blur?: string };

// A photograph: a plate with its title and one line beneath it, never over it. The picture
// is served at the size the screen needs, in a modern format, and a 16px blurred copy holds
// the frame until it arrives, so a phone on a weak signal never shows an empty box. Server
// rendered; takes values only, and the server has already decided which stills may be shown.
export function Plate({ still, ratio, sizes, className = '' }: { still: Still; ratio: string; sizes: string; className?: string }) {
  return (
    <figure className={`m-0 ${className}`} data-reveal="item">
      <div className={`plate ${ratio}`}>
        <Image src={still.src} alt={still.alt} fill sizes={sizes} className="object-cover" placeholder={still.blur ? 'blur' : 'empty'} blurDataURL={still.blur} />
      </div>
      <PlateCaption title={still.title} caption={still.caption} />
    </figure>
  );
}

// Title and one line. Who took the photograph and the licence it is used under are on the
// photo credits page, which the footer links from every page.
export function PlateCaption({ title, caption, className = '' }: { title?: string | null; caption?: string | null; className?: string }) {
  if (!title && !caption) return null;
  return (
    <figcaption className={`mt-3 max-w-[30rem] ${className}`}>
      {title ? <p className="display text-[1.375rem] leading-tight">{title}</p> : null}
      {caption ? <p className="mt-1 text-sm text-ink/70">{caption}</p> : null}
    </figcaption>
  );
}
