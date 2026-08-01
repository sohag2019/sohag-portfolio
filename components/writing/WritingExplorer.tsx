'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { WritingPost } from '@/lib/types';
import WritingCard from './WritingCard';

type SortMode = 'latest' | 'trending';

export default function WritingExplorer({
  posts,
  tags,
}: {
  posts: WritingPost[];
  tags: string[];
}) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>('latest');

  const filtered = useMemo(() => {
    let list = posts;

    if (activeTag) {
      list = list.filter((p) => p.tags.includes(activeTag));
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sortMode === 'trending') {
      list = [...list].sort((a, b) => Number(b.trending) - Number(a.trending));
    }

    return list;
  }, [posts, query, activeTag, sortMode]);

  return (
    <div>
      {/* Controls */}
      <div className="writing-controls">
        <div className="writing-search">
          <span className="writing-search-icon">⌕</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, tags…"
            aria-label="Search writing"
          />
        </div>

        <div className="writing-sort">
          {(['latest', 'trending'] as SortMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              className={`writing-sort-btn ${sortMode === mode ? 'active' : ''}`}
              onClick={() => setSortMode(mode)}
            >
              {mode === 'latest' ? 'Latest' : '✦ Trending'}
            </button>
          ))}
        </div>
      </div>

      {tags.length > 0 && (
        <div className="writing-tags">
          <button
            type="button"
            className={`writing-tag-chip ${!activeTag ? 'active' : ''}`}
            onClick={() => setActiveTag(null)}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`writing-tag-chip ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {filtered.length > 0 ? (
        <motion.div layout className="wcard-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((post, i) => (
              <WritingCard key={post.slug} post={post} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="writing-empty">
          <p>No articles match &ldquo;{query}&rdquo;.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setActiveTag(null);
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
