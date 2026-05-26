'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const experiments = [
  {
    status: 'Shipped',
    statusActive: true,
    category: 'Full Stack',
    title: 'Real-time Collaboration Editor',
    description:
      'WebSocket-powered collaborative text editor with OT conflict resolution, cursor presence, and live sync across tabs.',
  },
  {
    status: 'Active',
    statusActive: true,
    category: 'DevOps',
    title: 'Auto-scaling deployment pipeline',
    description:
      'GitHub Actions → Docker → Digital Ocean pipeline with zero-downtime deploys, health checks, and auto-rollback.',
  },
  {
    status: 'In progress',
    statusActive: false,
    category: 'AI / LLM',
    title: 'AI code review bot',
    description:
      'LLM-powered PR reviewer that catches bugs, suggests refactors, and enforces team coding standards automatically.',
  },
  {
    status: 'Exploring',
    statusActive: false,
    category: 'Open Source',
    title: 'Next.js starter kit',
    description:
      'Opinionated full stack starter with auth, DB, payments, and email baked in — ship faster on day one.',
  },
];

export default function LabSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="lab-bg-accent absolute -z-10" />

      <div className="nav-container">
        {/* Header */}
        <div className="flex justify-between items-end mb-16 flex-wrap gap-5">
          <div>
            <motion.div
              className="flex gap-[18px] items-baseline mb-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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
                03
              </motion.span>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--muted)', opacity: 0.5 }}>/ Lab</span>
                <span className="text-[22px] font-medium tracking-[-0.02em]" style={{ color: 'var(--fg)' }}>Experiments</span>
              </div>
            </motion.div>

            <motion.h2
              className="m-0 font-medium max-w-[560px]"
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.03em', lineHeight: 1.08 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Where I build things that don&apos;t have a brief yet.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/lab"
              className="text-[13px] whitespace-nowrap inline-block"
              style={{ color: 'var(--fg)', borderBottom: '1px solid var(--fg)', paddingBottom: 2 }}
            >
              View all experiments ↗
            </Link>
          </motion.div>
        </div>

        {/* Experiment list */}
        <div style={{ borderTop: '1px solid var(--hair)' }}>
          {experiments.map((exp, i) => (
            <motion.div
              key={exp.title}
              className="lab-row group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {/* Mobile layout */}
              <div className="flex flex-col gap-2 md:hidden py-[26px]" style={{ borderBottom: '1px solid var(--hair)' }}>
                <div className="flex items-center gap-3">
                  <span
                    className="size-[6px] rounded-full shrink-0"
                    style={{ background: exp.statusActive ? 'var(--fg)' : 'var(--hair-2)' }}
                  />
                  <span
                    className="font-mono text-[11px] tracking-[0.08em] uppercase"
                    style={{ color: exp.statusActive ? 'var(--fg)' : 'var(--muted)' }}
                  >
                    {exp.status}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--muted)', opacity: 0.5 }}>
                    {exp.category}
                  </span>
                </div>
                <div className="font-medium tracking-[-0.015em] mb-1" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)' }}>
                  {exp.title}
                </div>
                <div className="text-sm leading-[1.5]" style={{ color: 'var(--muted)' }}>
                  {exp.description}
                </div>
              </div>

              {/* Desktop layout */}
              <div
                className="hidden md:grid gap-x-7 items-start py-[26px] lab-row-inner"
                style={{
                  gridTemplateColumns: '110px 130px 1fr 20px',
                  borderBottom: '1px solid var(--hair)',
                }}
              >
                <div className="flex items-center gap-[6px] pt-0.5">
                  <span
                    className="size-[6px] rounded-full shrink-0 lab-dot"
                    style={{ background: exp.statusActive ? 'var(--fg)' : 'var(--hair-2)' }}
                  />
                  <span
                    className="font-mono text-[11px] tracking-[0.08em] uppercase"
                    style={{ color: exp.statusActive ? 'var(--fg)' : 'var(--muted)' }}
                  >
                    {exp.status}
                  </span>
                </div>
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase pt-0.5" style={{ color: 'var(--muted)' }}>
                  {exp.category}
                </span>
                <div>
                  <div className="font-medium tracking-[-0.015em] mb-1" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)' }}>
                    {exp.title}
                  </div>
                  <div className="text-sm leading-[1.5]" style={{ color: 'var(--muted)' }}>
                    {exp.description}
                  </div>
                </div>
                <div className="lab-arrow text-sm pt-0.5" style={{ color: 'var(--muted)', opacity: 0.4 }}>
                  →
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-8 text-[15px] max-w-[520px]"
          style={{ lineHeight: 1.6, color: 'var(--muted)' }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Some experiments become production features. Some stay as internal tools. Some just teach me something useful.
        </motion.p>
      </div>
    </section>
  );
}
