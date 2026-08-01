'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const facts = [
  { value: '4+ years' },
  { value: 'Full Stack Developer' },
  { value: 'React · Node · Cloud' },
  { value: 'Dhaka, BD' },
  { value: 'Open to work', live: true },
];

export default function Snapshot() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      gsap.from('.glance-item', {
        opacity: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 90%',
          once: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="glance-section" aria-label="Quick facts">
      <div className="nav-container">
        <div className="glance-row">
          {facts.map((f, i) => (
            <span key={f.value} className="glance-item">
              {i > 0 ? <span className="glance-sep" aria-hidden /> : null}
              <span className={f.live ? 'is-live' : undefined}>
                {f.live ? <span className="glance-dot" aria-hidden /> : null}
                {f.value}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
