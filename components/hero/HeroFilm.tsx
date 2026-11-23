import { preload } from 'react-dom';
import { escape as hampshire, type Escape } from '@/config/prize';
import { HeroLoop } from './HeroLoop';

// The film layer behind the hero's words, in explicit paint order: the poster is the first paint
// layer (or a low sun gradient when config has none), the loop sits above it and fades in
// once it can play. No text sits on the film, so there is no scrim: the footage is shown as
// graded. Reduced motion never mounts the loop.
export function HeroFilm({ media = hampshire.media }: { media?: Escape['media'] }) {
  const { poster, posterAlt, loop, loopSmall } = media;
  const source = loop ? 'loop' : poster ? 'poster' : 'gradient';
  // The poster is the first paint layer, so it is asked for from the head, ahead of script.
  if (poster) preload(poster, { as: 'image', fetchPriority: 'high' });

  return (
    <div className="hero-poster absolute inset-0 z-0 overflow-hidden" data-film={source}>
      {source === 'gradient' ? <div className="absolute inset-0 bg-[linear-gradient(180deg,#B9C7C1_0%,#EEF0EA_70%,#F3D29E_100%)]" /> : null}
      {poster ? (
        <img src={poster} alt={posterAlt} className="absolute inset-0 z-0 h-full w-full object-cover" decoding="async" fetchPriority="high" data-hero-poster />
      ) : null}
      {loop ? <HeroLoop src={loop} srcSmall={loopSmall} poster={poster ?? undefined} /> : null}
    </div>
  );
}
