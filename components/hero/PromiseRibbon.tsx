// The rail: the promises on one quiet line beneath the film, drifting slowly. The list is
// written twice so the loop has no seam; the second run is hidden from assistive
// technology. The separators are gold discs drawn in CSS, never the X: the X never stands
// alone (CLAUDE.md rule 4). Reduced motion: the rail is still. Lines arrive as values, read
// from config by the caller.
export function PromiseRibbon({ lines }: { lines: string[] }) {
  return (
    <div className="ribbon" data-ribbon>
      <div className="ribbon-band">
        <div className="ribbon-track">
          {[0, 1].map((run) => (
            <p key={run} aria-hidden={run === 1 || undefined}>
              {lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
