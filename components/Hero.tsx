'use client';

import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 4, suffix: '+', label: 'Years in Dev' },
  { value: 50, suffix: '+', label: 'Apps Shipped' },
  { value: 15, suffix: '+', label: 'Tech Stack' },
];

const techFloaters = [
  'React', 'Next.js', 'Node.js', 'Django', 'Digital Ocean', 'Docker',
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 40;
          const increment = value / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="font-medium tracking-[-0.02em] leading-none tabular-nums"
      style={{ fontSize: 'clamp(24px, 2.8vw, 32px)' }}>
      {String(count).padStart(2, '0')}{suffix}
    </div>
  );
}

const headingLines = [
  { text: 'I Build.', accent: false },
  { text: 'I Ship.', accent: false },
  { text: 'Full Stack.', accent: true },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(smoothY, [-300, 300], [4, -4]);
  const rotateY = useTransform(smoothX, [-300, 300], [-4, 4]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section className="hero-section relative overflow-hidden" style={{ paddingBottom: 80 }}>
      {/* Background grid */}
      <div className="hero-bg-grid absolute inset-0 -z-20" />
      {/* Ambient glow blobs */}
      <div className="hero-glow-1 absolute -z-10" />
      <div className="hero-glow-2 absolute -z-10" />

      <div className="nav-container">
        <div className="hero-grid grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-end">
          {/* ── Left Column ── */}
          <div>
            {/* Status badge */}
            <motion.div
              className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="hero-status-dot relative inline-block size-2 shrink-0">
                <span className="absolute inset-0 rounded-full bg-emerald-400" />
                <span className="hero-ping absolute rounded-full" style={{ borderColor: '#34d399' }} />
              </span>
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--muted)' }}>
                Available for work — React · Node · Cloud
              </span>
            </motion.div>

            {/* Big heading with gradient on accent */}
            <h1
              className="hero-h1 mt-8 font-sans font-semibold"
              style={{
                fontSize: 'clamp(48px, 8vw, 120px)',
                lineHeight: 0.94,
                letterSpacing: '-0.045em',
              }}
            >
              {headingLines.map((line, i) => (
                <motion.span
                  key={line.text}
                  className={`block ${line.accent ? 'hero-gradient-text' : ''}`}
                  style={!line.accent ? { color: 'var(--fg)' } : undefined}
                  initial={{ opacity: 0, y: 80, rotateX: -50, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line.text}
                </motion.span>
              ))}
            </h1>

            {/* Description with word-by-word reveal */}
            <motion.p
              className="m-0 mt-7 max-w-[560px]"
              style={{
                fontSize: 'clamp(15px, 1.6vw, 19px)',
                lineHeight: 1.7,
                color: 'var(--muted)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              Full Stack Developer turning complex problems into clean,
              scalable products — from React &amp; Next.js frontends to
              Node.js APIs, PostgreSQL, and cloud infrastructure.
            </motion.p>

            {/* Tech pills */}
            <motion.div
              className="flex flex-wrap gap-2 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              {['React', 'Next.js', 'Node.js', 'Django', 'TypeScript', 'PostgreSQL', 'Digital Ocean', 'AWS', 'Docker'].map((tech, i) => (
                <motion.span
                  key={tech}
                  className="hero-pill font-mono text-[11px] tracking-[0.04em] uppercase px-3 py-1.5 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.3 + i * 0.08 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* ── Right Column ── */}
          <div className="pb-3" ref={containerRef}>
            {/* Profile image with 3D tilt */}
            <motion.div
              className="flex justify-center mb-7"
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="relative group flex-shrink-0"
                style={{ rotateX, rotateY, transformPerspective: 800 }}
              >
                {/* Floating tech labels */}
                {techFloaters.slice(0, 6).map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="hero-floater font-mono text-[10px] tracking-wider uppercase absolute z-30 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 1.5 + i * 0.1 }}
                    style={{
                      top: `${15 + i * 14}%`,
                      left: i % 2 === 0 ? '-60px' : undefined,
                      right: i % 2 !== 0 ? '-65px' : undefined,
                      color: 'var(--muted)',
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}

                {/* Corner accents */}
                <motion.div
                  className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-blue-500/60 z-20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8, type: 'spring' }}
                  style={{ transformOrigin: 'top left' }}
                />
                <motion.div
                  className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-blue-500/60 z-20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9, type: 'spring' }}
                  style={{ transformOrigin: 'bottom right' }}
                />

                {/* Image container */}
                <div className="relative w-[260px] md:w-[320px] lg:w-[380px] aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950">
                  <Image
                    src="/images/my-images/sohagdev.png"
                    alt="Sohag Hossain"
                    fill
                    className="object-cover scale-105 group-hover:scale-100 grayscale group-hover:grayscale-0 transition-all duration-700"
                    sizes="400px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-black/30 group-hover:via-transparent transition-all duration-700" />
                  <div className="hero-scan-line absolute inset-0 pointer-events-none" />
                  {/* Code overlay hint */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="font-mono text-[10px] text-blue-300/70 leading-relaxed">
                      <span className="text-blue-400/50">const</span> dev = &#123;<br />
                      &nbsp;&nbsp;name: <span className="text-emerald-400/70">&quot;Sohag&quot;</span>,<br />
                      &nbsp;&nbsp;role: <span className="text-emerald-400/70">&quot;Full Stack&quot;</span><br />
                      &#125;;
                    </div>
                  </div>
                </div>

                {/* Glow */}
                <div className="absolute -inset-12 bg-blue-500/10 blur-[90px] rounded-full -z-10 opacity-0 group-hover:opacity-80 transition-opacity duration-700" />
              </motion.div>
            </motion.div>

            {/* Stats with animated counters */}
            <div className="hero-stats mt-8 flex justify-start md:justify-center gap-8 flex-wrap">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="hero-stat-card min-w-[90px] p-3 rounded-xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.1 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -4, scale: 1.04 }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <span
                    className="font-mono text-[11px] tracking-[0.08em] uppercase"
                    style={{
                      marginTop: 6,
                      display: 'block',
                      color: 'var(--muted)',
                    }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <motion.hr
        className="hero-rule mx-auto"
        style={{
          border: 'none',
          height: 1,
          background: 'var(--hair)',
          maxWidth: 'calc(100% - 96px)',
          marginTop: 64,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </section>
  );
}
