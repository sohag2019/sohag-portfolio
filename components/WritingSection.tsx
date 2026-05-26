'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const articles = [
  {
    category: 'Architecture',
    readTime: '7 min read',
    date: 'Mar 2026',
    title: 'Building a Multi-Tenant SaaS with Next.js and PostgreSQL',
    excerpt:
      'How to structure your database, handle tenant isolation, and scale your Next.js app without rewriting everything later.',
    tag: 'Next.js',
    href: '/writing',
  },
  {
    category: 'DevOps',
    readTime: '5 min read',
    date: 'Jan 2026',
    title: 'Zero-Downtime Deployments with Docker and GitHub Actions',
    excerpt:
      'A practical guide to setting up blue-green deployments, health checks, and auto-rollback for your containerized apps.',
    tag: 'Docker',
    href: '/writing',
  },
];

export default function WritingSection() {
  return (
    <section className="py-24">
      <div className="nav-container">
        {/* Header */}
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
            04
          </motion.span>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--muted)', opacity: 0.5 }}>/ Writing</span>
            <span className="text-[22px] font-medium tracking-[-0.02em]" style={{ color: 'var(--fg)' }}>From the archive</span>
          </div>
        </motion.div>

        {/* Articles grid */}
        <div className="writing-grid grid grid-cols-1 md:grid-cols-2 gap-10">
          {articles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link href={article.href} className="writing-card block pt-7" style={{ borderTop: '1px solid var(--fg)' }}>
                <div className="flex justify-between mb-5">
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--muted)' }}>
                    {article.category} · {article.readTime}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--muted)' }}>
                    {article.date}
                  </span>
                </div>

                <h3
                  className="writing-title font-normal leading-[1.1] tracking-[-0.01em]"
                  style={{ margin: '0 0 16px', fontSize: 'clamp(22px, 2.5vw, 36px)', color: 'var(--fg)' }}
                >
                  {article.title}
                </h3>

                <p className="m-0 text-[15px] leading-[1.65]" style={{ color: 'var(--muted)' }}>
                  {article.excerpt}
                </p>

                <div className="mt-[18px] flex items-center gap-3">
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--fg)' }}>
                    {article.tag}
                  </span>
                  <span
                    className="writing-read-link text-[13px]"
                    style={{ color: 'var(--fg)', borderBottom: '1px solid var(--hair-2)' }}
                  >
                    Read the piece →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="mt-12 flex justify-between items-center pt-5 flex-wrap gap-4"
          style={{ borderTop: '1px solid var(--hair-2)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--muted)' }}>
            Articles on Architecture, DevOps, React, Node.js
          </span>
          <Link
            href="/writing"
            className="text-[13px] inline-block"
            style={{ color: 'var(--fg)', borderBottom: '1px solid var(--fg)', paddingBottom: 2 }}
          >
            All writing ↗
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
