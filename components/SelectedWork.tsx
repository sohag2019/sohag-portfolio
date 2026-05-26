'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';

interface TimelineEntry {
  company: string;
  type: string;
  period: string;
  role: string;
  description: string;
  projects?: { name: string; desc: string; status?: string; tags?: string[] }[];
  isCurrent?: boolean;
}

const timeline: TimelineEntry[] = [
  {
    company: 'Freelance & Contract',
    type: 'Self-employed',
    period: '2024 — Present',
    role: 'Full Stack Developer · Remote',
    description:
      'Building end-to-end web applications for clients — from MVP to production. React, Next.js, Node.js, PostgreSQL, and cloud deployment. Focused on SaaS and ed-tech verticals.',
    isCurrent: true,
    projects: [
      {
        name: 'EduPeak LMS',
        desc: 'Full-featured learning management system with 200+ features. Course creation, analytics, Stripe payments, multi-tenant workspaces.',
        status: 'Live',
        tags: ['Next.js', 'PostgreSQL', 'Prisma', 'Stripe'],
      },
      {
        name: 'Portfolio v2',
        desc: 'This site — rebuilt with Next.js, Framer Motion, and editorial design principles.',
        status: 'Active',
        tags: ['Next.js', 'Framer Motion', 'Tailwind'],
      },
    ],
  },
  {
    company: 'Previous Roles',
    type: 'Employment',
    period: '2021 — 2024',
    role: 'Full Stack Developer',
    description:
      'Worked across startups and agencies building scalable web applications. Contributed to products serving thousands of daily users across e-commerce, fintech, and content platforms.',
    projects: [
      {
        name: 'E-commerce Platform',
        desc: 'Built a full-stack e-commerce system with real-time inventory, payment processing, and admin dashboard.',
        tags: ['React', 'Node.js', 'MongoDB'],
      },
      {
        name: 'Content Management System',
        desc: 'Custom CMS for a media company with role-based access, rich text editing, and automated publishing workflows.',
        tags: ['Next.js', 'PostgreSQL', 'AWS'],
      },
    ],
  },
  {
    company: 'Early Career',
    type: 'Freelance & Learning',
    period: '2020 — 2021',
    role: 'Frontend Developer',
    description:
      'Started with frontend development — building responsive websites, learning React, and establishing core engineering skills through client projects and open-source contributions.',
  },
];

const testimonials = [
  {
    quote:
      'Sohag is an exceptional developer — detail-oriented, reliable, and always delivers high-quality work. His full stack expertise made our project significantly better.',
    name: 'Client Recommendation',
    role: 'SaaS Product Owner',
    source: 'Project feedback',
    date: '2024',
  },
  {
    quote:
      'Working with Sohag was a great experience. He understood our requirements quickly and built exactly what we needed — clean code, great communication, and on-time delivery.',
    name: 'Startup Founder',
    role: 'Ed-tech Platform',
    source: 'Direct collaboration',
    date: '2024',
  },
];

export default function SelectedWork() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="selected-work-bg absolute -z-10" />

      <div className="nav-container">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 mb-16">
          <div>
            <motion.p
              className="m-0 mt-6 max-w-[640px]"
              style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.65, color: 'var(--muted)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Most of my work sits at the same intersection — reducing the distance
              between an idea and a working product. The interesting part is the
              architecture, the scale, and whether the system still holds when it matters.
            </motion.p>

            {/* Highlights */}
            <motion.div
              className="mt-8 flex flex-col gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {[
                'Built a full LMS with 200+ features — course management, payments, analytics, multi-tenancy.',
                'Shipped 50+ web applications across e-commerce, ed-tech, and SaaS verticals.',
                'End-to-end ownership: React frontends → Node.js APIs → PostgreSQL → cloud deployment.',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex gap-3 items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                >
                  <span className="shrink-0 mt-0.5" style={{ color: 'var(--fg)' }}>→</span>
                  <span className="text-[15px] leading-[1.6]" style={{ color: 'var(--muted)' }}>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="tl-wrap relative pl-8 md:pl-10 pt-8" style={{ borderTop: '1px solid var(--hair)' }}>
          {/* Vertical line */}
          <div className="tl-line absolute" style={{ left: 16, top: 0, bottom: 64, width: 1, background: 'var(--hair)' }} />

          {timeline.map((entry, i) => (
            <motion.div
              key={entry.company}
              className="relative pb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Dot */}
              <div
                className="tl-dot absolute rounded-full"
                style={{
                  left: -24,
                  top: 12,
                  width: 10,
                  height: 10,
                  background: entry.isCurrent ? 'var(--fg)' : 'var(--hair-2)',
                  border: entry.isCurrent ? '2px solid var(--fg)' : 'none',
                  boxShadow: entry.isCurrent ? '0 0 12px rgba(255,255,255,0.2)' : 'none',
                }}
              />

              {/* Card */}
              <div
                className="tl-card mb-4"
                style={{
                  padding: '24px 28px',
                  border: `1px ${entry.isCurrent ? 'solid' : 'solid'} var(--hair)`,
                  borderRadius: 12,
                }}
              >
                <div className="flex justify-between items-start gap-4 flex-wrap mb-[10px]">
                  <div className="flex gap-3 items-center flex-wrap">
                    <h3 className="m-0 font-medium tracking-[-0.02em]" style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}>
                      {entry.company}
                    </h3>
                    <span className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--muted)', opacity: 0.5 }}>
                      {entry.type}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase shrink-0" style={{ color: 'var(--muted)', opacity: 0.5 }}>
                    {entry.period}
                  </span>
                </div>
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase block mb-3" style={{ color: 'var(--fg)' }}>
                  {entry.role}
                </span>
                <p className="m-0 text-sm max-w-[720px]" style={{ lineHeight: 1.7, color: 'var(--muted)' }}>
                  {entry.description}
                </p>
              </div>

              {/* Project sub-cards */}
              {entry.projects && (
                <div className="pl-4 md:pl-5">
                  <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                    {entry.projects.map((proj) => (
                      <motion.div
                        key={proj.name}
                        className="tl-project-card"
                        style={{ padding: '20px 24px', border: '1px solid var(--hair)', borderRadius: 10 }}
                        whileHover={{ y: -3, borderColor: 'rgba(255,255,255,0.15)' }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="flex gap-[10px] items-start mb-2 flex-wrap">
                          <span className="text-sm font-medium tracking-[-0.01em] flex-1 min-w-[120px]" style={{ color: 'var(--fg)' }}>
                            {proj.name}
                          </span>
                          {proj.status && (
                            <span className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: proj.status === 'Live' ? '#4ade80' : 'var(--fg)' }}>
                              {proj.status === 'Live' ? '[•] ' : ''}{proj.status}
                            </span>
                          )}
                        </div>
                        <p className="m-0 text-[13px] leading-[1.6]" style={{ color: 'var(--muted)' }}>
                          {proj.desc}
                        </p>
                        {proj.tags && (
                          <div className="mt-3 flex gap-[6px] flex-wrap">
                            {proj.tags.map((tag) => (
                              <span
                                key={tag}
                                className="font-mono uppercase"
                                style={{ fontSize: 10, letterSpacing: '0.06em', padding: '3px 8px', border: '1px solid var(--hair)', color: 'var(--muted)', borderRadius: 4 }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── Testimonials ── */}
        <motion.div
          className="mt-8 pt-16"
          style={{ borderTop: '1px solid var(--hair)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex gap-[18px] items-baseline mb-10">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--muted)', opacity: 0.5 }}>01</span>
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase font-medium" style={{ color: 'var(--fg)' }}>Recommendations</span>
          </div>

          <div className="max-w-[860px]">
            <div className="tl-testimonial-card relative overflow-hidden" style={{ border: '1px solid var(--hair)', borderRadius: 12 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  className="p-8 md:p-12"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="leading-none mb-4 select-none" style={{ fontSize: 80, color: 'var(--fg)', opacity: 0.15 }}>&ldquo;</div>
                  <p
                    className="italic max-w-[720px]"
                    style={{ margin: '0 0 32px', fontSize: 'clamp(16px, 1.8vw, 20px)', lineHeight: 1.65, color: 'var(--fg)' }}
                  >
                    {testimonials[activeTestimonial].quote}
                  </p>
                  <div>
                    <div className="text-sm font-medium tracking-[-0.01em] mb-1" style={{ color: 'var(--fg)' }}>
                      {testimonials[activeTestimonial].name}
                    </div>
                    <span className="font-mono text-[11px] tracking-[0.08em] uppercase block mb-1" style={{ color: 'var(--muted)' }}>
                      {testimonials[activeTestimonial].role}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--muted)', opacity: 0.5 }}>
                      {testimonials[activeTestimonial].date}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar */}
              <div className="h-px" style={{ background: 'var(--hair)' }}>
                <motion.div
                  className="h-px"
                  style={{ background: 'var(--fg)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${((activeTestimonial + 1) / testimonials.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className="tl-dot-btn rounded-full cursor-pointer border-none"
                    style={{
                      width: idx === activeTestimonial ? 20 : 6,
                      height: 6,
                      background: 'var(--fg)',
                      opacity: idx === activeTestimonial ? 1 : 0.25,
                      transition: 'all 0.3s',
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="tl-nav-btn cursor-pointer font-mono"
                  style={{ padding: '8px 16px', fontSize: 13, border: '1px solid var(--hair)', background: 'transparent', color: 'var(--fg)' }}
                >
                  ←
                </button>
                <button
                  onClick={nextTestimonial}
                  className="tl-nav-btn cursor-pointer font-mono"
                  style={{ padding: '8px 16px', fontSize: 13, border: '1px solid var(--hair)', background: 'transparent', color: 'var(--fg)' }}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
