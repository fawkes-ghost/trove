import Image from 'next/image';

type Credit = { by: string; source: string; licence: string; licenceUrl: string; note: string | null };
type Still = { src: string; alt: string; title?: string | null; caption?: string | null; blur?: string; credit?: Credit | null };

// A photograph: a plate with its title, one line and its credit beneath it, never over it. The picture
// is served at the size the screen needs, in a modern format, and a 16px blurred copy holds
// the frame until it arrives, so a phone on a weak signal never shows an empty box. Server
// rendered; takes values only, and the server has already decided which stills may be shown.
export function Plate({ still, ratio, sizes, className = '' }: { still: Still; ratio: string; sizes: string; className?: string }) {
  return (
    <figure className={`m-0 ${className}`} data-reveal="item">
      <div className={`plate ${ratio}`}>
        <Image src={still.src} alt={still.alt} fill sizes={sizes} className="object-cover" placeholder={still.blur ? 'blur' : 'empty'} blurDataURL={still.blur} />
      </div>
      <PlateCaption title={still.title} caption={still.caption} credit={still.credit} />
    </figure>
  );
}

// The credit is the smallest line and the last: who took the photograph, linked to where it
// came from, and the licence it is used under, linked to the licence. The licences ask for
// it beside the picture, so it is here and not on a page of its own.
export function PlateCaption({ title, caption, credit, className = '' }: { title?: string | null; caption?: string | null; credit?: Credit | null; className?: string }) {
  if (!title && !caption && !credit) return null;
  return (
    <figcaption className={`mt-3 max-w-[30rem] ${className}`}>
      {title ? <p className="display text-[1.375rem] leading-tight">{title}</p> : null}
      {caption ? <p className="mt-1 text-sm text-ink/70">{caption}</p> : null}
      {credit ? (
        <p className="mt-1 text-xs text-ink/60" data-photo-credit>
          Photograph by{' '}
          <a href={credit.source} rel="noopener" className="underline underline-offset-2">
            {credit.by}
          </a>
          ,{' '}
          <a href={credit.licenceUrl} rel="noopener license" className="underline underline-offset-2">
            {credit.licence}
          </a>
          .{credit.note ? ` ${credit.note}` : ''}
        </p>
      ) : null}
    </figcaption>
  );
}
