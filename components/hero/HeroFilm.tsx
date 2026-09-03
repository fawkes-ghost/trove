import { escape } from '@/config/prize';
import { HeroLoop } from './HeroLoop';

// The film layer behind the hero. Poster on first paint and under reduced motion, the
// loop over it once it plays, the gradient only when config has neither. The scrim is
// heavy so snow text reads over any frame. The wrapper keeps the hero-poster class the
// logo moment fades in.
export function HeroFilm() {
  const { poster, loop } = escape.media;
  const source = loop ? 'loop' : poster ? 'poster' : 'gradient';

  return (
    <div className="hero-poster absolute inset-0 -z-10 overflow-hidden" aria-hidden="true" data-film={source}>
      {source === 'gradient' ? (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#4F4256_0%,#8E6A6A_34%,#D39A72_56%,#3B3631_80%,#1A1917_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_16%_60%,#FFBE78BF,#FFBE7800_70%)]" />
        </>
      ) : null}
      {poster ? (
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" decoding="async" fetchPriority="high" />
      ) : null}
      {loop ? <HeroLoop src={loop} poster={poster ?? undefined} /> : null}
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#10121400_30%,#10121499_70%,#101214D9_100%)]" />
    </div>
  );
}
