'use client';

import { useEffect, useState, type ReactNode } from 'react';

// PREVIEW ONLY. Renders its children only while the Loud option is chosen, so the second
// signup form Loud puts in the hero (and its Turnstile widget) does not exist on the page
// under any other option. Follows the switcher by watching data-type on <html>.
export function LoudOnly({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setOn(root.dataset.type === 'loud');
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ['data-type'] });
    return () => observer.disconnect();
  }, []);
  return on ? <>{children}</> : null;
}
