'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { SiteStatus, Availability } from '@/lib/types';
import type { LastCommit } from '@/lib/github';

gsap.registerPlugin(useGSAP);

const availabilityMeta: Record<Availability, { label: string; color: string }> = {
  available: { label: 'available for roles & contracts', color: '#34d399' },
  'deep-work': { label: 'in deep work — replies may be slower', color: '#fbbf24' },
  busy: { label: 'a bit busy this week', color: '#f59e0b' },
  offline: { label: 'offline for a bit', color: '#9ca3af' },
};

export default function LiveStatusStrip({ status }: { status: SiteStatus }) {
  const root = useRef<HTMLElement>(null);
  const [commit, setCommit] = useState<LastCommit | null>(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    let alive = true;
    fetch('/api/github')
      .then((r) => r.json())
      .then((d) => {
        if (alive) setCommit(d.lastCommit ?? null);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      try {
        setTime(
          new Date().toLocaleTimeString('en-GB', {
            timeZone: status.timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        );
      } catch {
        setTime('');
      }
    };
    tick();
    const id = setInterval(tick, 1000 * 30);
    return () => clearInterval(id);
  }, [status.timezone]);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;
      gsap.from('.now-line', {
        opacity: 0,
        y: 14,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      });
    },
    { scope: root }
  );

  const avail = availabilityMeta[status.availability] ?? availabilityMeta.available;

  return (
    <section ref={root} className="now-section" aria-label="What I am up to">
      <div className="nav-container">
        <div className="now-note">
          <p className="now-line now-kicker">Right now</p>

          <p className="now-line now-lead">
            <span className="now-dot" style={{ background: avail.color }} aria-hidden />
            I&apos;m <span style={{ color: avail.color }}>{avail.label}</span>.
          </p>

          <p className="now-line now-body">
            Building <em>{status.currentlyBuilding}</em>
            <span className="now-sep" aria-hidden>
              ·
            </span>
            {status.howIWork}
          </p>

          <p className="now-line now-meta">
            {commit ? (
              <a
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="now-commit"
                title={commit.message}
              >
                Last push in <span>{commit.repo}</span>
                <span className="now-sep" aria-hidden>
                  ·
                </span>
                {commit.relative}
              </a>
            ) : (
              <span className="now-muted">Syncing latest commit…</span>
            )}
            <span className="now-sep" aria-hidden>
              ·
            </span>
            <span>
              {status.location} {time || '—'}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
