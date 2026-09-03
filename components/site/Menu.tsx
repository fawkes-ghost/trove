'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import type { Route } from '@/lib/routes';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { getLenis } from '@/lib/lenis';

type Groups = { escapes: Route[]; information: Route[]; legal: Route[] };

// Full-screen overlay menu: escapes and information in two groups, legal small at the base.
export function Menu({ groups }: { groups: Groups }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lenis?.start();
      buttonRef.current?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);
  const duration = reduced ? 0 : 0.35;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className={`relative z-[60] -mr-3 flex h-11 w-11 flex-col items-center justify-center gap-[6px] ${open ? 'text-snow' : ''}`}
      >
        <motion.span
          className="block h-px w-[22px] bg-current"
          animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
          transition={{ duration }}
        />
        <motion.span
          className="block h-px w-[22px] bg-current"
          animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
          transition={{ duration }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id={id}
            aria-label="Site"
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink px-6 pt-28 pb-8 text-snow md:px-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
          >
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <MenuGroup title="Escapes" items={groups.escapes} onNavigate={close} firstRef={firstLinkRef} reduced={reduced} delay={0.1} />
              <MenuGroup title="Information" items={groups.information} onNavigate={close} reduced={reduced} delay={0.18} />
            </div>
            <motion.ul
              className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-16 text-[13px] text-snow/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration, delay: reduced ? 0 : 0.3 }}
            >
              {groups.legal.map((route) => (
                <li key={route.href}>
                  <Link href={route.href} onClick={close} className="hover:text-snow">
                    {route.label}
                  </Link>
                </li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuGroup({
  title,
  items,
  onNavigate,
  firstRef,
  reduced,
  delay,
}: {
  title: string;
  items: Route[];
  onNavigate: () => void;
  firstRef?: React.RefObject<HTMLAnchorElement | null>;
  reduced: boolean;
  delay: number;
}) {
  return (
    <div>
      <p className="text-[13px] font-medium text-snow/60">{title}</p>
      <ul className="mt-4 flex flex-col gap-2">
        {items.map((route, index) => (
          <motion.li
            key={route.href}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : delay + index * 0.05 }}
          >
            <Link
              href={route.href}
              onClick={onNavigate}
              ref={index === 0 ? firstRef : undefined}
              className="display text-[2rem] leading-tight hover:text-accent md:text-[2.5rem]"
            >
              {route.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
