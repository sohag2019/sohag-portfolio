'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';

const tickerLogs = [
  'deploying Next.js apps to Vercel',
  'refactoring REST APIs to GraphQL',
  'writing unit tests with Jest & RTL',
  'optimizing PostgreSQL queries',
  'containerizing services with Docker',
  'building CI/CD pipelines',
  'status: deep-work-mode',
];

const commitData = [3, 5, 2, 7, 4, 6, 1, 8, 3, 5, 9, 2, 6, 4, 7, 3, 5, 8, 2, 6];

function TiltCard({
  children,
  className = '',
  delay = 0,
  glowColor = 'rgba(59,130,246,0.15)',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [6, -6]);
  const rotateY = useTransform(x, [-150, 150], [-6, 6]);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={ref}
      className={`now-card-v2 relative overflow-hidden ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
    >
      <div
        className="now-card-glow absolute -inset-px rounded-[inherit] -z-10 opacity-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
        }}
      />
      {children}
    </motion.article>
  );
}

export default function Currently() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Ambient bg */}
      <div className="currently-bg-glow absolute -z-10" />

      <div className="nav-container">
        {/* Section header */}
        <motion.div
          className="flex gap-[18px] items-baseline mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="font-mono text-[48px] font-bold tracking-tight"
            style={{ color: 'var(--hair)', lineHeight: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            01
          </motion.span>
          <div className="flex flex-col gap-1">
            <span
              className="font-mono text-[11px] tracking-[0.08em] uppercase"
              style={{ color: 'var(--muted)', opacity: 0.5 }}
            >
              / Now
            </span>
            <span
              className="text-[22px] font-medium tracking-[-0.02em]"
              style={{ color: 'var(--fg)' }}
            >
              Currently
            </span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          className="flex justify-between gap-6 flex-wrap items-end mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p
            className="m-0 text-[15px] max-w-[620px]"
            style={{ lineHeight: 1.65, color: 'var(--muted)' }}
          >
            A live snapshot of what I&apos;m working on right now: shipping
            features, learning new tools, side projects, and the current book
            on the nightstand.
          </p>
          <motion.span
            className="now-updated-badge font-mono text-[11px] tracking-[0.08em] uppercase px-3 py-1.5 rounded-full"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ● Updated May 2026
          </motion.span>
        </motion.div>

        {/* Top 2-col cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Work card */}
          <TiltCard delay={0.15} glowColor="rgba(34,197,94,0.12)" className="p-6 md:p-7">
            <div className="flex items-center gap-2 mb-5">
              <span className="now-icon-badge">⚡</span>
              <span
                className="font-mono text-[11px] tracking-[0.08em] uppercase font-medium"
                style={{ color: 'var(--fg)' }}
              >
                Work
              </span>
            </div>
            <h3
              className="m-0 font-medium tracking-[-0.02em]"
              style={{ fontSize: 'clamp(19px, 2vw, 24px)', lineHeight: 1.15 }}
            >
              Building scalable full stack products
            </h3>
            <p className="m-0 mt-4 text-sm" style={{ lineHeight: 1.65, color: 'var(--muted)' }}>
              Architecting end-to-end features with React, Next.js, and Node.js —
              from database schema design to production deployment on cloud infrastructure.
            </p>
            {/* Mini commit graph */}
            <div className="mt-6 flex items-end gap-[3px] h-[40px]">
              {commitData.map((h, i) => (
                <motion.div
                  key={i}
                  className="now-commit-bar flex-1 rounded-sm"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h * 10}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.03 }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-mono text-[9px] uppercase" style={{ color: 'var(--muted)', opacity: 0.4 }}>
                4 weeks ago
              </span>
              <span className="font-mono text-[9px] uppercase" style={{ color: 'var(--muted)', opacity: 0.4 }}>
                today
              </span>
            </div>
          </TiltCard>

          {/* Learning card */}
          <TiltCard delay={0.2} glowColor="rgba(168,85,247,0.12)" className="p-6 md:p-7">
            <div className="flex items-center gap-2 mb-5">
              <span className="now-icon-badge">🧠</span>
              <span
                className="font-mono text-[11px] tracking-[0.08em] uppercase font-medium"
                style={{ color: 'var(--fg)' }}
              >
                Learning
              </span>
            </div>
            <h3
              className="m-0 font-medium tracking-[-0.02em]"
              style={{ fontSize: 'clamp(19px, 2vw, 24px)', lineHeight: 1.15 }}
            >
              Exploring AI agents &amp; local LLM workflows
            </h3>
            <p className="m-0 mt-4 text-sm" style={{ lineHeight: 1.65, color: 'var(--muted)' }}>
              Diving deep into AI-powered dev tools, MCP integrations, and
              building smarter automation pipelines to streamline engineering workflows.
            </p>
            {/* Skills progress */}
            <div className="mt-6 flex flex-col gap-3">
              {[
                { label: 'AI Agents', pct: 70 },
                { label: 'MCP Protocol', pct: 55 },
                { label: 'LangChain', pct: 40 },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between mb-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
                      {s.label}
                    </span>
                    <span className="font-mono text-[10px]" style={{ color: 'var(--muted)', opacity: 0.5 }}>
                      {s.pct}%
                    </span>
                  </div>
                  <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'var(--hair)' }}>
                    <motion.div
                      className="h-full rounded-full now-progress-bar"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
        </div>

        {/* Bottom 3-col cards */}
        <div className="grid gap-6 mt-6 md:grid-cols-12">
          {/* Side Project */}
          <TiltCard delay={0.25} glowColor="rgba(59,130,246,0.12)" className="p-6 md:p-7 flex flex-col md:col-span-4">
            <div className="flex items-center gap-2 mb-5">
              <span className="now-icon-badge">🚀</span>
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase font-medium" style={{ color: 'var(--fg)' }}>
                Side Project
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-between gap-6">
              <div>
                <h3 className="m-0 font-medium tracking-[-0.02em]" style={{ fontSize: 'clamp(19px, 2vw, 24px)', lineHeight: 1.15 }}>
                  Dev Portfolio v2
                </h3>
                <p className="m-0 mt-3 text-sm" style={{ lineHeight: 1.6, color: 'var(--muted)' }}>
                  Rebuilding this site with Next.js, Framer Motion, and a clean editorial design.
                </p>
              </div>
              {/* Terminal widget */}
              <div className="now-terminal rounded-lg overflow-hidden">
                <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: '1px solid var(--hair)' }}>
                  <span className="size-[7px] rounded-full" style={{ background: '#ef4444' }} />
                  <span className="size-[7px] rounded-full" style={{ background: '#eab308' }} />
                  <span className="size-[7px] rounded-full" style={{ background: '#22c55e' }} />
                  <span className="font-mono text-[9px] ml-2" style={{ color: 'var(--muted)', opacity: 0.4 }}>~/portfolio</span>
                </div>
                <div className="px-3 py-3 font-mono text-[10px] leading-relaxed">
                  <div style={{ color: 'var(--muted)', opacity: 0.5 }}>$ git log --oneline -3</div>
                  <motion.div
                    className="mt-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                  >
                    <div><span style={{ color: '#f59e0b' }}>a3f2d1c</span> <span style={{ color: 'var(--muted)' }}>add currently section</span></div>
                    <div><span style={{ color: '#f59e0b' }}>b7e4a09</span> <span style={{ color: 'var(--muted)' }}>hero 3D tilt effect</span></div>
                    <div><span style={{ color: '#f59e0b' }}>c1d8f32</span> <span style={{ color: 'var(--muted)' }}>navbar responsive fix</span></div>
                  </motion.div>
                  <div className="terminal-blink mt-2" style={{ color: '#22c55e' }}>▸ Ready on :3000</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'Framer', 'Tailwind'].map((t) => (
                  <span key={t} className="now-tag font-mono text-[10px] tracking-wider uppercase px-2 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>

          {/* Fuel */}
          <TiltCard delay={0.3} glowColor="rgba(234,179,8,0.12)" className="p-6 md:p-7 flex flex-col md:col-span-4">
            <div className="flex items-center gap-2 mb-5">
              <span className="now-icon-badge">☕</span>
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase font-medium" style={{ color: 'var(--fg)' }}>
                Fuel
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-between gap-6">
              <div>
                <h3 className="m-0 font-medium tracking-[-0.02em]" style={{ fontSize: 'clamp(19px, 2vw, 24px)', lineHeight: 1.15 }}>
                  Black Coffee
                </h3>
                <p className="m-0 mt-3 text-sm" style={{ lineHeight: 1.6, color: 'var(--muted)' }}>
                  Dark roast · No sugar · Pure focus
                </p>
              </div>
              {/* Coffee cups visual */}
              <div className="flex flex-col items-center gap-5">
                <div className="flex gap-3 items-end">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="now-coffee-cup relative"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.15, type: 'spring' }}
                    >
                      <div className="now-coffee-steam" />
                    </motion.div>
                  ))}
                </div>
                <div className="text-center">
                  <div className="font-mono text-[11px] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
                    3 cups today
                  </div>
                  <div className="font-mono text-[9px] uppercase mt-1" style={{ color: 'var(--muted)', opacity: 0.4 }}>
                    Debug fuel · Late night sessions
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Espresso', 'Pour Over'].map((t) => (
                  <span key={t} className="now-tag font-mono text-[10px] tracking-wider uppercase px-2 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>

          {/* Reading */}
          <TiltCard delay={0.35} glowColor="rgba(99,102,241,0.12)" className="p-6 md:p-7 flex flex-col md:col-span-4">
            <div className="flex items-center gap-2 mb-5">
              <span className="now-icon-badge">📖</span>
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase font-medium" style={{ color: 'var(--fg)' }}>
                Reading
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-between gap-6">
              <div>
                <span className="font-mono text-[10px] tracking-[0.08em] uppercase block mb-2" style={{ color: 'var(--muted)', opacity: 0.5 }}>
                  Martin Kleppmann
                </span>
                <h3 className="m-0 font-medium tracking-[-0.02em]" style={{ fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.2 }}>
                  Designing Data-Intensive Applications
                </h3>
              </div>
              {/* Book widget */}
              <div className="flex justify-center">
                <motion.div
                  className="now-book-widget relative group cursor-default"
                  whileHover={{ rotateY: -8, scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  style={{ transformPerspective: 400 }}
                >
                  <div className="absolute left-3 right-3 bottom-[-8px] h-3 rounded-full blur-md" style={{ background: 'rgba(0,0,0,0.2)' }} />
                  <div
                    className="relative w-[110px] aspect-[2/3] flex flex-col justify-between p-3 rounded-sm"
                    style={{
                      background: 'linear-gradient(160deg, #1a365d 0%, #2563eb 48%, #1e1b4b 100%)',
                      color: '#f5f1ea',
                      boxShadow: '6px 8px 0 var(--hair-2)',
                    }}
                  >
                    <div className="font-mono pb-1.5" style={{ fontSize: 7, letterSpacing: '0.18em', color: 'rgba(245,241,234,0.35)', borderBottom: '1px solid rgba(245,241,234,0.12)' }}>
                      NIGHTSTAND
                    </div>
                    <div>
                      <div className="font-sans leading-[1.1] font-medium" style={{ fontSize: 11 }}>
                        Designing Data-Intensive Apps
                      </div>
                      <div className="mt-1.5 font-mono uppercase" style={{ fontSize: 7, letterSpacing: '0.1em', color: 'rgba(245,241,234,0.5)' }}>
                        Kleppmann
                      </div>
                    </div>
                    {/* Reading progress */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-sm overflow-hidden" style={{ background: 'rgba(0,0,0,0.3)' }}>
                      <motion.div
                        className="h-full"
                        style={{ background: '#60a5fa' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '42%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.8 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--muted)', opacity: 0.5 }}>
                  Ch. 5 · Replication
                </span>
                <span className="font-mono text-[10px]" style={{ color: 'var(--muted)', opacity: 0.4 }}>
                  42%
                </span>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Scrolling ticker */}
        <motion.div
          className="mt-12 py-[14px] overflow-hidden now-ticker-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="ticker-track whitespace-nowrap font-mono text-[12px] tracking-[0.04em] inline-block">
            {[0, 1].map((copy) => (
              <span key={copy}>
                {tickerLogs.map((log) => (
                  <span key={`${copy}-${log}`} className="px-[22px]">
                    <span style={{ color: 'var(--fg)' }} className="mr-[10px]">
                      Log
                    </span>
                    <span style={{ color: 'var(--muted)' }}>
                      &gt; {log}
                    </span>
                    <span className="ml-[22px]" style={{ color: 'var(--hair-2)' }}>
                      /
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
