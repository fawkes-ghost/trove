import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Trove';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const DAYLIGHT = '#F7F8F5';
const INK = '#142520';

// The default share image: the Low sun wordmark on daylight, the sun in its own colour,
// over the loch horizon. The wordmark is the committed SVG in public/brand, read here and
// drawn as its own paths, never redrawn.
function readMark(file: string): string {
  return readFileSync(path.join(process.cwd(), 'public', 'brand', file), 'utf8');
}

export default function Image() {
  const wordmark = readMark('wordmark.svg');
  const viewBox = wordmark.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 100 100';
  const [, , w, h] = viewBox.split(' ').map(Number);
  const paths = [...wordmark.matchAll(/<path fill="([^"]+)"( data-sun)? d="([^"]+)"/g)].map((m) => ({
    fill: m[1] === 'currentColor' ? INK : m[1],
    d: m[3],
  }));
  const height = 170;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: DAYLIGHT }}>
        <svg viewBox={viewBox} height={height} width={Math.round((height * w) / h)}>
          {paths.map((p, index) => (
            <path key={index} d={p.d} fill={p.fill} />
          ))}
        </svg>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 18, background: '#1F3A33' }} />
      </div>
    ),
    size,
  );
}
