'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/headings';

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: [0, 1] }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="toc" aria-label="Table of contents">
      <span className="toc-label">On this page</span>
      <ul>
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'toc-sub' : ''}>
            <a
              href={`#${h.id}`}
              className={activeId === h.id ? 'toc-active' : ''}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
