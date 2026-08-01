'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { WritingPost } from '@/lib/types';

function fmtDate(iso?: string) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function WritingSection({ posts = [] }: { posts?: WritingPost[] }) {
  const articles = posts.slice(0, 4).map((p) => ({
    category: p.tags[0] ?? 'Writing',
    readTime: `${p.readingMinutes} min read`,
    date: fmtDate(p.publishedAt),
    title: p.title,
    excerpt: p.excerpt,
    tag: p.tags[1] ?? p.tags[0] ?? '',
    href: `/writing/${p.slug}`,
  }));

  return (
    <section className="py-24">
      <div className="nav-container">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-kicker">Writing</p>
          <h2 className="section-title">From the archive</h2>
          <p className="section-lead">
            Notes on building products, systems, and writing without ceremony.
          </p>
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
