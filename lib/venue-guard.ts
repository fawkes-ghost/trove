import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

// Build-time guard: the words that identify an unpermitted venue live in config/prize.ts and
// nowhere else. Walks the given roots and fails the build on the first file that contains one.
export function assertVenueUnpublished(terms: readonly string[], roots: string[], cwd = process.cwd()): void {
  const hits: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      const text = readFileSync(full, 'utf8');
      for (const term of terms) if (text.includes(term)) hits.push(`${path.relative(cwd, full)} contains “${term}”`);
    }
  };
  for (const root of roots) walk(path.join(cwd, root));
  if (hits.length) throw new Error(`venue guard: ${hits.join('; ')}`);
}
