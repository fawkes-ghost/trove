// The geometry of a field of marks: n marks in a grid of cols columns, one cell each. Pure
// arithmetic for the server-rendered SVG.

export const CELL = 10;

export function fieldSize(n: number, cols: number): { width: number; height: number; rows: number } {
  const rows = Math.ceil(n / cols);
  return { width: cols * CELL, height: rows * CELL, rows };
}

export function markCentre(index: number, cols: number): { x: number; y: number } {
  return { x: (index % cols) * CELL + CELL / 2, y: Math.floor(index / cols) * CELL + CELL / 2 };
}

// Which marks light, scattered deterministically through the field with the golden ratio
// so server and client agree and no two lit marks sit together.
export function litIndices(n: number, count: number): number[] {
  const out: number[] = [];
  const seen = new Set<number>();
  for (let i = 0; out.length < Math.min(count, n); i++) {
    const idx = Math.floor((((i + 1) * 0.6180339887) % 1) * n);
    if (seen.has(idx)) continue;
    seen.add(idx);
    out.push(idx);
  }
  return out;
}
