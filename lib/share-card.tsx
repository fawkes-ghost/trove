import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { compliance, worstCaseOdds, type Escape } from '@/config/prize';
import { count } from '@/lib/format';
import { prizeLine } from '@/lib/escapes';

export const shareCardSize = { width: 1200, height: 630 };

const DAYLIGHT = '#F7F8F5';
const INK = '#142520';
const LOCH = '#1F3A33';
const SUN = '#E9A23B';

// The preview card a shared link unfurls into on Instagram, WhatsApp, Messages, X and the
// rest: the escape's film still above the horizon, the sun half set on it, the facts below.
// Every figure is read from config. The significant conditions line sits on the card itself,
// because a card is a promotional surface too.

function publicFile(relative: string): Buffer {
  return readFileSync(path.join(process.cwd(), 'public', relative.replace(/^\//, '')));
}

function wordmarkPaths() {
  const svg = publicFile('brand/wordmark.svg').toString('utf8');
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 100 100';
  const paths = [...svg.matchAll(/<path fill="([^"]+)"( data-sun)? d="([^"]+)"/g)].map((m) => ({ fill: m[1] === 'currentColor' ? INK : m[1], d: m[3] }));
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
  const headline = `${e.destination}.`;
  const prize = prizeLine(e);
  const odds = `Worst-case odds ${worstCaseOdds(e)}. Entries capped at ${count(e.cap)}.`;
  const strip = `${compliance.minimumAge}+. ${compliance.residency} residents. Free postal entry, identical odds. Key terms at trovewild.com.`;

  const [display, sans, mono] = await Promise.all([
    googleFont('Fraunces:opsz,wght@144,400', headline),
    googleFont('Instrument+Sans:wght@500', prize + odds),
    googleFont('IBM+Plex+Mono', strip),
  ]);
  const fonts = [
    display && { name: 'Fraunces', data: display, weight: 400 as const },
    sans && { name: 'Instrument Sans', data: sans, weight: 500 as const },
    mono && { name: 'Plex Mono', data: mono, weight: 400 as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 500 }[];

  const poster = e.media.poster ? `data:image/jpeg;base64,${publicFile(e.media.poster).toString('base64')}` : null;
  const mark = wordmarkPaths();
  const [, , mw, mh] = mark.viewBox.split(' ').map(Number);
  const skyHeight = 330;
  const sun = 120;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: DAYLIGHT, color: INK }}>
        <div style={{ position: 'relative', display: 'flex', height: skyHeight, overflow: 'hidden', background: '#B9C7C1' }}>
          {poster ? <img src={poster} width={1200} height={675} style={{ position: 'absolute', top: -(675 - skyHeight) / 2, left: 0, objectFit: 'cover' }} /> : null}
          <div style={{ position: 'absolute', left: 600 - sun / 2, top: skyHeight - sun / 2, width: sun, height: sun, borderRadius: sun, background: SUN }} />
          <div style={{ position: 'absolute', left: 48, top: 36, display: 'flex', padding: '14px 20px', borderRadius: 999, background: DAYLIGHT }}>
            <svg viewBox={mark.viewBox} height={34} width={Math.round((34 * mw) / mh)}>
              {mark.paths.map((p, i) => (
                <path key={i} d={p.d} fill={p.fill} />
              ))}
            </svg>
          </div>
        </div>
        <div style={{ height: 8, background: LOCH, display: 'flex' }} />
        <div style={{ display: 'flex', flex: 1, padding: '30px 48px 0', gap: 48 }}>
          <div style={{ display: 'flex', fontFamily: 'Fraunces', fontSize: 92, lineHeight: 1, letterSpacing: -2 }}>{headline}</div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 14, paddingTop: 6, fontFamily: 'Instrument Sans', fontSize: 28, lineHeight: 1.3 }}>
            <div style={{ display: 'flex' }}>{prize}</div>
            <div style={{ display: 'flex', fontSize: 24, opacity: 0.75 }}>{odds}</div>
          </div>
        </div>
        <div style={{ display: 'flex', padding: '0 48px 24px', fontFamily: 'Plex Mono', fontSize: 18, opacity: 0.75 }}>{strip}</div>
      </div>
    ),
    { ...shareCardSize, fonts: fonts.length ? fonts : undefined },
  );
}
