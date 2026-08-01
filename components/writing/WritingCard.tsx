'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { WritingPost } from '@/lib/types';

function fmtDate(iso?: string) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return '';
  }
}

export default function WritingCard({ post, index }: { post: WritingPost; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.06 }}
    >
      <Link href={`/writing/${post.slug}`} className="wcard block">
        <div className="wcard-media">
          {post.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.coverImage} alt="" loading="lazy" />
          ) : (
            <div className="wcard-media-fallback" />
          )}
          {post.trending && <span className="wcard-trending">✦ Trending</span>}
        </div>
        <div className="wcard-body">
          <div className="wcard-meta">
            <span>{post.tags[0] ?? 'Writing'}</span>
            <span className="wcard-dot" />
            <span>{post.readingMinutes} min read</span>
          </div>
          <h3 className="wcard-title">{post.title}</h3>
          <p className="wcard-excerpt">{post.excerpt}</p>
          <div className="wcard-footer">
            <span className="wcard-date">{fmtDate(post.publishedAt)}</span>
            <span className="wcard-arrow">Read →</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
