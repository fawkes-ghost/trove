import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { compliance, worstCaseOdds, type Escape } from '@/config/prize';
import { count } from '@/lib/format';
import { teaserLine } from '@/lib/escapes';
import { organisation } from '@/config/organisation';

export const shareCardSize = { width: 1200, height: 630 };

const DAYLIGHT = '#F7F8F5';
const INK = '#142520';
const LOCH = '#1F3A33';
const SNOW = '#F7F8F5';

// The preview card a shared link unfurls into on Instagram, WhatsApp, Messages, X and the
// rest. Since 28 November 2026 it says what the hero says, in the hero's quieter register:
// the film still across the whole card, Trove's line and the escape in the serif, and the
// chance stated once, plainly, in small sans. Every figure is read from config. The
// significant conditions line sits on the card itself, because a card is a promotional
// surface too.

function publicFile(relative: string): Buffer {
  return readFileSync(path.join(process.cwd(), 'public', relative.replace(/^\//, '')));
}

function wordmarkPaths(ink = INK) {
  const svg = publicFile('brand/wordmark.svg').toString('utf8');
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 100 100';
  const paths = [...svg.matchAll(/<path fill="([^"]+)"( data-sun)? d="([^"]+)"/g)].map((m) => ({ fill: m[1] === 'currentColor' ? ink : m[1], d: m[3] }));
  return { viewBox, paths };
}

// Google Fonts serves a TrueType subset when asked without a browser user agent. The card
// is prerendered at build, so this runs once per deploy; if the fetch fails the card falls
// back to the default face rather than failing the build.
async function googleFont(family: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)).text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    return await (await fetch(src)).arrayBuffer();
  } catch {
    return null;
  }
}

export async function shareCard(e: Escape): Promise<ImageResponse> {
  const headline = organisation.tagline;
  const prize = teaserLine(e);
  const chance = `Your chance of winning is at least ${worstCaseOdds(e)}, with ${count(e.cap)} entries and never more.`;
  const strip = `${compliance.minimumAge}+. ${compliance.residency} residents. Free entry by post, same chance. Key terms at trovewild.com.`;

  const [display, sans] = await Promise.all([
    googleFont('Newsreader:opsz,wght@72,300', headline + prize),
    googleFont('DM+Sans:wght@500', chance + strip),
  ]);
  const fonts = [
    display && { name: 'Newsreader', data: display, weight: 300 as const },
    sans && { name: 'DM Sans', data: sans, weight: 500 as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 300 | 500 }[];

  const poster = e.media.poster ? `data:image/jpeg;base64,${publicFile(e.media.poster).toString('base64')}` : null;
  const mark = wordmarkPaths(SNOW);
  const [, , mw, mh] = mark.viewBox.split(' ').map(Number);

  return new ImageResponse(
    (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', background: LOCH, color: SNOW }}>
        {poster ? <img src={poster} width={1200} height={675} style={{ position: 'absolute', top: -22, left: 0, objectFit: 'cover' }} /> : null}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 1200, height: 630, display: 'flex', backgroundImage: 'linear-gradient(180deg, rgba(20,37,32,0.7) 0%, rgba(20,37,32,0.15) 26%, rgba(20,37,32,0.2) 40%, rgba(20,37,32,0.7) 62%, rgba(20,37,32,0.92) 100%)' }} />
        <div style={{ position: 'absolute', left: 64, top: 52, display: 'flex' }}>
          <svg viewBox={mark.viewBox} height={40} width={Math.round((40 * mw) / mh)}>
            {mark.paths.map((p, i) => (
              <path key={i} d={p.d} fill={p.fill} />
            ))}
          </svg>
        </div>
        <div style={{ position: 'absolute', left: 64, right: 64, bottom: 44, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontFamily: 'Newsreader', fontWeight: 300, fontSize: 76, lineHeight: 1, letterSpacing: -2 }}>{headline}</div>
          <div style={{ display: 'flex', marginTop: 16, maxWidth: 900, fontFamily: 'Newsreader', fontWeight: 300, fontSize: 36, lineHeight: 1.2, letterSpacing: -0.5 }}>{prize}</div>
          <div style={{ display: 'flex', marginTop: 22, fontFamily: 'DM Sans', fontWeight: 500, fontSize: 22, opacity: 0.92 }}>{chance}</div>
          <div style={{ display: 'flex', marginTop: 14, fontFamily: 'DM Sans', fontWeight: 500, fontSize: 16, opacity: 0.72 }}>{strip}</div>
        </div>
      </div>
    ),
    { ...shareCardSize, fonts: fonts.length ? fonts : undefined },
  );
}

// The figure-free card: the wordmark on daylight over the loch horizon. Used while the gate
// is on, because every gated link resolves to the holding page, which states no figure.
export function logoCard(): ImageResponse {
  const { viewBox, paths } = wordmarkPaths();
  const [, , w, h] = viewBox.split(' ').map(Number);
  const height = 170;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: DAYLIGHT }}>
        <svg viewBox={viewBox} height={height} width={Math.round((height * w) / h)}>
          {paths.map((p, index) => (
            <path key={index} d={p.d} fill={p.fill} />
          ))}
        </svg>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 18, background: LOCH }} />
      </div>
    ),
    shareCardSize,
  );
}
