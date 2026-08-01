'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sohagzayan/' },
  { label: 'GitHub', href: 'https://github.com/sohagzayan' },
  { label: 'Twitter', href: 'https://twitter.com/sohagmia360' },
];

const workLinks = [
  { label: 'EduPeak LMS', href: '/projects/edupeak' },
  { label: 'Course Platform', href: '/projects/edupeak' },
  { label: 'Admin Dashboard', href: '/projects/edupeak' },
];

const navLinks = [
  { label: 'Overview', href: '/' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/#connect' },
];

export default function Footer() {
  return (
    <footer
      className="footer-section relative overflow-hidden"
      style={{ borderTop: '1px solid var(--hair)', padding: '96px 0 48px' }}
      role="contentinfo"
    >
      <div className="footer-glow-1 absolute -z-10" />
      <div className="footer-glow-2 absolute -z-10" />

      <div className="nav-container">
        {/* CTA area */}
        <div className="footer-cta grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-end mb-20">
          {/* Big heading */}
          <motion.h2
            className="m-0 font-medium"
            style={{
              fontSize: 'clamp(40px, 6vw, 84px)',
              letterSpacing: '-0.035em',
              lineHeight: 0.98,
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Got an{' '}
            <span className="footer-gradient-text">interesting problem?</span>
            <br />
            Let&apos;s talk about it.
          </motion.h2>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p
              className="m-0 max-w-[360px]"
              style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--muted)' }}
            >
              Always open to conversations about engineering, architecture, and
              technology — especially the kind that don&apos;t have an obvious
              answer yet. I read every message.
            </p>

            <motion.a
              href="mailto:sohagdev2019@gmail.com"
              className="footer-email inline-block mt-6"
              style={{
                fontSize: 'clamp(15px, 1.5vw, 18px)',
                borderBottom: '1px solid var(--fg)',
                paddingBottom: 4,
                color: 'var(--fg)',
              }}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              sohagdev2019@gmail.com →
            </motion.a>

            <div className="mt-5 flex gap-4 flex-wrap">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link text-sm"
                  style={{
                    color: 'var(--muted)',
                    borderBottom: '1px solid var(--hair-2)',
                    paddingBottom: 2,
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  whileHover={{ y: -2, color: 'var(--fg)' }}
                >
                  {link.label} ↗
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom links grid */}
        <motion.div
          className="footer-links grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 pt-8"
          style={{ borderTop: '1px solid var(--hair)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Brand */}
          <div>
            <span
              className="font-mono text-[11px] tracking-[0.08em] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              © 2026 Sohag Hossain
            </span>
            <div className="mt-[6px] text-[13px]" style={{ color: 'var(--muted)' }}>
              Built in Dhaka. Full stack, end to end.
            </div>
          </div>

          {/* Work */}
          <div>
            <span
              className="font-mono text-[11px] tracking-[0.08em] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              Work
            </span>
            <div className="mt-[10px] flex flex-col gap-[7px]">
              {workLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="footer-nav-link text-sm"
                  style={{ color: 'var(--fg)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <span
              className="font-mono text-[11px] tracking-[0.08em] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              Navigate
            </span>
            <div className="mt-[10px] flex flex-col gap-[7px]">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="footer-nav-link text-sm"
                  style={{ color: 'var(--fg)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* More */}
          <div>
            <span
              className="font-mono text-[11px] tracking-[0.08em] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              More
            </span>
            <div className="mt-[10px] flex flex-col gap-[7px]">
              <a
                href="https://drive.google.com/file/d/1wHVsrVJdO8dgw7B0FV_uQqnahajS_62b/view"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-nav-link text-sm"
                style={{ color: 'var(--fg)' }}
              >
                Resume ↗
              </a>
              <Link href="/writing" className="footer-nav-link text-sm" style={{ color: 'var(--fg)' }}>
                Blog
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid var(--hair)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span
            className="font-mono text-[10px] tracking-[0.08em] uppercase"
            style={{ color: 'var(--muted)', opacity: 0.4 }}
          >
            Designed & built with Next.js, Tailwind CSS, and Framer Motion
          </span>
          <motion.button
            className="footer-back-top font-mono text-[11px] tracking-[0.08em] uppercase cursor-pointer bg-transparent border-none"
            style={{ color: 'var(--muted)' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            ↑ Back to top
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
