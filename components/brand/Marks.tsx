import { readFileSync } from 'node:fs';
import path from 'node:path';

// The wordmark and icon live in public/brand/ and are inlined so they can animate.
// They are never redrawn here.
function readMark(file: string): string {
  return readFileSync(path.join(process.cwd(), 'public', 'brand', file), 'utf8');
}

type MarkProps = { height?: number; className?: string };

export function Icon({ height = 28, className }: MarkProps) {
  return (
    <span
      className={['brand-mark brand-icon', className].filter(Boolean).join(' ')}
      style={{ height }}
      dangerouslySetInnerHTML={{ __html: readMark('icon.svg') }}
    />
  );
}

export function Wordmark({ height = 22, className }: MarkProps) {
  return (
    <span
      className={['brand-mark', className].filter(Boolean).join(' ')}
      style={{ height }}
      dangerouslySetInnerHTML={{ __html: readMark('wordmark.svg') }}
    />
  );
}
