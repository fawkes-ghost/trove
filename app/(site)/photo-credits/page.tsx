import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { photoCredits, photoCreditsRoute } from '@/lib/escapes';

export const metadata: Metadata = {
  title: 'Photo credits',
  description: 'Who took the photographs on this site, where each one came from and the licence it is used under.',
  alternates: { canonical: photoCreditsRoute },
};

// The one place the photographs are credited: the photographer linked to where the photograph
// came from, the licence linked to its text, and a word on what was changed. The licences ask
// for this, so the page stays for as long as one of these photographs is on the site. Every
// value comes from the still's credit in config/prize.ts.
export default function PhotoCreditsPage() {
  const credits = photoCredits();
  if (!credits.length) notFound();
  return (
    <main className="page">
      <div className="max-w-[44rem]">
        <h1 className="display text-balance text-[2.5rem] md:text-[3.5rem]">Photo credits.</h1>
        <p className="mt-6 text-lg text-ink/80">The photographs on this site were taken by the people named here, and we use them under the licences they chose.</p>
        <ul className="mt-10 flex flex-col" data-photo-credits>
          {credits.map(({ src, alt, title, blur, credit }) => (
            <li key={src} className="rule-t grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-5 py-6 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8">
              <div className="plate aspect-[3/2]">
                <Image src={src} alt={alt} fill sizes="(min-width: 768px) 11rem, 6.5rem" className="object-cover" placeholder={blur ? 'blur' : 'empty'} blurDataURL={blur} />
              </div>
              <div>
                {title ? <p className="display text-[1.375rem] leading-tight">{title}</p> : null}
                <p className="mt-2 text-base">
                  {credit.work ? (
                    <>
                      <a href={credit.source} rel="noopener" className="underline underline-offset-4">
                        “{credit.work}”
                      </a>{' '}
                      by {credit.by}
                    </>
                  ) : (
                    <>
                      Photograph by{' '}
                      <a href={credit.source} rel="noopener" className="underline underline-offset-4">
                        {credit.by}
                      </a>
                    </>
                  )}
                  ,{' '}
                  <a href={credit.licenceUrl} rel="noopener license" className="underline underline-offset-4">
                    {credit.licence}
                  </a>
                  .{credit.note ? ` ${credit.note}` : ''}
                </p>
                {credit.shareAlike ? <p className="mt-2 text-sm text-ink/70">Our edited copy of this photograph is offered under the same licence.</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
