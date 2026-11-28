// The kicker used sitewide, in the sans at 500: sentence case, a full stop, never caps. Ink on snow, snow
// on ink or film.
export function Kicker({ children, tone = 'snow', className = '' }: { children: React.ReactNode; tone?: 'snow' | 'ink' | 'film'; className?: string }) {
  const colour = tone === 'snow' ? 'text-ink/70' : tone === 'ink' ? 'text-snow/70' : 'text-snow/80';
  return <p className={`text-[0.8125rem] font-medium tracking-[0.02em] ${colour} ${className}`}>{children}</p>;
}
