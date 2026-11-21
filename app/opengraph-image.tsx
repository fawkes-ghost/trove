import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'trove';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The default share image: the trove X logo on the page colour. The logo is the committed
// SVG in public/brand, read here and drawn as an image, never redrawn. Its word is
// currentColor on the site, so it is set to ink for the share image.
function logoDataUri(): string {
  const svg = readFileSync(path.join(process.cwd(), 'public', 'brand', 'wordmark.svg'), 'utf8').replace(/currentColor/g, '#101614');
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

// The logo is 3.70 times as wide as it is tall.
const LOGO_WIDTH = 640;
const LOGO_HEIGHT = Math.round(LOGO_WIDTH / 3.7);

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F8F5' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUri()} width={LOGO_WIDTH} height={LOGO_HEIGHT} alt="trove" />
      </div>
    ),
    size,
  );
}
