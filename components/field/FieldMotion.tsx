'use client';

import { useEffect, useRef } from 'react';
import { VIEWPORT_LINES, isTouch, motion, motionAllowed, observeLines } from '@/lib/motion';

type Props = {
  children: React.ReactNode;
  // Cumulative lit counts per step. With more than one step the later steps light as the
  // section moves through the viewport; with one step every lit mark lights after the draw.
  steps: number[];
  // Light the marks one after another after the draw, instead of all at once.
  stagger?: boolean;
  className?: string;
};

// The section's progress through the viewport: 0 as its top reaches 60% down the screen,
// 1 as its bottom reaches the same line. The same measure on every device.
function progressOf(rect: DOMRect, viewport: number): number {
  const line = viewport * 0.6;
  return Math.min(1, Math.max(0, (line - rect.top) / rect.height));
}

// Draws a field in over 800ms as it enters, top to bottom, then lights its marks: at once,
// staggered, or step by step as the section moves through the viewport. On desktop the
// steps follow the smoothed scroll through ScrollTrigger; on touch devices, where scroll
// events are throttled, everything runs from IntersectionObservers on lines across the
// viewport and reads the same to the eye. Reads only the DOM beneath it. Under reduced motion nothing runs and the
// server-rendered final state stands.
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
    const stepFor = (progress: number) => steps[Math.min(steps.length - 1, Math.floor(progress * steps.length))];

    const draw = gsap.timeline({ paused: true });
    draw.to(reveals, { scaleY: 1, duration: 0.8, ease: 'power1.inOut' });
    if (stagger) {
      const first = steps[0];
      for (let i = 1; i <= first; i++) draw.call(() => light(i), [], 0.8 + (i - 1) * 0.05);
    } else {
      draw.call(() => light(steps[0]), [], 0.8);
    }

    const observers: IntersectionObserver[] = [];
    let stopLines = () => {};
    let ctx: ReturnType<typeof gsap.context> | null = null;

    if (isTouch()) {
      const enter = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            draw.play();
            enter.disconnect();
          }
        },
        { rootMargin: '0px 0px -20% 0px' },
      );
      enter.observe(field);
      observers.push(enter);
      if (steps.length > 1) {
        stopLines = observeLines(
          root,
          (rect) => {
            if (draw.progress() < 1) return;
            light(stepFor(progressOf(rect, window.innerHeight)));
          },
          VIEWPORT_LINES,
        );
      }
    } else {
      ctx = gsap.context(() => {
        ScrollTrigger.create({ trigger: field, start: 'top 80%', once: true, onEnter: () => draw.play() });
        if (steps.length > 1) {
          ScrollTrigger.create({
            trigger: root,
            start: 'top 60%',
            end: 'bottom 60%',
            onUpdate: (self) => {
              if (draw.progress() < 1) return;
              light(stepFor(self.progress));
            },
          });
        }
      }, root);
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
      stopLines();
      ctx?.revert();
      draw.kill();
    };
  }, [steps, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
