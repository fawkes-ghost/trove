import { useId } from 'react';
import { CELL, fieldSize, litIndices, markCentre } from './field';

type Props = {
  // How many marks to draw.
  entries: number;
  // The cap the marks stand for, for the accessible label.
  cap: number;
  // How many marks are lit in the final state.
  lit: number;
  // Cumulative lit counts per step, for a field that lights in sequence on scroll:
  // [1, 3, 5] lights one mark, then three, then five. Defaults to every lit mark at step 1.
  steps?: number[];
  // Marks rendered as lightable elements, so a calculator can light up to this many.
  maxLit?: number;
  // Marks already taken, for the live ledger. Static for now.
  sold?: number;
  tone?: 'accent' | 'moss';
  columns?: { desktop: number; mobile: number };
  id?: string;
  className?: string;
  // The accessible description; defaults to the marks as entries in the cap.
  label?: string;
};

// A server-rendered field of marks. The unlit marks are one pattern-filled rectangle, so
// three thousand of them cost a few bytes; the marks that can light are real elements.
// Takes values only, never the config object. Two layouts, one for desktop and one for
// narrow screens, so the grid is always whole columns. The final state is what the server
// renders; motion (drawing in top to bottom, lighting in sequence) is layered on by
// FieldMotion, and the inline gate hides nothing unless motion is allowed.
export function OddsField({ entries, cap, lit, steps, maxLit, sold = 0, tone = 'accent', columns = { desktop: 60, mobile: 40 }, id, className = '', label }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const lightable = Math.max(maxLit ?? lit, lit);
  const indices = litIndices(entries, lightable);
  const stepOf = (position: number) => {
    if (!steps) return 1;
    const step = steps.findIndex((cumulative) => position < cumulative);
    return step === -1 ? steps.length : step + 1;
  };
  const description = label ?? `${cap.toLocaleString('en-GB')} marks, one for every entry in the cap, with ${lit === 1 ? 'one' : lit} lit.`;
  const color = tone === 'moss' ? 'var(--moss)' : 'var(--accent)';

  const layout = (cols: number, visibility: string, key: string) => {
    const { width, height } = fieldSize(entries, cols);
    const pattern = `field-${uid}-${key}`;
    const soldRows = Math.floor(Math.min(sold, entries) / cols);
    const soldRest = Math.min(sold, entries) % cols;
    // The last row may be partial: the pattern is clipped to the marks that exist.
    const lastRow = entries % cols;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className={`${visibility} h-auto w-full`} aria-hidden="true" data-field-svg>
        <defs>
          <pattern id={pattern} width={CELL} height={CELL} patternUnits="userSpaceOnUse">
            <circle cx={CELL / 2} cy={CELL / 2} r={CELL * 0.18} fill="currentColor" />
          </pattern>
          <clipPath id={`${pattern}-cells`}>
            <rect x="0" y="0" width={width} height={lastRow ? height - CELL : height} />
            {lastRow ? <rect x="0" y={height - CELL} width={lastRow * CELL} height={CELL} /> : null}
          </clipPath>
          <clipPath id={`${pattern}-reveal`}>
            <rect x="0" y="0" width={width} height={height} data-field-reveal />
          </clipPath>
        </defs>
        <g clipPath={`url(#${pattern}-reveal)`}>
          <g clipPath={`url(#${pattern}-cells)`}>
            <rect x="0" y="0" width={width} height={height} fill={`url(#${pattern})`} className="text-ink/25" data-field-base />
            {sold > 0 ? (
              <g className="text-ink" data-field-sold>
                {soldRows > 0 ? <rect x="0" y="0" width={width} height={soldRows * CELL} fill={`url(#${pattern})`} /> : null}
                {soldRest > 0 ? <rect x="0" y={soldRows * CELL} width={soldRest * CELL} height={CELL} fill={`url(#${pattern})`} /> : null}
              </g>
            ) : null}
          </g>
        </g>
        {indices.map((index, position) => {
          const { x, y } = markCentre(index, cols);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={CELL * 0.3}
              fill={color}
              className="field-lit"
              data-mark={position}
              data-step={stepOf(position)}
              data-on={position < lit ? '' : undefined}
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div id={id} className={className} role="img" aria-label={description} data-field data-field-tone={tone}>
      {layout(columns.desktop, 'hidden md:block', 'd')}
      {layout(columns.mobile, 'md:hidden', 'm')}
    </div>
  );
}
