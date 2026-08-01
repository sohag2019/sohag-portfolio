'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * GSAP scroll reveal — clip + fade + rise for section entrances.
 */
export default function Reveal({
  children,
  className = '',
  y = 40,
  delay = 0,
  stagger = 0.09,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const targets = el.querySelectorAll('[data-reveal]');
      const items = targets.length ? Array.from(targets) : [el];

      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0, clearProps: 'transform,opacity,clipPath' });
        return;
      }

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y,
          clipPath: 'inset(8% 0 0 0)',
        },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.95,
          delay,
          stagger: targets.length ? stagger : 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
