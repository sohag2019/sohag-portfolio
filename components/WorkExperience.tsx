'use client';

import { motion } from 'framer-motion';

interface Experience {
  period: string;
  duration: string;
  title: string;
  company: string;
  location: string;
  workMode: string;
  color: string;
  impact: string;
  highlights: string[];
  skills: string[];
  isCurrent?: boolean;
}

const experiences: Experience[] = [
  {
    period: 'May 2024 — Present',
    duration: '1+ year',
    title: 'Team Lead / Full Stack Developer',
    company: 'Remote Talent Ltd.',
    location: 'Dhaka, Bangladesh',
    workMode: 'Onsite',
    color: '#3b82f6',
    isCurrent: true,
    impact: 'Leading a 4-person engineering team shipping enterprise-grade products for a Canadian tech company.',
    highlights: [
      'Architect scalable microservices & RESTful APIs with CI/CD on Digital Ocean',
      'Mentor juniors through pair programming, code reviews & career planning',
      'Drive agile ceremonies — sprint planning, retrospectives, velocity improvements',
      'Build full-stack solutions with React, Next.js, Node.js, Django & PostgreSQL',
      'Manage cloud infrastructure — performance optimization, HA, disaster recovery',
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Django', 'PostgreSQL', 'Docker', 'Digital Ocean'],
  },
  {
    period: 'Feb 2023 — May 2024',
    duration: '1 yr 3 mo',
    title: 'Software Developer',
    company: 'Iiinigence LLC / CygenSols',
    location: 'USA-based · International Team',
    workMode: 'Remote',
    color: '#a78bfa',
    impact: 'Building performant full-stack applications for an international team across multiple time zones.',
    highlights: [
      'Developed responsive web apps with React, Node.js & TypeScript',
      'Designed UI/UX flows — wireframes to high-fidelity prototypes in Figma',
      'Optimized performance: lazy loading, code splitting, efficient state management',
      'Implemented RESTful APIs & database schemas for scalable products',
    ],
    skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'REST APIs', 'Figma', 'MongoDB'],
  },
];

export default function WorkExperience() {
  return (
    <section className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-28 pb-24 relative z-10 overflow-hidden">
      <div className="absolute -z-10 pointer-events-none" style={{ width: 500, height: 500, top: '10%', right: '-8%', background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)' }} />

      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-14">
          <motion.h2
            className="text-3xl md:text-5xl font-black mb-4 tracking-tighter"
            style={{ color: 'var(--fg)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Experience
          </motion.h2>
          <motion.p
            className="text-base md:text-lg max-w-lg"
            style={{ color: 'var(--muted)', lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Where I&apos;ve worked and what I&apos;ve shipped.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative pl-8 md:pl-10">
          {/* Vertical line */}
          <motion.div
            className="absolute left-[11px] top-3 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, var(--hair-2), transparent)' }}
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="relative pb-16 last:pb-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-8 md:-left-10 top-3 flex flex-col items-center">
                <motion.div
                  className="relative"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 300 }}
                >
                  <div
                    className="w-[22px] h-[22px] rounded-full flex items-center justify-center"
                    style={{
                      background: 'var(--bg)',
                      border: `2.5px solid ${exp.color}`,
                      boxShadow: exp.isCurrent ? `0 0 16px ${exp.color}40` : 'none',
                    }}
                  >
                    {exp.isCurrent && (
                      <span className="w-2 h-2 rounded-full" style={{ background: exp.color }} />
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Period + badge */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-mono text-[12px] font-bold tracking-wide" style={{ color: 'var(--fg)' }}>
                  {exp.period}
                </span>
                <span className="font-mono text-[10px] px-2.5 py-1 rounded-full tracking-wider uppercase" style={{ background: `${exp.color}12`, border: `1px solid ${exp.color}20`, color: `${exp.color}cc` }}>
                  {exp.duration}
                </span>
                {exp.isCurrent && (
                  <span className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded-full tracking-wider uppercase" style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', color: '#4ade80' }}>
                    <span className="w-1.5 h-1.5 rounded-full exp-pulse" style={{ background: '#4ade80' }} />
                    Current
                  </span>
                )}
              </div>

              {/* Title & Company */}
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-1" style={{ color: 'var(--fg)' }}>
                {exp.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[15px] font-semibold" style={{ color: exp.color }}>{exp.company}</span>
                <span className="w-1 h-1 rounded-full" style={{ background: 'var(--hair-2)' }} />
                <span className="text-[13px]" style={{ color: 'var(--muted)' }}>{exp.location}</span>
                <span className="w-1 h-1 rounded-full" style={{ background: 'var(--hair-2)' }} />
                <span className="text-[12px]" style={{ color: 'var(--muted)', opacity: 0.6 }}>{exp.workMode}</span>
              </div>

              {/* Impact */}
              <motion.p
                className="text-[15px] leading-[1.75] mt-4 mb-5"
                style={{ color: 'var(--muted)', maxWidth: 640 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                {exp.impact}
              </motion.p>

              {/* Highlights */}
              <div className="flex flex-col gap-2.5 mb-5">
                {exp.highlights.map((h, idx) => (
                  <motion.div
                    key={idx}
                    className="flex gap-3 items-start"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.1 + idx * 0.05 }}
                  >
                    <span className="mt-[7px] w-[6px] h-[6px] rounded-full shrink-0" style={{ background: exp.color, opacity: 0.7 }} />
                    <span className="text-[14px] leading-[1.7]" style={{ color: 'var(--muted)' }}>{h}</span>
                  </motion.div>
                ))}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, idx) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1 rounded-md text-[11px] font-semibold tracking-tight"
                    style={{ background: `${exp.color}08`, border: `1px solid ${exp.color}15`, color: `${exp.color}bb` }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 + idx * 0.03 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
