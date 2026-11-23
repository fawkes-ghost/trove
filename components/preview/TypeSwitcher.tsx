'use client';

import { useEffect, useState } from 'react';

// PREVIEW ONLY. This branch exists to choose a typeface and is not for merging. The switcher
// sets data-type on <html>; app/type-options.css swaps the families under the site's own
// font tokens, so every page, not a specimen, is shown in the option. The choice is kept in
// localStorage and can be set from a link with ?type=a, ?type=b, ?type=c or ?type=current.
const KEY = 'trove:type-option';

export type TypeOption = { id: string; name: string; faces: string };

export function TypeSwitcher({ options }: { options: TypeOption[] }) {
  const [current, setCurrent] = useState('current');
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setCurrent(document.documentElement.dataset.type ?? 'current');
    // On a phone it starts as one small button, so the page is seen first.
    if (window.matchMedia('(max-width: 899px)').matches) setOpen(false);
  }, []);

  const choose = (id: string) => {
    if (id === 'current') delete document.documentElement.dataset.type;
    else document.documentElement.dataset.type = id;
    try {
      localStorage.setItem(KEY, id);
    } catch {
      // Private mode: the choice simply lasts for this page.
    }
    setCurrent(id);
  };

  const active = options.find((option) => option.id === current) ?? options[0];

  return (
    <div className="type-switcher" data-type-switcher>
      {open ? (
        <>
          <div className="type-switcher-row" role="radiogroup" aria-label="Type option">
            {options.map((option) => (
              <button key={option.id} type="button" role="radio" aria-checked={option.id === current} onClick={() => choose(option.id)}>
                {option.name}
              </button>
            ))}
            <button type="button" onClick={() => setOpen(false)} aria-label="Hide the type switcher">
              Hide
            </button>
          </div>
          <p>{active.faces}</p>
        </>
      ) : (
        <button type="button" onClick={() => setOpen(true)}>
          Type: {active.name}
        </button>
      )}
    </div>
  );
}
