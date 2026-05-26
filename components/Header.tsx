'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Overview' },
  { href: '/work', label: 'Showcase' },
  { href: '/lab', label: 'Sandbox' },
  { href: '/writing', label: 'Insights' },
  { href: '/life', label: 'Beyond' },
  { href: '/contact', label: 'Connect' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState({ hm: '', sec: '' });
  const pathname = usePathname();

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
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

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
          <nav className="nav-desktop flex gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
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

          {/* Right: Time, Search, CTA (desktop) */}
          <div className="nav-time-desktop flex items-center gap-4 shrink-0">
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
              href="/contact"
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
              href="/contact"
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
          {/* Nav Links */}
          <nav className="nav-mobile-links">
            {navLinks.map((link, i) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
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

          {/* Divider */}
          <div
            className="nav-mobile-divider"
            style={{
              height: 1,
              background: 'var(--hair)',
              margin: '12px 24px',
              transitionDelay: isMenuOpen ? `${navLinks.length * 60}ms` : '0ms',
            }}
          />

          {/* Time + Search row */}
          <div
            className="nav-mobile-extras"
            style={{
              transitionDelay: isMenuOpen
                ? `${navLinks.length * 60 + 40}ms`
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
                ? `${navLinks.length * 60 + 100}ms`
                : '0ms',
            }}
          >
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
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
