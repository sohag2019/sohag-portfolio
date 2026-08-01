'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import type { StackStat, StackLevel } from '@/lib/types';
import { seedStack } from '@/lib/seed';
import { EASE_EXPO, VIEWPORT } from '@/lib/motion';

const categoryOrder = ['Frontend', 'Backend', 'DSL-CMS', 'Tooling'];
const categoryColor: Record<string, string> = {
  Frontend: '#3b82f6',
  Backend: '#4ade80',
  'DSL-CMS': '#a78bfa',
  Tooling: '#f472b6',
};
const levelMeta: Record<StackLevel, { label: string; color: string }> = {
  learning: { label: 'Learning', color: '#fbbf24' },
  comfortable: { label: 'Comfortable', color: '#60a5fa' },
  expert: { label: 'Expert', color: '#4ade80' },
};

function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (!data.length) return null;
  const max = Math.max(...data, 1);
  const w = 72;
  const h = 20;
  const step = w / (data.length - 1 || 1);
  const pts = data.map((v, i) => `${i * step},${h - (v / max) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="overflow-visible">
      <motion.polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.9 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE_EXPO }}
      />
    </svg>
  );
}

function StackTile({ stat, delay }: { stat: StackStat; delay: number }) {
  const reduced = useReducedMotion() ?? false;
  const [hover, setHover] = useState(false);
  const color = categoryColor[stat.category] ?? '#3b82f6';
  const level = levelMeta[stat.level] ?? levelMeta.comfortable;

  return (
    <motion.div
      className="relative p-4 rounded-2xl"
      style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.4, delay, ease: EASE_EXPO }}
      whileHover={reduced ? undefined : { y: -4 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
    >
      <div className="flex items-center gap-3 mb-3">
        {stat.icon && (
          <div className="w-7 h-7 shrink-0 flex items-center justify-center">
            <Image
              src={stat.icon}
              alt={stat.name}
              width={28}
              height={28}
              className={`w-full h-full object-contain${stat.invert ? ' invert' : ''}`}
              unoptimized
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold truncate" style={{ color: 'var(--fg)' }}>
            {stat.name}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: level.color }}>
            {level.label}
          </div>
        </div>
        <Sparkline data={stat.sparkline} color={color} />
      </div>

      {/* Usage bar (derived from commit/byte frequency) */}
      <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'var(--hair)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${stat.percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: delay + 0.1, ease: 'easeOut' }}
        />
      </div>

      {/* Projects that used it — revealed on hover */}
      <motion.div
        initial={false}
        animate={{ height: hover && stat.projects.length ? 'auto' : 0, opacity: hover && stat.projects.length ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ overflow: 'hidden' }}
      >
        <div className="flex flex-wrap gap-1.5 pt-3">
          {stat.projects.map((p) => (
            <span
              key={p}
              className="font-mono text-[9px] uppercase tracking-wide px-2 py-0.5 rounded"
              style={{ background: `${color}12`, color: `${color}cc` }}
            >
              {p}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TechStack({ stats }: { stats?: StackStat[] }) {
  const data = stats && stats.length ? stats : seedStack;
  const categories = categoryOrder.filter((c) => data.some((s) => s.category === c));

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
      <motion.div
        className="w-full max-w-6xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.p
            className="section-kicker"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE_EXPO }}
          >
            Tools & languages
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
          >
            My Stack
          </motion.h2>
          <motion.p
            className="section-lead mx-auto"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE_EXPO }}
          >
            Derived, not asserted — ranked by actual usage frequency from GitHub
            commit language stats. Hover to see where each is used.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {categories.map((cat, catIdx) => {
            const items = data
              .filter((s) => s.category === cat)
              .sort((a, b) => b.count - a.count);
            return (
              <motion.div
                key={cat}
                className="p-4 rounded-3xl flex flex-col"
                style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <h3
                    className="text-sm font-black uppercase tracking-widest pl-3"
                    style={{ color: categoryColor[cat], borderLeft: `2px solid ${categoryColor[cat]}` }}
                  >
                    {cat}
                  </h3>
                  <span className="font-mono text-[10px]" style={{ color: 'var(--muted)', opacity: 0.4 }}>
                    {items.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {items.map((s, i) => (
                    <StackTile key={s.name} stat={s} delay={catIdx * 0.05 + i * 0.04} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
