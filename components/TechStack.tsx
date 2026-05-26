'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface Skill {
  name: string;
  icon: string;
  invert?: boolean;
}

interface Category {
  title: string;
  color: string;
  glow: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    title: 'Frontend',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.15)',
    skills: [
      { name: 'React', icon: 'https://cdn.simpleicons.org/react' },
      { name: 'Vite', icon: 'https://cdn.simpleicons.org/vite' },
      { name: 'TailwindCSS', icon: 'https://cdn.simpleicons.org/tailwindcss' },
      { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs', invert: true },
      { name: 'Shadcn-UI', icon: 'https://cdn.simpleicons.org/shadcnui', invert: true },
      { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript' },
    ],
  },
  {
    title: 'Backend',
    color: '#4ade80',
    glow: 'rgba(74,222,128,0.15)',
    skills: [
      { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs' },
      { name: 'Express.js', icon: 'https://cdn.simpleicons.org/express', invert: true },
      { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb' },
      { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql' },
      { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql' },
    ],
  },
  {
    title: 'Tools',
    color: '#f472b6',
    glow: 'rgba(244,114,182,0.15)',
    skills: [
      { name: 'Git', icon: 'https://cdn.simpleicons.org/git' },
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python' },
      { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker' },
      { name: 'Prisma', icon: 'https://cdn.simpleicons.org/prisma', invert: true },
      { name: 'Redux/Zustand', icon: 'https://cdn.simpleicons.org/redux' },
    ],
  },
];

function SkillTile({ skill, color, glow, delay }: { skill: Skill; color: string; glow: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-30, 30], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-30, 30], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col items-center gap-2 p-2 rounded-2xl cursor-default"
      style={{
        border: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.02)',
        perspective: 500,
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl -z-10"
        style={{ background: `radial-gradient(circle at center, ${glow} 0%, transparent 70%)` }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Border glow */}
      <motion.div
        className="absolute inset-[-1px] rounded-2xl -z-10 pointer-events-none"
        style={{ border: `1px solid ${color}` }}
        animate={{ opacity: hovered ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon */}
      <motion.div
        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
        animate={{ scale: hovered ? 1.15 : 1, y: hovered ? -3 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <Image
          src={skill.icon}
          alt={skill.name}
          width={40}
          height={40}
          className={`w-full h-full object-contain${skill.invert ? ' invert' : ''}`}
          unoptimized
        />
      </motion.div>

      {/* Name */}
      <span
        className="text-[10px] sm:text-xs font-bold uppercase tracking-tighter text-center transition-colors duration-300"
        style={{ color: hovered ? 'var(--fg)' : 'var(--muted)' }}
      >
        {skill.name}
      </span>

      {/* Shine sweep */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
      >
        <motion.div
          className="absolute top-0 w-[40%] h-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }}
          animate={hovered ? { left: ['-40%', '140%'] } : { left: '-40%' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <section className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
      <motion.div
        className="w-full max-w-6xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter"
            style={{ color: 'var(--fg)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            My Stack
          </motion.h2>
          <motion.p
            className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-medium"
            style={{ color: 'var(--muted)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            A curated selection of technologies I use to build high-performance products.
          </motion.p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              className="p-4 rounded-3xl flex flex-col"
              style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            >
              {/* Category title */}
              <div className="flex items-center gap-4 mb-6">
                <h3
                  className="text-sm font-black uppercase tracking-widest pl-3"
                  style={{ color: cat.color, borderLeft: `2px solid ${cat.color}` }}
                >
                  {cat.title}
                </h3>
              </div>

              {/* 4-col skills grid */}
              <div className="grid grid-cols-4 gap-2">
                {cat.skills.map((skill, i) => (
                  <SkillTile
                    key={skill.name}
                    skill={skill}
                    color={cat.color}
                    glow={cat.glow}
                    delay={catIdx * 0.1 + i * 0.04}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
