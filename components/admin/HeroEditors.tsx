'use client';

import { useState } from 'react';
import type { HeroHeadingLine, HeroStat } from '@/lib/types';

export function HeadingLinesEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue: HeroHeadingLine[];
}) {
  const [lines, setLines] = useState<HeroHeadingLine[]>(
    defaultValue.length ? defaultValue : [{ text: '', accent: false }]
  );

  const update = (next: HeroHeadingLine[]) => setLines(next);

  return (
    <div className="admin-field">
      <label className="admin-label">Big headline lines</label>
      <span className="admin-hint">
        Each row is one line of the giant headline. Toggle Accent to paint that line
        with the gradient.
      </span>

      <input type="hidden" name={name} value={JSON.stringify(lines)} />

      <div className="admin-list-editor">
        {lines.map((line, i) => (
          <div key={i} className="admin-list-row">
            <span className="admin-list-index">{String(i + 1).padStart(2, '0')}</span>
            <input
              className="admin-input"
              value={line.text}
              placeholder="I Build."
              onChange={(e) => {
                const next = [...lines];
                next[i] = { ...next[i], text: e.target.value };
                update(next);
              }}
            />
            <label className="admin-chip-toggle">
              <input
                type="checkbox"
                checked={line.accent}
                onChange={(e) => {
                  const next = [...lines];
                  next[i] = { ...next[i], accent: e.target.checked };
                  update(next);
                }}
              />
              Accent
            </label>
            <button
              type="button"
              className="admin-icon-btn"
              aria-label="Remove line"
              disabled={lines.length <= 1}
              onClick={() => update(lines.filter((_, idx) => idx !== i))}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="admin-btn admin-btn-ghost admin-btn-sm mt-3"
        onClick={() => update([...lines, { text: '', accent: false }])}
      >
        + Add line
      </button>
    </div>
  );
}

export function StatsEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue: HeroStat[];
}) {
  const [stats, setStats] = useState<HeroStat[]>(
    defaultValue.length ? defaultValue : [{ value: 0, suffix: '+', label: '' }]
  );

  return (
    <div className="admin-field">
      <label className="admin-label">Counters</label>
      <span className="admin-hint">
        The animated numbers next to your photo. Value counts up; suffix is appended
        (e.g. +).
      </span>

      <input type="hidden" name={name} value={JSON.stringify(stats)} />

      <div className="admin-list-editor">
        {stats.map((stat, i) => (
          <div key={i} className="admin-list-row admin-list-row-stats">
            <input
              className="admin-input"
              type="number"
              value={stat.value}
              placeholder="4"
              onChange={(e) => {
                const next = [...stats];
                next[i] = { ...next[i], value: Number(e.target.value) || 0 };
                setStats(next);
              }}
            />
            <input
              className="admin-input"
              value={stat.suffix}
              placeholder="+"
              onChange={(e) => {
                const next = [...stats];
                next[i] = { ...next[i], suffix: e.target.value };
                setStats(next);
              }}
            />
            <input
              className="admin-input"
              value={stat.label}
              placeholder="Years in Dev"
              onChange={(e) => {
                const next = [...stats];
                next[i] = { ...next[i], label: e.target.value };
                setStats(next);
              }}
            />
            <button
              type="button"
              className="admin-icon-btn"
              aria-label="Remove stat"
              disabled={stats.length <= 1}
              onClick={() => setStats(stats.filter((_, idx) => idx !== i))}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="admin-btn admin-btn-ghost admin-btn-sm mt-3"
        onClick={() => setStats([...stats, { value: 0, suffix: '+', label: '' }])}
      >
        + Add counter
      </button>
    </div>
  );
}
