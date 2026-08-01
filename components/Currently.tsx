'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { CurrentlyCard, CurrentlyContent } from '@/lib/types';

/* eslint-disable @typescript-eslint/no-explicit-any */

const glowColors = [
  'rgba(34,197,94,0.12)',
  'rgba(168,85,247,0.12)',
  'rgba(59,130,246,0.12)',
  'rgba(234,179,8,0.12)',
  'rgba(99,102,241,0.12)',
];

const fakeHashes = ['a3f2d1c', 'b7e4a09', 'c1d8f32', 'd9e21ab', 'ef4a7c3', '012b4de'];

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

function bottomSpanClass(count: number) {
  if (count <= 1) return 'md:col-span-12';
  if (count === 2) return 'md:col-span-6';
  if (count === 3) return 'md:col-span-4';
  return 'md:col-span-3';
}

function BookHeader({ card }: { card: CurrentlyCard }) {
  return (
    <div>
      <span
        className="font-mono text-[10px] tracking-[0.08em] uppercase block mb-2"
        style={{ color: 'var(--muted)', opacity: 0.5 }}
      >
        {card.description}
      </span>
      <h3
        className="m-0 font-medium tracking-[-0.02em]"
        style={{ fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.2 }}
      >
        {card.title}
      </h3>
    </div>
  );
}

function BookWidget({ card, meta }: { card: CurrentlyCard; meta: Record<string, any> }) {
  const progress = Number(meta.progressPct) || 0;
  return (
    <>
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
            <div
              className="font-mono pb-1.5"
              style={{ fontSize: 7, letterSpacing: '0.18em', color: 'rgba(245,241,234,0.35)', borderBottom: '1px solid rgba(245,241,234,0.12)' }}
            >
              {String(meta.shelfLabel ?? 'NIGHTSTAND')}
            </div>
            <div>
              <div className="font-sans leading-[1.1] font-medium" style={{ fontSize: 11 }}>
                {card.title}
              </div>
              <div className="mt-1.5 font-mono uppercase" style={{ fontSize: 7, letterSpacing: '0.1em', color: 'rgba(245,241,234,0.5)' }}>
                {card.description}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-sm overflow-hidden" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <motion.div
                className="h-full"
                style={{ background: '#60a5fa' }}
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.8 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--muted)', opacity: 0.5 }}>
          {String(meta.chapter ?? '')}
        </span>
        <span className="font-mono text-[10px]" style={{ color: 'var(--muted)', opacity: 0.4 }}>
          {progress}%
        </span>
      </div>
    </>
  );
}

function CardWidget({ card }: { card: CurrentlyCard }) {
  const meta = (card.meta ?? {}) as Record<string, any>;
  const type = meta.type as string | undefined;

  if (type === 'commit-graph') {
    const data: number[] = Array.isArray(meta.commitData) ? meta.commitData : [];
    return (
      <div>
        <div className="mt-6 flex items-end gap-[3px] h-[40px]">
          {data.map((h, i) => (
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
            {String(meta.fromLabel ?? '')}
          </span>
          <span className="font-mono text-[9px] uppercase" style={{ color: 'var(--muted)', opacity: 0.4 }}>
            {String(meta.toLabel ?? '')}
          </span>
        </div>
      </div>
    );
  }

  if (type === 'skills') {
    const skills: { label: string; pct: number }[] = Array.isArray(meta.skills) ? meta.skills : [];
    return (
      <div className="mt-6 flex flex-col gap-3">
        {skills.map((s) => (
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
    );
  }

  if (type === 'terminal') {
    const lines: string[] = Array.isArray(meta.terminalLines) ? meta.terminalLines : [];
    return (
      <div className="now-terminal rounded-lg overflow-hidden mt-6">
        <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: '1px solid var(--hair)' }}>
          <span className="size-[7px] rounded-full" style={{ background: '#ef4444' }} />
          <span className="size-[7px] rounded-full" style={{ background: '#eab308' }} />
          <span className="size-[7px] rounded-full" style={{ background: '#22c55e' }} />
          <span className="font-mono text-[9px] ml-2" style={{ color: 'var(--muted)', opacity: 0.4 }}>
            {String(meta.terminalPath ?? '~/portfolio')}
          </span>
        </div>
        <div className="px-3 py-3 font-mono text-[10px] leading-relaxed">
          <div style={{ color: 'var(--muted)', opacity: 0.5 }}>$ git log --oneline -{lines.length || 3}</div>
          <motion.div
            className="mt-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            {lines.map((line, i) => (
              <div key={i}>
                <span style={{ color: '#f59e0b' }}>{fakeHashes[i % fakeHashes.length]}</span>{' '}
                <span style={{ color: 'var(--muted)' }}>{line}</span>
              </div>
            ))}
          </motion.div>
          <div className="terminal-blink mt-2" style={{ color: '#22c55e' }}>▸ Ready on :3000</div>
        </div>
      </div>
    );
  }

  if (type === 'coffee') {
    const cups = Math.max(1, Math.min(6, Number(meta.cupsToday) || 1));
    return (
      <div className="flex flex-col items-center gap-5 mt-6">
        <div className="flex gap-3 items-end">
          {Array.from({ length: cups }).map((_, i) => (
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
            {cups} cup{cups === 1 ? '' : 's'} today
          </div>
          <div className="font-mono text-[9px] uppercase mt-1" style={{ color: 'var(--muted)', opacity: 0.4 }}>
            {String(meta.note ?? '')}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function Card({
  card,
  index,
  wrapped,
  spanClassName = '',
}: {
  card: CurrentlyCard;
  index: number;
  wrapped: boolean;
  spanClassName?: string;
}) {
  const meta = (card.meta ?? {}) as Record<string, any>;
  const isBook = meta.type === 'book';

  const header = isBook ? (
    <BookHeader card={card} />
  ) : (
    <>
      <h3 className="m-0 font-medium tracking-[-0.02em]" style={{ fontSize: 'clamp(19px, 2vw, 24px)', lineHeight: 1.15 }}>
        {card.title}
      </h3>
      <p className="m-0 mt-4 text-sm" style={{ lineHeight: 1.65, color: 'var(--muted)' }}>
        {card.description}
      </p>
    </>
  );

  const widget = isBook ? <BookWidget card={card} meta={meta} /> : <CardWidget card={card} />;

  const tags = card.tags && card.tags.length > 0 && (
    <div className="flex flex-wrap gap-2">
      {card.tags.map((t) => (
        <span key={t} className="now-tag font-mono text-[10px] tracking-wider uppercase px-2 py-1 rounded">
          {t}
        </span>
      ))}
    </div>
  );

  return (
    <TiltCard
      delay={0.15 + index * 0.05}
      glowColor={glowColors[index % glowColors.length]}
      className={`p-6 md:p-7 ${wrapped ? 'flex flex-col' : ''} ${spanClassName}`}
    >
      <div className="flex items-center gap-2 mb-5">
        <span className="now-icon-badge">{card.icon}</span>
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase font-medium" style={{ color: 'var(--fg)' }}>
          {card.badge}
        </span>
      </div>
      {wrapped ? (
        <div className="flex-1 flex flex-col justify-between gap-6">
          {header}
          {widget}
          {tags}
        </div>
      ) : (
        <>
          {header}
          {widget}
          {tags && <div className="mt-6">{tags}</div>}
        </>
      )}
    </TiltCard>
  );
}

export default function Currently({ content }: { content: CurrentlyContent }) {
  const { updatedLabel, tickerLogs, cards } = content;
  const topCards = cards.slice(0, 2);
  const bottomCards = cards.slice(2);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Ambient bg */}
      <div className="currently-bg-glow absolute -z-10" />

      <div className="nav-container">
        {/* Section header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
            <p className="section-kicker" style={{ marginBottom: 0 }}>
              Focus
            </p>
            <motion.span
              className="now-updated-badge font-mono text-[11px] tracking-[0.08em] uppercase px-3 py-1.5 rounded-full"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {updatedLabel}
            </motion.span>
          </div>
          <h2 className="section-title">Currently</h2>
          <p className="section-lead">
            A live snapshot of what I&apos;m working on right now: shipping
            features, learning new tools, side projects, and the current book
            on the nightstand.
          </p>
        </motion.div>

        {/* Top 2-col cards */}
        {topCards.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {topCards.map((card, i) => (
              <Card key={`${card.title}-${i}`} card={card} index={i} wrapped={false} />
            ))}
          </div>
        )}

        {/* Remaining cards */}
        {bottomCards.length > 0 && (
          <div className="grid gap-6 mt-6 md:grid-cols-12">
            {bottomCards.map((card, i) => (
              <Card
                key={`${card.title}-${i}`}
                card={card}
                index={i + 2}
                wrapped
                spanClassName={bottomSpanClass(bottomCards.length)}
              />
            ))}
          </div>
        )}

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
