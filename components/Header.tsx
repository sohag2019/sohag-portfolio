'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Order matches homepage section order (recruiter scan path).
const primaryLinks = [
  { href: '/', label: 'Overview' },
  { href: '/#experience', label: 'Work' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#stack', label: 'Stack' },
  { href: '/#connect', label: 'Contact' },
];

// Writing is a real separate page (not a homepage section), so it gets its
// own distinct styling and sits apart from the section anchors.
const writingLink = { href: '/writing', label: 'Writing' };

const sectionIds = ['experience', 'projects', 'stack', 'connect'];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState({ hm: '', sec: '' });
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const parts = now
        .toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
        .split(':');
      setTimeStr({ hm: `${parts[0]}:${parts[1]}`, sec: parts[2] });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Scroll spy: track which section is in view
  useEffect(() => {
    if (pathname !== '/') return;

    const visible = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        });

        if (visible.size === 0) {
          setActiveSection(null);
        } else {
          let best = '';
          let bestRatio = 0;
          visible.forEach((ratio, id) => {
            if (ratio > bestRatio) {
              best = id;
              bestRatio = ratio;
            }
          });
          setActiveSection(best);
        }
      },
      { rootMargin: '-80px 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  const isActive = (href: string) => {
    if (pathname !== '/') {
      if (href === '/') return false;
      if (href.startsWith('/#')) return false;
      return pathname.startsWith(href);
    }
    // On homepage: use scroll spy
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      return activeSection === id;
    }
    if (href === '/') return !activeSection;
    return false;
  };

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith('/#')) {
        e.preventDefault();
        const id = href.slice(2);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (pathname !== '/') {
          window.location.href = href;
        }
        setIsMenuOpen(false);
      }
    },
    [pathname]
  );

  return (
    <>
      {/* ── Top Bar ── */}
      <div
        className="sticky top-0 z-40 transition-colors duration-200"
        style={{
          background: 'var(--bg)',
          borderBottom: '1px solid transparent',
          transition: 'border-color .2s, background .2s',
        }}
      >
        <div
          className="nav-container flex items-center justify-between"
          style={{ height: 64 }}
        >
          {/* Left: Avatar + Name + Role */}
          <Link href="/" className="flex items-center gap-[10px] shrink-0">
            <div
              className="size-8 rounded-full overflow-hidden shrink-0"
              style={{ border: '1.5px solid var(--hair-2)' }}
            >
              <Image
                alt="Sohag Hossain"
                width={32}
                height={32}
                className="object-cover object-top"
                src="/images/my-images/sohag2.png"
              />
            </div>
            <span className="text-sm font-medium tracking-[-0.005em] whitespace-nowrap">
              Sohag Hossain
            </span>
            <span
              className="font-mono text-[11px] tracking-[0.08em] uppercase nav-role whitespace-nowrap"
              style={{ marginLeft: 6, color: 'var(--muted)' }}
            >
              SWE · FS
            </span>
          </Link>

          {/* Center: Desktop Nav */}
          <nav className="nav-desktop flex items-center gap-0">
            {/* Primary links */}
            {primaryLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`nav-link relative text-sm tracking-[-0.005em] whitespace-nowrap ${active ? 'nav-link-active' : ''}`}
                  style={{
                    padding: '8px 14px',
                    color: active ? 'var(--fg)' : 'var(--muted)',
                    fontWeight: active ? 500 : 400,
                  }}
                >
                  {link.label}
                  <span
                    className="nav-link-underline absolute"
                    style={{
                      left: 14,
                      right: 14,
                      bottom: 2,
                      height: 1,
                      background: 'var(--accent)',
                    }}
                  />
                </Link>
              );
            })}

          </nav>

          {/* Right: Writing, Time, Search, CTA (desktop) */}
          <div className="nav-time-desktop flex items-center gap-4 shrink-0">
            <Link
              href={writingLink.href}
              onClick={(e) => handleNavClick(e, writingLink.href)}
              className={`nav-writing-link ${isActive(writingLink.href) ? 'nav-writing-link-active' : ''}`}
            >
              <span className="nav-writing-icon">✎</span>
              {writingLink.label}
              <span className="nav-writing-arrow">↗</span>
            </Link>
            <span className="nav-sep-dot" style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--hair-2)', display: 'inline-block' }} />
            <span
              className="font-mono text-[11px] tracking-[0.08em] uppercase whitespace-nowrap flex items-center"
              style={{ color: 'var(--muted)' }}
            >
              Dhaka&nbsp;·&nbsp;{timeStr.hm}
              <span className="nav-sec-separator">:</span>
              <span key={timeStr.sec} className="nav-sec">
                {timeStr.sec}
              </span>
              &nbsp;BST
            </span>
            <button
              aria-label="Search (Cmd+K)"
              className="bg-transparent cursor-pointer flex items-center gap-[6px] shrink-0"
              style={{
                padding: '6px 10px',
                border: '1px solid var(--hair)',
                color: 'var(--muted)',
              }}
            >
              <span className="text-[13px]">⌕</span>
              <span
                className="font-mono text-[11px] tracking-[0.08em] uppercase"
                style={{ color: 'var(--muted)', opacity: 0.6 }}
              >
                ⌘K
              </span>
            </button>
            <Link
              href="/#connect"
              onClick={(e) => handleNavClick(e, '/#connect')}
              className="nav-cta-desktop text-[13px] font-medium whitespace-nowrap"
              style={{
                padding: '8px 14px',
                border: '1px solid var(--fg)',
                color: 'var(--fg)',
              }}
            >
              Get in touch →
            </Link>
          </div>

          {/* Right: CTA + Hamburger (mobile) */}
          <div className="nav-mobile-right flex items-center gap-3">
            <Link
              href="/#connect"
              onClick={(e) => handleNavClick(e, '/#connect')}
              className="text-[12px] font-medium whitespace-nowrap"
              style={{
                padding: '6px 12px',
                border: '1px solid var(--fg)',
                color: 'var(--fg)',
              }}
            >
              Get in touch →
            </Link>
            <button
              className="flex flex-col gap-[5px] cursor-pointer p-2 bg-transparent border-none"
              aria-label={isMenuOpen ? 'Close menu' : 'Menu'}
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span
                className="block transition-all duration-300 origin-center"
                style={{
                  width: 22,
                  height: 1.5,
                  background: 'var(--fg)',
                  transform: isMenuOpen
                    ? 'rotate(45deg) translateY(3.25px)'
                    : 'none',
                }}
              />
              <span
                className="block transition-all duration-300"
                style={{
                  width: 22,
                  height: 1.5,
                  background: 'var(--fg)',
                  opacity: isMenuOpen ? 0 : 1,
                }}
              />
              <span
                className="block transition-all duration-300 origin-center"
                style={{
                  width: 22,
                  height: 1.5,
                  background: 'var(--fg)',
                  transform: isMenuOpen
                    ? 'rotate(-45deg) translateY(-3.25px)'
                    : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`nav-mobile-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className="nav-mobile-sheet"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Primary Nav Links */}
          <nav className="nav-mobile-links">
            {primaryLinks.map((link, i) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { handleNavClick(e, link.href); setIsMenuOpen(false); }}
                  className="nav-mobile-item"
                  style={{
                    color: active ? 'var(--fg)' : 'var(--muted)',
                    fontWeight: active ? 500 : 400,
                    background: active ? 'var(--hair)' : 'transparent',
                    transitionDelay: isMenuOpen ? `${i * 60}ms` : '0ms',
                  }}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span
                      className="nav-mobile-dot"
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--fg)',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Writing — separate page, styled distinctly */}
          <div
            className="nav-mobile-writing-wrap px-6"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s, transform 0.4s',
              transitionDelay: isMenuOpen ? `${primaryLinks.length * 60 + 20}ms` : '0ms',
            }}
          >
            <Link
              href={writingLink.href}
              onClick={(e) => { handleNavClick(e, writingLink.href); setIsMenuOpen(false); }}
              className={`nav-writing-mobile ${isActive(writingLink.href) ? 'nav-writing-mobile-active' : ''}`}
            >
              <span className="nav-writing-icon-mobile">✎</span>
              <div className="flex flex-col">
                <span className="text-[14px] font-medium" style={{ color: 'var(--fg)' }}>Writing</span>
                <span className="text-[11px]" style={{ color: 'var(--muted)', opacity: 0.6 }}>Notes &amp; articles — separate page</span>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--muted)', opacity: 0.4 }}>↗</span>
            </Link>
          </div>

          {/* Divider */}
          <div
            className="nav-mobile-divider"
            style={{
              height: 1,
              background: 'var(--hair)',
              margin: '12px 24px',
              transitionDelay: isMenuOpen ? `${primaryLinks.length * 60 + 60}ms` : '0ms',
            }}
          />

          {/* Time + Search row */}
          <div
            className="nav-mobile-extras"
            style={{
              transitionDelay: isMenuOpen
                ? `${primaryLinks.length * 60 + 100}ms`
                : '0ms',
            }}
          >
            <span
              className="font-mono text-[11px] tracking-[0.08em] uppercase whitespace-nowrap flex items-center"
              style={{ color: 'var(--muted)' }}
            >
              Dhaka&nbsp;·&nbsp;{timeStr.hm}
              <span className="nav-sec-separator">:</span>
              <span key={timeStr.sec} className="nav-sec">
                {timeStr.sec}
              </span>
              &nbsp;BST
            </span>
            <button
              aria-label="Search (Cmd+K)"
              className="bg-transparent cursor-pointer flex items-center gap-[6px]"
              style={{
                padding: '6px 10px',
                border: '1px solid var(--hair)',
                color: 'var(--muted)',
              }}
            >
              <span className="text-[13px]">⌕</span>
              <span
                className="font-mono text-[11px] tracking-[0.08em] uppercase"
                style={{ color: 'var(--muted)', opacity: 0.6 }}
              >
                ⌘K
              </span>
            </button>
          </div>

          {/* Full-width CTA */}
          <div
            className="nav-mobile-cta-wrap"
            style={{
              transitionDelay: isMenuOpen
                ? `${primaryLinks.length * 60 + 160}ms`
                : '0ms',
            }}
          >
            <Link
              href="/#connect"
              onClick={(e) => { handleNavClick(e, '/#connect'); setIsMenuOpen(false); }}
              className="nav-mobile-cta"
              style={{
                border: '1px solid var(--fg)',
                color: 'var(--fg)',
              }}
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
