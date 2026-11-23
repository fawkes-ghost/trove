'use client';

import { useEffect, useState } from 'react';

// PREVIEW ONLY. What a new founding friend gets under the Loud option: a tilted sticker
// that pops in, and a short fall of paper confetti in the brand's gold and ink. The
// confetti is plain shapes, never the X: the X alone reads as another company's logo
// (CLAUDE.md rule 4), so the X appears here only inside the whole wordmark. The sticker
// carries no number because the signup function does not return one; it must never show a
// number that is not the person's real place. Reduced motion: the sticker, no confetti.
const PIECES = 26;

export function LoudSticker({ celebrate, wordmarkSvg }: { celebrate: boolean; wordmarkSvg?: string }) {
  const [falling, setFalling] = useState(celebrate);

  useEffect(() => {
    if (!celebrate) return;
    const timer = window.setTimeout(() => setFalling(false), 3200);
    return () => window.clearTimeout(timer);
  }, [celebrate]);

  return (
    <>
      <div className="loud-sticker" data-loud-sticker>
        <span className="loud-sticker-word">Founding friend.</span>
        <span className="loud-sticker-tab">
          {wordmarkSvg ? <span className="brand-mark loud-sticker-mark" dangerouslySetInnerHTML={{ __html: wordmarkSvg }} /> : null}
          <span>You’re on the list.</span>
        </span>
      </div>
      {falling ? (
        <div className="loud-confetti" aria-hidden="true" data-loud-confetti>
          {Array.from({ length: PIECES }, (_, i) => {
            // Spread without randomness, so the server and the browser agree and every burst
            // looks the same: position, drift, spin, delay and shape all follow the index.
            const left = (i * 37 + 11) % 100;
            const drift = ((i * 53) % 41) - 20;
            const spin = 180 + ((i * 97) % 540);
            const delay = (i % 9) * 55;
            const duration = 1700 + ((i * 131) % 1100);
            const shape = i % 3 === 0 ? 'disc' : 'slip';
            const tone = i % 4 === 1 ? 'ink' : i % 4 === 3 ? 'snow' : 'sun';
            return (
              <span
                key={i}
                className="loud-piece"
                data-shape={shape}
                data-tone={tone}
                style={{ left: `${left}%`, ['--drift' as string]: `${drift}vw`, ['--spin' as string]: `${spin}deg`, animationDelay: `${delay}ms`, animationDuration: `${duration}ms` }}
              />
            );
          })}
        </div>
      ) : null}
    </>
  );
}
