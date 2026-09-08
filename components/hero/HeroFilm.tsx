import { preload } from 'react-dom';
import { escape as hampshire, type Escape } from '@/config/prize';
import { HeroLoop } from './HeroLoop';

// The film layer behind the hero, in explicit paint order: the poster is the first paint
// layer (or the gradient when config has none), the loop sits above it and fades in once it
// can play, the scrims sit above both. Reduced motion never mounts the loop. The wrapper
// keeps the hero-poster class the logo moment fades in and the pin scales.
export function HeroFilm({ media = hampshire.media }: { media?: Escape['media'] }) {
  const { poster, posterAlt, loop } = media;
  const source = loop ? 'loop' : poster ? 'poster' : 'gradient';
  // The poster is the first paint layer, so it is asked for from the head, ahead of script.
  if (poster) preload(poster, { as: 'image', fetchPriority: 'high' });

  return (
    <div className="hero-poster absolute inset-0 z-0 overflow-hidden" data-film={source}>
      {source === 'gradient' ? (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#4F4256_0%,#8E6A6A_34%,#D39A72_56%,#3B3631_80%,#1A1917_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_16%_60%,#FFBE78BF,#FFBE7800_70%)]" />
        </>
      ) : null}
      {poster ? (
        <img src={poster} alt={posterAlt} className="absolute inset-0 z-0 h-full w-full object-cover" decoding="async" fetchPriority="high" data-hero-poster />
      ) : null}
      {loop ? <HeroLoop src={loop} poster={poster ?? undefined} /> : null}
      <div className="absolute inset-0 z-20 bg-ink/45" />
      <div className="absolute inset-0 z-20 bg-[linear-gradient(180deg,#10121400_30%,#10121499_70%,#101214D9_100%)]" />
      {/* Deepens toward the call to action as the pinned hero scrolls; fully on without motion. */}
      <div className="hero-scrim absolute inset-0 z-20 bg-ink/35" />
    </div>
  );
}
