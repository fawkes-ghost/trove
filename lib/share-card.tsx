import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { compliance, worstCaseOdds, type Escape } from '@/config/prize';
import { count } from '@/lib/format';
import { escapeTitle, teaserLine } from '@/lib/escapes';

export const shareCardSize = { width: 1200, height: 630 };

const DAYLIGHT = '#F7F8F5';
const INK = '#142520';
const LOCH = '#1F3A33';
const SUN = '#E9A23B';

// The preview card a shared link unfurls into on Instagram, WhatsApp, Messages, X and the
// rest. It says what the hero says, in the same two voices: the film still above, then the
// chance of winning as the largest thing on the card, marked in gold, beside the prize.
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
  const kicker = `${escapeTitle(e)}. Your chance of winning is at least`;
  const number = `${worstCaseOdds(e)}.`;
  const prize = teaserLine(e);
  const cap = `${count(e.cap)} entries. Never more.`;
  const strip = `${compliance.minimumAge}+. ${compliance.residency} residents. Free entry by post, same chance. Key terms at trovewild.com.`;

  // The site's two voices: DM Sans, heavy, for the number and the promise; Newsreader for
  // the prize sentence; DM Sans at text weight for the rest.
  const [figure, display, sans] = await Promise.all([
    googleFont('DM+Sans:wght@800', number + cap),
    googleFont('Newsreader:opsz,wght@72,400', prize),
    googleFont('DM+Sans:wght@500', kicker + strip),
  ]);
  const fonts = [
    figure && { name: 'DM Sans', data: figure, weight: 800 as const },
    display && { name: 'Newsreader', data: display, weight: 400 as const },
    sans && { name: 'DM Sans', data: sans, weight: 500 as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 500 | 800 }[];

  const poster = e.media.poster ? `data:image/jpeg;base64,${publicFile(e.media.poster).toString('base64')}` : null;
  const mark = wordmarkPaths();
  const [, , mw, mh] = mark.viewBox.split(' ').map(Number);
  const skyHeight = 300;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: DAYLIGHT, color: INK }}>
        <div style={{ position: 'relative', display: 'flex', height: skyHeight, overflow: 'hidden', background: '#B9C7C1' }}>
          {poster ? <img src={poster} width={1200} height={675} style={{ position: 'absolute', top: -(675 - skyHeight) / 2, left: 0, objectFit: 'cover' }} /> : null}
          <div style={{ position: 'absolute', left: 48, top: 36, display: 'flex', padding: '14px 20px', borderRadius: 999, background: DAYLIGHT }}>
            <svg viewBox={mark.viewBox} height={34} width={Math.round((34 * mw) / mh)}>
              {mark.paths.map((p, i) => (
                <path key={i} d={p.d} fill={p.fill} />
              ))}
            </svg>
          </div>
        </div>
        <div style={{ height: 8, background: LOCH, display: 'flex' }} />
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', padding: '0 48px', gap: 56 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontFamily: 'DM Sans', fontWeight: 500, fontSize: 22, opacity: 0.75 }}>{kicker}</div>
            <div style={{ position: 'relative', display: 'flex', alignSelf: 'flex-start', marginTop: 4 }}>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 14, height: 30, background: SUN, display: 'flex' }} />
              <div style={{ display: 'flex', fontFamily: 'DM Sans', fontWeight: 800, fontSize: 112, lineHeight: 1.05, letterSpacing: -6 }}>{number}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 14 }}>
            <div style={{ display: 'flex', fontFamily: 'Newsreader', fontSize: 34, lineHeight: 1.15, letterSpacing: -0.6 }}>{prize}</div>
            <div style={{ display: 'flex', fontFamily: 'DM Sans', fontWeight: 800, fontSize: 24, letterSpacing: -0.4 }}>{cap}</div>
          </div>
        </div>
        <div style={{ display: 'flex', padding: '0 48px 24px', fontFamily: 'DM Sans', fontWeight: 500, fontSize: 18, opacity: 0.75 }}>{strip}</div>
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
