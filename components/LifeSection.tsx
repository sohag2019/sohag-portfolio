'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LifeSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="life-bg-glow absolute -z-10" />

      <div className="nav-container">
        {/* Header */}
        <motion.div
          className="flex gap-[18px] items-baseline mb-10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="font-mono text-[48px] font-bold tracking-tight"
            style={{ color: 'var(--hair)', lineHeight: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            05
          </motion.span>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--muted)', opacity: 0.5 }}>/ Life</span>
            <span className="text-[22px] font-medium tracking-[-0.02em]" style={{ color: 'var(--fg)' }}>Outside the code</span>
          </div>
        </motion.div>

        {/* Content grid */}
        <div className="life-grid grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="life-image-wrap aspect-[3/2] overflow-hidden relative rounded-xl">
              <Image
                alt="Sohag Hossain"
                src="/images/my-images/sohag3.png"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
            </div>
            {/* Location tag */}
            <motion.div
              className="absolute left-4 bottom-4 flex gap-[10px] items-center px-3 py-2 rounded-lg"
              style={{
                background: 'rgba(10,10,10,0.8)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="size-[6px] rounded-full shrink-0" style={{ background: '#4ade80' }} />
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--muted)' }}>
                Dhaka · Building remotely
              </span>
            </motion.div>

            {/* Corner accents */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-blue-500/40 rounded-tl-lg transition-transform duration-500 group-hover:rotate-6" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-blue-500/40 rounded-br-lg transition-transform duration-500 group-hover:-rotate-6" />
          </motion.div>

          {/* Quote + link */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p
              className="font-sans"
              style={{
                fontSize: 'clamp(20px, 2.2vw, 30px)',
                lineHeight: 1.35,
                letterSpacing: '-0.005em',
                margin: '0 0 32px',
                color: 'var(--fg)',
              }}
            >
              The best code I write comes after stepping away from the screen.
              <span style={{ color: 'var(--muted)' }}>
                {' '}Running, reading, exploring — they all feed back into how I think about problems.
              </span>
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {['Travel', 'Open Source', 'Reading', 'Fitness'].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="life-tag font-mono text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <Link
              href="/life"
              className="inline-block text-[13px]"
              style={{ color: 'var(--fg)', borderBottom: '1px solid var(--fg)', paddingBottom: 2 }}
            >
              More about me ↗
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
