import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Trove';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The default share image: the icon tile and the wordmark on snow. Both marks are the
// committed SVGs in public/brand, read here and drawn as paths, never redrawn.
function readMark(file: string): string {
  return readFileSync(path.join(process.cwd(), 'public', 'brand', file), 'utf8');
}

function attr(source: string, name: string): string {
  return source.match(new RegExp(`${name}="([^"]+)"`))?.[1] ?? '';
}

export default function Image() {
  const icon = readMark('icon.svg');
  const tile = icon.match(/<rect ([^/]+)\/>/)?.[1] ?? '';
  const disc = icon.match(/<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"/);
  const ridge = icon.match(/<path d="([^"]+)"/)?.[1] ?? '';
  const wordmark = readMark('wordmark.svg');
  const paths = [...wordmark.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);
  const circle = wordmark.match(/<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"/);
  const viewBox = attr(wordmark, 'viewBox');

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, background: '#F2F3EF', color: '#101214' }}>
        <svg viewBox={attr(icon, 'viewBox')} width={140} height={140}>
          <rect x={attr(tile, 'x')} y={attr(tile, 'y')} width={attr(tile, 'width')} height={attr(tile, 'height')} rx={attr(tile, 'rx')} fill="#101214" />
          {disc ? <circle cx={disc[1]} cy={disc[2]} r={disc[3]} fill="#F2F3EF" /> : null}
          <path d={ridge} fill="#101214" />
        </svg>
        <svg viewBox={viewBox} height={110} width={400}>
          {paths.map((d, index) => (
            <path key={index} d={d} fill="#101214" />
          ))}
          {circle ? <circle cx={circle[1]} cy={circle[2]} r={circle[3]} fill="#101214" /> : null}
        </svg>
      </div>
    ),
    size,
  );
}
