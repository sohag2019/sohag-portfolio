'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from '@/app/admin/actions';
import {
  IconContact,
  IconCurrently,
  IconExternal,
  IconHero,
  IconMenu,
  IconMessages,
  IconOverview,
  IconProjects,
  IconSettings,
  IconSignOut,
  IconStack,
  IconStatus,
  IconWork,
  IconWriting,
} from './icons';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
  hint?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

function buildNav(unread: number): NavGroup[] {
  return [
    {
      title: 'Home',
      items: [{ href: '/admin', label: 'Overview', icon: <IconOverview />, hint: 'Command center' }],
    },
    {
      title: 'Homepage',
      items: [
        { href: '/admin/hero', label: 'Hero', icon: <IconHero />, hint: 'First impression' },
        { href: '/admin/currently', label: 'Currently', icon: <IconCurrently />, hint: "What you're up to" },
        { href: '/admin/stack', label: 'My Stack', icon: <IconStack />, hint: 'Tech & skills' },
        { href: '/admin/projects', label: 'Featured Projects', icon: <IconProjects />, hint: 'Case studies' },
        { href: '/admin/work', label: 'Experience', icon: <IconWork />, hint: 'Roles & timeline' },
        { href: '/admin/contact', label: 'Get In Touch', icon: <IconContact />, hint: 'Copy & socials' },
        { href: '/admin/status', label: 'Live status', icon: <IconStatus />, hint: 'Availability strip' },
      ],
    },
    {
      title: 'Content',
      items: [
        {
          href: '/admin/writing',
          label: 'From the archive',
          icon: <IconWriting />,
          hint: 'Writing & notes',
        },
      ],
    },
    {
      title: 'Inbox',
      items: [
        {
          href: '/admin/messages',
          label: 'Messages',
          icon: <IconMessages />,
          count: unread,
          hint: 'Read & reply',
        },
      ],
    },
    {
      title: 'System',
      items: [{ href: '/admin/settings', label: 'Settings', icon: <IconSettings />, hint: 'Password & setup' }],
    },
  ];
}

function Clock() {
  const [now, setNow] = useState('');
  useEffect(() => {
    const tick = () =>
      setNow(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="admin-clock" suppressHydrationWarning>
      {now || '––:––:––'}
    </span>
  );
}

export default function AdminChrome({
  unread,
  children,
}: {
  unread: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const nav = buildNav(unread);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  const activeLabel =
    nav.flatMap((g) => g.items).find((i) => isActive(i.href))?.label ?? 'Admin';

  return (
    <div className="admin-shell admin-body">
      {open ? (
        <div className="admin-scrim" onClick={() => setOpen(false)} aria-hidden />
      ) : null}

      <aside className={`admin-sidebar ${open ? 'is-open' : ''}`} aria-label="Admin navigation">
        <Link href="/admin" className="admin-brand">
          <span className="admin-brand-mark">S</span>
          <span className="admin-brand-text">
            <span className="admin-brand-name">Control</span>
            <span className="admin-brand-sub">Private · password locked</span>
          </span>
        </Link>

        <nav className="admin-nav">
          {nav.map((group) => (
            <div key={group.title} className="admin-nav-section">
              <div className="admin-nav-group">{group.title}</div>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-nav-link ${isActive(item.href) ? 'is-active' : ''}`}
                  title={item.hint}
                >
                  <span className="admin-nav-icon" aria-hidden>
                    {item.icon}
                  </span>
                  <span className="admin-nav-label">{item.label}</span>
                  {item.count ? (
                    <span className="admin-nav-count" aria-label={`${item.count} unread`}>
                      {item.count}
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <Link href="/" target="_blank" className="admin-nav-link">
            <span className="admin-nav-icon" aria-hidden>
              <IconExternal />
            </span>
            <span className="admin-nav-label">View live site</span>
          </Link>
          <form action={signOut}>
            <button type="submit" className="admin-nav-link admin-nav-button">
              <span className="admin-nav-icon" aria-hidden>
                <IconSignOut />
              </span>
              <span className="admin-nav-label">Sign out</span>
            </button>
          </form>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            type="button"
          >
            <IconMenu />
          </button>

          <div className="admin-topbar-meta">
            <span className="admin-crumb">{activeLabel}</span>
            <span className="admin-badge admin-badge-live">
              <span className="admin-pulse" aria-hidden />
              Secured
            </span>
          </div>

          <div className="admin-topbar-right">
            <Clock />
            {unread > 0 && (
              <Link href="/admin/messages" className="admin-inbox-chip">
                <IconMessages />
                <span>
                  {unread} new message{unread === 1 ? '' : 's'}
                </span>
              </Link>
            )}
            <Link href="/" target="_blank" className="admin-btn admin-btn-ghost admin-btn-sm">
              Live site
              <IconExternal />
            </Link>
          </div>
        </header>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
