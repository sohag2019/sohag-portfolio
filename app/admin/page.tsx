import Link from 'next/link';
import { adminDbOrNull } from '@/lib/admin-auth';
import { PageHead, SetupNotice } from '@/components/admin/PageHead';
import {
  IconArrow,
  IconContact,
  IconCurrently,
  IconHero,
  IconMessages,
  IconProjects,
  IconStack,
  IconWork,
  IconWriting,
} from '@/components/admin/icons';
import type { AnalyticsRow } from '@/lib/types';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Snapshot {
  work: number;
  projects: number;
  writing: number;
  stack: number;
  unread: number;
  totalMessages: number;
  analytics: AnalyticsRow[];
  recent: any[];
}

async function snapshot(): Promise<Snapshot | null> {
  const sb = await adminDbOrNull();
  if (!sb) return null;

  const countOf = async (table: string, filter?: [string, string]) => {
    let q = sb.from(table).select('*', { count: 'exact', head: true });
    if (filter) q = q.eq(filter[0], filter[1]);
    const { count } = await q;
    return count ?? 0;
  };

  const [work, projects, writing, stack, unread, totalMessages, analyticsRes, recentRes] =
    await Promise.all([
      countOf('work'),
      countOf('projects'),
      countOf('writing'),
      countOf('stack_stats'),
      countOf('messages', ['status', 'unread']),
      countOf('messages'),
      sb.from('analytics').select('*').order('views', { ascending: false }),
      sb.from('messages').select('*').order('created_at', { ascending: false }).limit(5),
    ]);

  return {
    work,
    projects,
    writing,
    stack,
    unread,
    totalMessages,
    analytics: (analyticsRes.data ?? []) as AnalyticsRow[],
    recent: recentRes.data ?? [],
  };
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

const sections = [
  { href: '/admin/hero', icon: <IconHero />, title: 'Hero', sub: 'Headline, photo, stats', tone: 'a' },
  { href: '/admin/currently', icon: <IconCurrently />, title: 'Currently', sub: "What you're shipping now", tone: 'b' },
  { href: '/admin/stack', icon: <IconStack />, title: 'My Stack', sub: 'Tech and skill levels', tone: 'c' },
  { href: '/admin/projects', icon: <IconProjects />, title: 'Featured Projects', sub: 'Case studies', tone: 'a' },
  { href: '/admin/work', icon: <IconWork />, title: 'Experience', sub: 'Roles and timeline', tone: 'b' },
  { href: '/admin/writing', icon: <IconWriting />, title: 'From the archive', sub: 'Writing & notes', tone: 'c' },
  { href: '/admin/contact', icon: <IconContact />, title: 'Get In Touch', sub: 'Copy, email, socials', tone: 'a' },
  { href: '/admin/messages', icon: <IconMessages />, title: 'Messages', sub: 'Read and reply', tone: 'b' },
];

export default async function AdminOverview() {
  const data = await snapshot();

  const stats = [
    { label: 'Experience', value: data?.work ?? 0, href: '/admin/work' },
    { label: 'Projects', value: data?.projects ?? 0, href: '/admin/projects' },
    { label: 'Archive posts', value: data?.writing ?? 0, href: '/admin/writing' },
    { label: 'Unread inbox', value: data?.unread ?? 0, href: '/admin/messages', highlight: true },
  ];

  return (
    <div>
      <PageHead
        title="Command center"
        subtitle="Everything on your public site is editable here. Pick a section, change the words or images, hit save — no code, no deploy."
      />

      <SetupNotice />

      <div className="admin-hero-banner mb-8">
        <div>
          <p className="admin-hero-banner-kicker">Today</p>
          <h2 className="admin-hero-banner-title">
            {data?.unread
              ? `You have ${data.unread} unread message${data.unread === 1 ? '' : 's'}`
              : 'Your site is ready to edit'}
          </h2>
          <p className="admin-hero-banner-sub">
            {data
              ? `${data.totalMessages} total messages · ${data.stack} stack items · ${data.projects} projects`
              : 'Connect Supabase in Settings to start saving live content.'}
          </p>
        </div>
        <div className="admin-hero-banner-actions">
          <Link href="/admin/messages" className="admin-btn">
            Open inbox
          </Link>
          <Link href="/admin/hero" className="admin-btn admin-btn-ghost">
            Edit hero
          </Link>
        </div>
      </div>

      <div className="admin-stat-grid mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className={`admin-stat ${s.highlight && s.value > 0 ? 'admin-stat-hot' : ''}`}
          >
            <div className="admin-stat-value">{s.value}</div>
            <div className="admin-stat-label">{s.label}</div>
            <span className="admin-stat-go">
              Open <IconArrow />
            </span>
          </Link>
        ))}
      </div>

      <div className="admin-section-head">
        <h2 className="admin-card-title m-0">Jump to a section</h2>
        <span className="admin-badge">8 panels</span>
      </div>

      <div className="admin-quick-grid mb-8">
        {sections.map((l) => (
          <Link key={l.href} href={l.href} className={`admin-quick tone-${l.tone}`}>
            <span className="admin-quick-icon">{l.icon}</span>
            <span className="min-w-0">
              <span className="admin-quick-title block truncate">{l.title}</span>
              <span className="admin-quick-sub block truncate">{l.sub}</span>
            </span>
            <span className="admin-quick-arrow">
              <IconArrow />
            </span>
          </Link>
        ))}
      </div>

      <div className="admin-grid-2">
        <section className="admin-card">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Latest messages</h2>
            {data && data.unread > 0 && (
              <span className="admin-badge admin-badge-new">{data.unread} new</span>
            )}
            <Link href="/admin/messages" className="admin-card-link">
              View all
            </Link>
          </div>

          {data && data.recent.length > 0 ? (
            <div className="admin-list">
              {data.recent.map((m) => (
                <Link key={m.id} href={`/admin/messages/${m.id}`} className="admin-row">
                  <span className="admin-msg-avatar" style={{ width: 34, height: 34, fontSize: 12 }}>
                    {(m.name || '?').charAt(0).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="admin-row-title block truncate">{m.name || m.email}</span>
                    <span className="admin-msg-preview">{m.message}</span>
                  </span>
                  <span className="admin-row-meta">
                    <span className="admin-row-sub">{timeAgo(m.created_at)}</span>
                    {m.status === 'unread' && <span className="admin-badge admin-badge-new">New</span>}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="admin-empty admin-empty-compact">
              <p className="admin-empty-text m-0">
                No messages yet. Anything sent through Get In Touch lands here so you can reply.
              </p>
            </div>
          )}
        </section>

        <section className="admin-card">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Section views</h2>
            <span className="admin-badge">self-hosted</span>
          </div>

          {data && data.analytics.length > 0 ? (
            <div className="admin-analytics">
              {data.analytics.map((a) => {
                const max = Math.max(...data.analytics.map((x) => x.views), 1);
                return (
                  <div key={a.section} className="admin-analytics-row">
                    <span className="admin-analytics-label">{a.section}</span>
                    <div className="admin-analytics-track">
                      <div
                        className="admin-analytics-bar"
                        style={{ width: `${(a.views / max) * 100}%` }}
                      />
                    </div>
                    <span className="admin-analytics-value">{a.views}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="admin-empty admin-empty-compact">
              <p className="admin-empty-text m-0">
                Views are counted per section as visitors scroll your site.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
