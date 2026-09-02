'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';

// Motion stub. Proves the wiring; the real moments arrive with hero-and-ledger.
export function Fade({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.4 }}
    >
      {children}
    </motion.div>
  );
}
