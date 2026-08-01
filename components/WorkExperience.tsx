'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { WorkEntry } from '@/lib/types';
import { seedWork } from '@/lib/seed';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Entry({ exp }: { exp: WorkEntry }) {
  const [open, setOpen] = useState(false);
  const highlights = exp.highlights.slice(0, 3);

  return (
    <article className={`exp-item${exp.isCurrent ? ' is-current' : ''}`} data-exp-entry>
      <div className="exp-rail" aria-hidden>
        <span className="exp-rail-dot" />
      </div>

      <div className="exp-body">
        <div className="exp-top">
          <div className="exp-dates">
            <span>{exp.timeframe}</span>
            {exp.duration ? <span className="exp-muted">· {exp.duration}</span> : null}
            {exp.isCurrent ? <span className="exp-badge">Current</span> : null}
          </div>

          <h3 className="exp-role">{exp.role}</h3>

          <p className="exp-company">
            {exp.company}
            {exp.location ? <span className="exp-muted"> · {exp.location}</span> : null}
            {exp.workMode ? <span className="exp-muted"> · {exp.workMode}</span> : null}
          </p>
        </div>

        {exp.result ? <p className="exp-summary">{exp.result}</p> : null}

        {highlights.length > 0 ? (
          <ul className="exp-list-bullets">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        {exp.skills.length > 0 ? (
          <p className="exp-stack">
            {exp.skills.join(' · ')}
          </p>
        ) : null}

        <button
          type="button"
          className="exp-more-btn"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? 'Hide details' : 'More details'}
        </button>

        {open ? (
          <div className="exp-details">
            {exp.context ? (
              <p>
                <strong>Context</strong>
                {exp.context}
              </p>
            ) : null}
            {exp.constraint ? (
              <p>
                <strong>Constraint</strong>
                {exp.constraint}
              </p>
            ) : null}
            {exp.decision ? (
              <p>
                <strong>Decision</strong>
                {exp.decision}
              </p>
            ) : null}
            {exp.tradeoff ? (
              <p>
                <strong>Tradeoff</strong>
                {exp.tradeoff}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function WorkExperience({ entries }: { entries?: WorkEntry[] }) {
  const data = entries && entries.length ? entries : seedWork;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      gsap.from('[data-exp-entry]', {
        opacity: 0,
        y: 24,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 78%',
          once: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="exp-section">
      <div className="nav-container exp-wrap">
        <header className="exp-header">
          <p className="section-kicker">Career path</p>
          <h2 className="section-title">Experience</h2>
          <p className="section-lead">
            Recent roles and the impact I delivered — scan the summary, open details if you want the story.
          </p>
        </header>

        <div className="exp-timeline">
          {data.map((exp) => (
            <Entry key={exp.id} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
