'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ProjectFeature {
  title: string;
  desc: string;
  icon: string;
  image: string;
}

interface Comment {
  id: string;
  name: string;
  text: string;
  date: string;
  avatar: string;
}

interface Project {
  title: string;
  description: string;
  longDesc: string;
  tags: string[];
  category: string;
  github?: string;
  live?: string;
  color: string;
  cover: string;
  features: ProjectFeature[];
  stats: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    title: 'EduPeak LMS',
    description: 'Full-featured LMS with 200+ features — course creation, analytics, payments, multi-tenant workspaces.',
    longDesc: 'A comprehensive Learning Management System designed to deliver an exceptional educational experience. From course creation to analytics, payments to gamification, EduPeak provides everything needed for modern online learning.',
    tags: ['NextJS', 'React', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe'],
    category: 'Web',
    live: 'https://edupeak.vercel.app',
    color: '#3b82f6',
    cover: '/images/hero_section.png',
    stats: [
      { label: 'Features', value: '200+' },
      { label: 'User Roles', value: '4' },
      { label: 'Integrations', value: '10+' },
    ],
    features: [
      { title: 'Course Management', desc: 'Create, organize, and publish courses with rich content — videos, quizzes, assignments, and downloadable resources.', icon: '📚', image: '/images/course-layout-progress-tracking.png' },
      { title: 'Progress Tracking', desc: 'Real-time dashboards showing completion rates, quiz scores, time spent, and personalized learning paths.', icon: '📊', image: '/images/admin-analytics-dashbord.png' },
      { title: 'Stripe Payments', desc: 'Full payment integration with subscriptions, one-time purchases, coupons, and automated invoicing.', icon: '💳', image: '/images/hero_section.png' },
      { title: 'Multi-Tenant', desc: 'Isolated workspaces for different organizations with custom branding, domains, and user management.', icon: '🏢', image: '/images/course-layout-progress-tracking.png' },
      { title: 'Live Support', desc: 'Built-in video calls and chat for real-time student support and live class sessions.', icon: '🎥', image: '/images/admin-analytics-dashbord.png' },
      { title: 'Gamification', desc: 'Badges, certificates, leaderboards, and achievement systems to boost student engagement.', icon: '🏆', image: '/images/hero_section.png' },
    ],
  },
  {
    title: 'Dev Portfolio v2',
    description: 'This site — built with Next.js, Framer Motion, and editorial design principles.',
    longDesc: 'A personal portfolio rebuilt from scratch with a focus on editorial design, rich animations, and storytelling. Every section is crafted to communicate skills and experience through interactive visual narratives.',
    tags: ['NextJS', 'React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    category: 'Web',
    github: 'https://github.com/sohagdev',
    color: '#a78bfa',
    cover: '/images/hero_section.png',
    stats: [
      { label: 'Sections', value: '8+' },
      { label: 'Animations', value: '50+' },
      { label: 'Lighthouse', value: '95+' },
    ],
    features: [
      { title: 'Scroll Animations', desc: 'Every section features unique scroll-triggered animations using Framer Motion with spring physics.', icon: '✨', image: '/images/hero_section.png' },
      { title: '3D Interactions', desc: 'Mouse-following tilt effects, parallax layers, and depth-aware hover states throughout.', icon: '🎭', image: '/images/hero_section.png' },
      { title: 'Responsive Design', desc: 'Pixel-perfect layouts across all devices with adaptive navigation and touch interactions.', icon: '📱', image: '/images/hero_section.png' },
      { title: 'Dark Theme', desc: 'Carefully crafted dark color palette with CSS variables for consistent theming.', icon: '🌙', image: '/images/hero_section.png' },
    ],
  },
  {
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce with real-time inventory, cart, payments, and admin dashboard.',
    longDesc: 'A production-grade e-commerce platform with real-time inventory management, smart cart system, Stripe payment processing, and a comprehensive admin dashboard for managing products, orders, and customers.',
    tags: ['NextJS', 'Node.js', 'MongoDB', 'Stripe', 'TailwindCSS'],
    category: 'Web',
    color: '#4ade80',
    cover: '/images/hero_section.png',
    stats: [
      { label: 'Products', value: '1K+' },
      { label: 'API Routes', value: '40+' },
      { label: 'Uptime', value: '99.9%' },
    ],
    features: [
      { title: 'Smart Cart', desc: 'Persistent cart with real-time stock validation, quantity limits, and automatic price calculations.', icon: '🛒', image: '/images/hero_section.png' },
      { title: 'Payment Flow', desc: 'Secure Stripe checkout with saved cards, order confirmation, and automated receipt emails.', icon: '💰', image: '/images/hero_section.png' },
      { title: 'Admin Dashboard', desc: 'Full admin panel for product management, order tracking, customer insights, and revenue analytics.', icon: '📈', image: '/images/hero_section.png' },
      { title: 'Inventory System', desc: 'Real-time stock tracking with low-stock alerts, auto-reorder triggers, and variant management.', icon: '📦', image: '/images/hero_section.png' },
    ],
  },
  {
    title: 'REST API Toolkit',
    description: 'Production-ready API boilerplate with auth, rate limiting, validation, and auto-docs.',
    longDesc: 'A battle-tested REST API starter kit designed for rapid backend development. Includes authentication, authorization, input validation, rate limiting, error handling, and auto-generated Swagger documentation.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'Swagger'],
    category: 'CLI',
    github: 'https://github.com/sohagdev',
    color: '#f472b6',
    cover: '/images/hero_section.png',
    stats: [
      { label: 'Endpoints', value: '30+' },
      { label: 'Test Coverage', value: '90%' },
      { label: 'Docker Ready', value: '✓' },
    ],
    features: [
      { title: 'Auth System', desc: 'JWT + refresh tokens, OAuth2, role-based access control, and session management out of the box.', icon: '🔐', image: '/images/hero_section.png' },
      { title: 'Validation', desc: 'Zod-powered request validation with auto-generated error messages and type inference.', icon: '✅', image: '/images/hero_section.png' },
      { title: 'Rate Limiting', desc: 'Configurable per-route rate limiting with Redis backing and sliding window algorithm.', icon: '🛡️', image: '/images/hero_section.png' },
      { title: 'Auto Docs', desc: 'Swagger/OpenAPI documentation auto-generated from route definitions and Zod schemas.', icon: '📄', image: '/images/hero_section.png' },
    ],
  },
];

const filters = ['All', 'Web', 'CLI'];

// ── Custom Scrollbar ──
function CustomScrollbar({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const thumbY = useMotionValue(0);
  const [thumbHeight, setThumbHeight] = useState(40);
  const [trackHeight, setTrackHeight] = useState(0);
  const [visible, setVisible] = useState(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const ratio = clientHeight / scrollHeight;
      const tH = Math.max(ratio * clientHeight, 30);
      setThumbHeight(tH);
      setTrackHeight(clientHeight);
      const maxScroll = scrollHeight - clientHeight;
      const maxThumb = clientHeight - tH;
      thumbY.set(maxScroll > 0 ? (scrollTop / maxScroll) * maxThumb : 0);

      setVisible(true);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      hideTimeout.current = setTimeout(() => setVisible(false), 1200);
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [containerRef, thumbY]);

  if (trackHeight === 0) return null;

  return (
    <div
      className="absolute right-1 top-0 w-[6px] z-20 pointer-events-none transition-opacity duration-500"
      style={{ height: trackHeight, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="w-full rounded-full"
        style={{
          height: thumbHeight,
          y: thumbY,
          background: 'rgba(255,255,255,0.2)',
        }}
      />
    </div>
  );
}

// ── Star Rating ──
function StarRating({ projectTitle }: { projectTitle: string }) {
  const storageKey = `proj-rating-${projectTitle.replace(/\s/g, '-').toLowerCase()}`;
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) { setRating(parseInt(stored)); setSaved(true); }
  }, [storageKey]);

  const handleRate = (star: number) => {
    setRating(star);
    setSaved(true);
    localStorage.setItem(storageKey, String(star));
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            className="cursor-pointer bg-transparent border-none p-0 text-lg"
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            whileTap={{ scale: 1.3 }}
            animate={{ scale: (hover || rating) >= star ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <span style={{ color: (hover || rating) >= star ? '#fbbf24' : 'var(--hair-2)', transition: 'color 0.2s' }}>
              ★
            </span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {saved && (
          <motion.span
            className="text-[11px] font-mono uppercase tracking-wide"
            style={{ color: '#fbbf24' }}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            {rating}/5
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Comments Section ──
function CommentsSection({ projectTitle }: { projectTitle: string }) {
  const storageKey = `proj-comments-${projectTitle.replace(/\s/g, '-').toLowerCase()}`;
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) setComments(JSON.parse(stored));
  }, [storageKey]);

  const addComment = () => {
    if (!name.trim() || !text.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      text: text.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      avatar: name.trim().charAt(0).toUpperCase(),
    };
    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setName('');
    setText('');
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3
          className="font-mono text-[11px] tracking-[0.08em] uppercase"
          style={{ color: 'var(--muted)', opacity: 0.5 }}
        >
          Feedback ({comments.length})
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-xs font-bold cursor-pointer px-3 py-1.5 rounded-full transition-all duration-200"
          style={{ border: '1px solid var(--hair)', background: 'transparent', color: 'var(--fg)' }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--fg)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--hair)')}
        >
          {showForm ? 'Cancel' : '+ Add'}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="mb-4 flex flex-col gap-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--hair)', color: 'var(--fg)' }}
            />
            <textarea
              placeholder="Leave your feedback..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--hair)', color: 'var(--fg)' }}
            />
            <button
              onClick={addComment}
              className="self-end px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all duration-200"
              style={{ background: 'var(--fg)', color: 'var(--bg)', border: 'none' }}
            >
              Post Feedback
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3 max-h-[200px] overflow-y-auto proj-modal-scroll">
        {comments.length === 0 && !showForm && (
          <p className="text-[13px] text-center py-4" style={{ color: 'var(--muted)', opacity: 0.4 }}>
            No feedback yet — be the first!
          </p>
        )}
        {comments.map((c, i) => (
          <motion.div
            key={c.id}
            className="flex gap-3 p-3 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--hair)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--fg)' }}
            >
              {c.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{c.name}</span>
                <span className="text-[10px] font-mono" style={{ color: 'var(--muted)', opacity: 0.4 }}>{c.date}</span>
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--muted)' }}>{c.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Project Modal ──
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(16px)' }} />

      {/* Modal container */}
      <motion.div
        className="relative w-full max-w-[820px] max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#0c0c0c', border: `1px solid ${project.color}20`, boxShadow: `0 0 80px ${project.color}08, 0 25px 60px rgba(0,0,0,0.5)` }}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Floating close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer z-30 text-sm"
          style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--muted)', backdropFilter: 'blur(12px)' }}
          whileHover={{ scale: 1.1, borderColor: 'rgba(255,255,255,0.3)' }}
          whileTap={{ scale: 0.95 }}
        >
          ✕
        </motion.button>

        {/* Scrollable content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto proj-modal-scroll relative">
          <CustomScrollbar containerRef={scrollRef} />

          {/* ── Hero Cover ── */}
          <div className="relative w-full aspect-[2.2/1] overflow-hidden">
            <Image src={project.cover} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 820px" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0c0c0c 0%, rgba(12,12,12,0.6) 40%, transparent 100%)' }} />

            {/* Accent glow */}
            <div className="absolute bottom-0 left-0 w-[300px] h-[200px] -z-0" style={{ background: `radial-gradient(circle at bottom left, ${project.color}15, transparent 70%)` }} />

            {/* Title overlay */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full" style={{ background: project.color, boxShadow: `0 0 10px ${project.color}` }} />
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase font-bold" style={{ color: project.color }}>{project.category}</span>
                {project.live && (
                  <>
                    <span style={{ color: 'var(--hair-2)' }}>·</span>
                    <span className="font-mono text-[10px] tracking-[0.1em] uppercase" style={{ color: '#4ade80' }}>● Live</span>
                  </>
                )}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight" style={{ color: '#fff' }}>
                {project.title}
              </h2>
            </motion.div>
          </div>

          <div className="px-6 sm:px-8 pb-8">
            {/* ── Quick Actions (sticky-ish) ── */}
            <motion.div
              className="flex flex-wrap items-center gap-2 py-5 -mt-1"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="proj-modal-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-black uppercase tracking-widest"
                  style={{ background: project.color, color: '#000' }}>
                  Live Demo
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'var(--fg)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                  Source
                </a>
              )}
              {project.github && (
                <a href={`${project.github}/issues`} target="_blank" rel="noopener noreferrer"
                  className="proj-contribute-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold transition-all duration-200"
                  style={{ border: '1px dashed rgba(255,255,255,0.12)', color: 'var(--muted)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" /></svg>
                  Contribute
                </a>
              )}
              <div className="ml-auto">
                <StarRating projectTitle={project.title} />
              </div>
            </motion.div>

            {/* ── Description ── */}
            <motion.p
              className="text-[15px] leading-[1.75] mt-6 mb-8"
              style={{ color: 'var(--muted)', maxWidth: 640 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {project.longDesc}
            </motion.p>

            {/* ── Stats ── */}
            <motion.div
              className="grid grid-cols-3 gap-3 mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              {project.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="relative text-center py-5 rounded-2xl overflow-hidden group"
                  style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
                  whileHover={{ borderColor: `${project.color}30`, background: 'rgba(255,255,255,0.04)' }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.06 }}
                >
                  <div className="text-3xl font-black mb-1" style={{ color: project.color }}>{stat.value}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--muted)' }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* ── Tech tags ── */}
            <motion.div
              className="flex flex-wrap gap-2 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="font-mono text-[10px] tracking-[0.1em] uppercase self-center mr-2" style={{ color: 'var(--muted)', opacity: 0.4 }}>Built with</span>
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-tight transition-all duration-200" style={{ background: `${project.color}08`, border: `1px solid ${project.color}18`, color: `${project.color}cc` }}>
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* ── Features Showcase ── */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px" style={{ background: project.color }} />
                <h3 className="font-mono text-[11px] tracking-[0.1em] uppercase font-bold" style={{ color: 'var(--fg)' }}>
                  Key Features
                </h3>
                <span className="font-mono text-[11px]" style={{ color: 'var(--muted)', opacity: 0.4 }}>
                  {project.features.length}
                </span>
              </div>

              {/* Feature image preview */}
              <motion.div
                className="relative w-full aspect-[2.2/1] rounded-xl overflow-hidden mb-5"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                key={activeFeature}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={project.features[activeFeature].image}
                  alt={project.features[activeFeature].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 760px"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to right, #0c0c0c 0%, transparent 40%, transparent 60%, #0c0c0c 100%)` }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, #0c0c0c 0%, transparent 50%)` }} />

                {/* Feature label on image */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="text-2xl">{project.features[activeFeature].icon}</span>
                  <span className="text-lg font-bold" style={{ color: '#fff' }}>{project.features[activeFeature].title}</span>
                </div>

                {/* Progress dots */}
                <div className="absolute bottom-4 right-4 flex gap-1.5">
                  {project.features.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveFeature(idx)}
                      className="cursor-pointer border-none rounded-full transition-all duration-300"
                      style={{
                        width: idx === activeFeature ? 18 : 6,
                        height: 6,
                        background: idx === activeFeature ? project.color : 'rgba(255,255,255,0.2)',
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Feature cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, i) => (
                  <motion.button
                    key={feature.title}
                    className={`proj-feature-card text-left rounded-xl p-4 cursor-pointer transition-all duration-300 border-none`}
                    style={{
                      background: activeFeature === i ? `${project.color}08` : 'rgba(255,255,255,0.02)',
                      border: activeFeature === i ? `1px solid ${project.color}30` : '1px solid rgba(255,255,255,0.06)',
                    }}
                    onClick={() => setActiveFeature(i)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.06, duration: 0.35 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl mt-0.5 shrink-0">{feature.icon}</span>
                      <div>
                        <h4 className="font-bold text-[13px] mb-1.5" style={{ color: activeFeature === i ? 'var(--fg)' : 'var(--fg)' }}>{feature.title}</h4>
                        <p className="text-[12px] leading-[1.6]" style={{ color: 'var(--muted)', opacity: activeFeature === i ? 1 : 0.7 }}>{feature.desc}</p>
                      </div>
                    </div>
                    {activeFeature === i && (
                      <motion.div
                        className="mt-3 h-[2px] rounded-full"
                        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                        layoutId="feature-indicator"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* ── Feedback ── */}
            <motion.div
              className="mt-10 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <CommentsSection projectTitle={project.title} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Component ──
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const closeModal = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <section className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-28 pb-24 relative z-10 overflow-hidden">
        <div className="absolute -z-10 pointer-events-none" style={{ width: 600, height: 600, top: '-5%', right: '-10%', background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div className="absolute -z-10 pointer-events-none" style={{ width: 500, height: 500, bottom: '0', left: '-8%', background: 'radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)' }} />

        <motion.div className="w-full max-w-6xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="flex flex-col items-center mb-14 text-center">
            <motion.div
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
              style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-xs font-medium tracking-wide" style={{ color: 'var(--muted)' }}>Click any project to explore</span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-black mb-5 tracking-tighter"
              style={{ color: 'var(--fg)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Featured Projects
            </motion.h2>
            <motion.p
              className="text-base md:text-lg max-w-xl mx-auto"
              style={{ color: 'var(--muted)', lineHeight: 1.7 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              A collection of my most impactful work, from web applications to creative experiments.
            </motion.p>
          </div>

          {/* Filter tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-5 py-2 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 cursor-pointer"
                style={{
                  border: `1px solid ${activeFilter === f ? 'var(--fg)' : 'rgba(255,255,255,0.1)'}`,
                  background: activeFilter === f ? 'var(--fg)' : 'transparent',
                  color: activeFilter === f ? 'var(--bg)' : 'var(--muted)',
                }}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* Projects grid */}
          <div className="grid gap-5 md:grid-cols-2 max-w-6xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  className="proj-card rounded-2xl overflow-hidden flex flex-col h-full group cursor-pointer"
                  style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ borderColor: `${project.color}40`, background: 'rgba(255,255,255,0.04)', y: -4 }}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Card cover */}
                  <div className="relative w-full aspect-[2.5/1] overflow-hidden">
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, var(--bg) 10%, transparent 80%)` }} />
                  </div>

                  <div className="p-5 pt-0 flex flex-col flex-1">
                    <div className="w-10 h-1 rounded-full mb-4 transition-all duration-500 group-hover:w-16" style={{ background: project.color }} />

                    <h3 className="text-xl sm:text-2xl font-bold mb-2 transition-colors duration-300" style={{ color: 'var(--fg)' }}>
                      {project.title}
                    </h3>

                    <p className="text-sm mb-4 flex-grow leading-relaxed" style={{ color: 'var(--muted)' }}>{project.description}</p>

                    <div className="flex flex-wrap gap-1.5 text-xs mb-4">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-md font-semibold tracking-tight" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}>
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2.5 py-1 rounded-md font-semibold tracking-tight" style={{ color: 'var(--muted)', opacity: 0.5 }}>+{project.tags.length - 4}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex items-center gap-1.5">
                        {project.live && <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4ade80' }} />}
                        <span className="text-[11px] font-mono uppercase tracking-wide" style={{ color: 'var(--muted)', opacity: 0.5 }}>
                          {project.live ? 'Live' : project.github ? 'Open Source' : 'Private'}
                        </span>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0" style={{ color: project.color }}>
                        Explore →
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
}
