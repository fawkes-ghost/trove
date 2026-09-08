'use client';

import { useEffect, useRef } from 'react';
import { afterPin, motion, motionAllowed } from '@/lib/motion';

type Props = {
  children: React.ReactNode;
  // Cumulative lit counts per step. With more than one step the later steps light as the
  // section scrolls; with one step every lit mark lights after the draw.
  steps: number[];
  // Light the marks one after another after the draw, instead of all at once.
  stagger?: boolean;
  className?: string;
};

// Draws a field in over 800ms as it enters, top to bottom, then lights its marks: at once,
// staggered, or step by step as the visitor scrolls on. Reads only the DOM beneath it.
// Under reduced motion nothing runs and the server-rendered final state stands.
export function FieldMotion({ children, steps, stagger = false, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !motionAllowed()) return;
    const { gsap, ScrollTrigger } = motion();
    const field = root.querySelector<HTMLElement>('[data-field]');
    if (!field) return;
    const reveals = Array.from(field.querySelectorAll<SVGRectElement>('[data-field-reveal]'));
    const marks = Array.from(field.querySelectorAll<SVGCircleElement>('.field-lit'));
    const ladder = Array.from(root.querySelectorAll<HTMLElement>('[data-ladder-step]'));

    // Take over from the CSS start state: nothing drawn, nothing lit.
    reveals.forEach((rect) => gsap.set(rect, { scaleY: 0, transformOrigin: 'top' }));
    marks.forEach((mark) => mark.removeAttribute('data-on'));
    field.setAttribute('data-field-live', '');

    const light = (count: number) => {
      marks.forEach((mark) => {
        const position = Number(mark.dataset.mark);
        if (position < count) mark.setAttribute('data-on', '');
        else mark.removeAttribute('data-on');
      });
      const step = steps.findIndex((cumulative) => count <= cumulative);
      ladder.forEach((line) => line.setAttribute('data-active', Number(line.dataset.ladderStep) === step + 1 ? '' : 'no'));
    };

    let ctx: ReturnType<typeof gsap.context> | null = null;
    const stop = afterPin(() => {
    ctx = gsap.context(() => {
      const draw = gsap.timeline({ paused: true });
      draw.to(reveals, { scaleY: 1, duration: 0.8, ease: 'power1.inOut' });
      if (stagger) {
        const first = steps[0];
        for (let i = 1; i <= first; i++) draw.call(() => light(i), [], 0.8 + (i - 1) * 0.05);
      } else {
        draw.call(() => light(steps[0]), [], 0.8);
      }

      ScrollTrigger.create({ trigger: field, start: 'top 80%', once: true, onEnter: () => draw.play() });

      if (steps.length > 1) {
        ScrollTrigger.create({
          trigger: root,
          start: 'top 60%',
          end: 'bottom 60%',
          onUpdate: (self) => {
            if (draw.progress() < 1) return;
            const step = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
            light(steps[step]);
          },
        });
      }
    }, root);
    });

    return () => {
      stop();
      ctx?.revert();
    };
  }, [steps, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
