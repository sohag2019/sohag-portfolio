'use client';

import { useEffect } from 'react';

/**
 * Fires a single view increment per section when it first scrolls into view.
 * Powers the lightweight self-hosted analytics shown in the dashboard.
 */
export default function SectionTracker({ sections }: { sections: string[] }) {
  useEffect(() => {
    const seen = new Set<string>();
    const track = (section: string) => {
      if (seen.has(section)) return;
      seen.add(section);
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section }),
        keepalive: true,
      }).catch(() => {});
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).dataset.track;
            if (id) track(id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => {
      const el = document.querySelector(`[data-track="${s}"]`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return null;
}
