'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { HeroContent } from '@/lib/types';

gsap.registerPlugin(useGSAP);

export default function Hero({
  content,
  resumeUrl,
}: {
  content: HeroContent;
  resumeUrl?: string;
}) {
  const {
    name,
    roleTitle,
    badgeText,
    headingLines,
    description,
    techPills,
    stats,
    profileImage,
  } = content;

  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Photo: cinematic wipe + ken burns settle
      gsap.set('.hero-visual-clip', { clipPath: 'inset(0 100% 0 0)' });
      gsap.set('.hero-visual-img', { scale: 1.18 });

      tl.to('.hero-visual-clip', {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.25,
        ease: 'power4.inOut',
      })
        .to('.hero-visual-img', { scale: 1.05, duration: 1.6, ease: 'power2.out' }, 0.15)
        .from('.hero-status', { opacity: 0, y: 14, duration: 0.45 }, 0.35)
        .from('.hero-name-line', { yPercent: 105, duration: 0.85, stagger: 0.08 }, 0.4)
        .from('.hero-role', { opacity: 0, y: 12, duration: 0.4 }, '-=0.4')
        .from('.hero-headline', { opacity: 0, y: 18, duration: 0.55 }, '-=0.25')
        .from('.hero-desc', { opacity: 0, y: 14, duration: 0.5 }, '-=0.3')
        .from('.hero-cta', { opacity: 0, y: 12, duration: 0.4, stagger: 0.06 }, '-=0.25')
        .from('.hero-proof-item', { opacity: 0, y: 16, duration: 0.45, stagger: 0.08 }, '-=0.2')
        .from('.hero-tech', { opacity: 0, duration: 0.45 }, '-=0.15')
        .from('.hero-visual-meta', { opacity: 0, y: 10, duration: 0.4 }, 0.9);

      rootRef.current?.querySelectorAll<HTMLElement>('[data-stat-value]').forEach((el) => {
        const target = Number(el.dataset.statValue || 0);
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 1.35,
          delay: 1.05,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = String(Math.round(obj.n)).padStart(2, '0');
          },
        });
      });

      // Gentle ongoing drift on the portrait
      gsap.to('.hero-visual-img', {
        scale: 1.1,
        duration: 10,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.8,
      });
    },
    { scope: rootRef }
  );

  const headline = headingLines.map((l) => l.text).join(' ');

  return (
    <section ref={rootRef} className="hero-section">
      <div className="hero-shell">
        {/* ── Visual plane ── */}
        <div className="hero-visual">
          <div className="hero-visual-frame">
            <div className="hero-visual-clip">
              <Image
                src={profileImage}
                alt={name}
                fill
                priority
                className="hero-visual-img"
                sizes="(max-width: 960px) 90vw, 40vw"
              />
            </div>
            <div className="hero-visual-meta">
              <span className="hero-visual-kicker">Portrait</span>
              <span className="hero-visual-note">Full Stack Developer</span>
            </div>
          </div>
        </div>

        {/* ── Content plane ── */}
        <div className="hero-content">
          <div className="hero-status">
            <span className="hero-status-dot" aria-hidden />
            <span className="hero-status-text">{badgeText}</span>
          </div>

          <h1 className="hero-name">
            {name.split(/\s+/).map((part) => (
              <span key={part} className="hero-name-mask">
                <span className="hero-name-line">{part}</span>
              </span>
            ))}
          </h1>

          <p className="hero-role">{roleTitle}</p>

          <p className="hero-headline">{headline}</p>

          <p className="hero-desc">{description}</p>

          <div className="hero-cta-row">
            <Link href="/#experience" className="hero-cta hero-cta-primary">
              View experience
              <span aria-hidden>→</span>
            </Link>
            <Link href="/#projects" className="hero-cta hero-cta-ghost">
              See projects
            </Link>
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta hero-cta-ghost"
              >
                Resume
                <span aria-hidden>↗</span>
              </a>
            ) : null}
            <Link href="/#connect" className="hero-cta hero-cta-ghost">
              Contact
            </Link>
          </div>

          <div className="hero-proof" aria-label="Key metrics">
            {stats.map((stat) => (
              <div key={stat.label} className="hero-proof-item">
                <div className="hero-proof-value">
                  <span data-stat-value={stat.value}>
                    {String(stat.value).padStart(2, '0')}
                  </span>
                  <span className="hero-proof-suffix">{stat.suffix}</span>
                </div>
                <div className="hero-proof-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="hero-tech" aria-label="Core technologies">
            {techPills.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
