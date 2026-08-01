import type {
  ContactContent,
  CurrentlyContent,
  HeroContent,
  Project,
  SiteStatus,
  StackStat,
  WorkEntry,
} from './types';

/**
 * Local seed data — the fallback content used when Supabase is not configured.
 * Mirrors what the dashboard would write to the DB, so the public site always
 * renders even with zero backend setup. Once you connect Supabase and add rows,
 * the live data takes over automatically.
 */

export const seedStatus: SiteStatus = {
  currentlyBuilding: 'Full stack products with React, Next.js & Node.js',
  availability: 'available',
  howIWork: 'End-to-end ownership — from schema and APIs to polished UI and production deploys.',
  location: 'Dhaka',
  timezone: 'Asia/Dhaka',
};

export const seedHero: HeroContent = {
  name: 'Sohag Hossain',
  roleTitle: 'Full Stack Developer · 4+ years',
  badgeText: 'Open to opportunities · React · Node · Cloud',
  headingLines: [
    { text: 'Full Stack.', accent: false },
    { text: 'Product-minded.', accent: false },
    { text: 'Ready to ship.', accent: true },
  ],
  description:
    'I design and build production web apps end to end — React & Next.js on the front, Node.js / Django APIs and PostgreSQL on the back, deployed on cloud infrastructure. Currently Team Lead at Remote Talent Ltd.',
  techPills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Django', 'PostgreSQL', 'Docker', 'Digital Ocean', 'AWS'],
  stats: [
    { value: 4, suffix: '+', label: 'Years experience' },
    { value: 50, suffix: '+', label: 'Apps shipped' },
    { value: 15, suffix: '+', label: 'Technologies' },
  ],
  profileImage: '/images/my-images/sohagdev.png',
};

export const seedCurrently: CurrentlyContent = {
  updatedLabel: '● Updated Aug 2026',
  tickerLogs: [
    'shipping React & Next.js features to production',
    'designing PostgreSQL schemas & Node APIs',
    'leading a 4-person engineering team',
    'improving CI/CD and cloud reliability',
    'exploring AI-assisted developer workflows',
  ],
  cards: [
    {
      icon: '⚡',
      badge: 'Work',
      title: 'Leading full stack delivery',
      description:
        'Owning product features from database design to production — React, Next.js, Node.js, and cloud infrastructure for enterprise clients.',
      meta: {
        type: 'commit-graph',
        commitData: [3, 5, 2, 7, 4, 6, 1, 8, 3, 5, 9, 2, 6, 4, 7, 3, 5, 8, 2, 6],
        fromLabel: '4 weeks ago',
        toLabel: 'today',
      },
    },
    {
      icon: '🧠',
      badge: 'Learning',
      title: 'AI-assisted engineering workflows',
      description:
        'Integrating agent tooling and MCP into day-to-day development to ship faster without sacrificing code quality.',
      meta: {
        type: 'skills',
        skills: [
          { label: 'AI Agents', pct: 70 },
          { label: 'MCP Protocol', pct: 55 },
          { label: 'System Design', pct: 65 },
        ],
      },
    },
    {
      icon: '🚀',
      badge: 'Focus',
      title: 'Reliable product systems',
      description:
        'Building interfaces and APIs that stay maintainable as teams and features grow.',
      tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
      meta: {
        type: 'terminal',
        terminalPath: '~/work',
        terminalLines: [
          'ship feature with CI checks',
          'tighten API contracts',
          'review junior pull requests',
        ],
      },
    },
    {
      icon: '📖',
      badge: 'Reading',
      title: 'Designing Data-Intensive Applications',
      description: 'Martin Kleppmann',
      meta: {
        type: 'book',
        chapter: 'Ch. 5 · Replication',
        progressPct: 42,
      },
    },
  ],
};

export const seedContact: ContactContent = {
  heading: 'Get In Touch',
  subheading: 'Open to full-time roles, contract work, and serious collaborations.',
  ctaHeading: "Let's build something reliable.",
  ctaSubheading: 'I respond to thoughtful opportunities within one business day.',
  email: 'sohagdev2019@gmail.com',
  resumeUrl: 'https://drive.google.com/file/d/1wHVsrVJdO8dgw7B0FV_uQqnahajS_62b/view',
  socialLinks: [
    { platform: 'github', label: 'GitHub', href: 'https://github.com/sohagzayan', display: 'github.com/sohagzayan' },
    { platform: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/sohagzayan/', display: 'linkedin.com/in/sohagzayan' },
    { platform: 'twitter', label: 'Twitter', href: 'https://twitter.com/sohagmia360', display: '@sohagmia360' },
  ],
};

export const seedWork: WorkEntry[] = [
  {
    id: 'remote-talent',
    company: 'Remote Talent Ltd.',
    role: 'Team Lead / Full Stack Developer',
    timeframe: 'May 2024 — Present',
    duration: '1+ year',
    location: 'Dhaka, Bangladesh',
    workMode: 'Onsite',
    color: '#3b82f6',
    isCurrent: true,
    context:
      'Leading a 4-person engineering team shipping enterprise-grade products for a Canadian tech company.',
    constraint:
      'Small team, enterprise SLAs, and a legacy monolith that could not absorb new feature load.',
    decision:
      'Extracted scalable microservices behind RESTful APIs with CI/CD on Digital Ocean, and standardized code review + pairing to keep quality high while onboarding juniors.',
    tradeoff:
      'Accepted the operational overhead of running multiple services (observability, HA, disaster recovery) in exchange for independent deploys and clearer ownership.',
    result:
      'Faster, safer releases and a mentored team hitting predictable sprint velocity across React, Next.js, Node.js, Django & PostgreSQL.',
    highlights: [
      'Architect scalable microservices & RESTful APIs with CI/CD on Digital Ocean',
      'Mentor juniors through pair programming, code reviews & career planning',
      'Drive agile ceremonies — sprint planning, retrospectives, velocity improvements',
      'Manage cloud infrastructure — performance optimization, HA, disaster recovery',
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Django', 'PostgreSQL', 'Docker', 'Digital Ocean'],
    sortOrder: 0,
    published: true,
  },
  {
    id: 'iiinigence',
    company: 'Iiinigence LLC / CygenSols',
    role: 'Software Developer',
    timeframe: 'Feb 2023 — May 2024',
    duration: '1 yr 3 mo',
    location: 'USA-based · International Team',
    workMode: 'Remote',
    color: '#a78bfa',
    context:
      'Building performant full-stack applications for an international team across multiple time zones.',
    constraint:
      'Async collaboration across time zones with tight design-to-ship cycles and performance budgets.',
    decision:
      'Owned features end-to-end from Figma wireframes to shipped UI, leaning on lazy loading, code splitting, and disciplined state management.',
    tradeoff:
      'Invested up-front in prototyping and API/schema design to reduce rework, at the cost of slower first-commit time.',
    result:
      'Responsive, scalable products with measurably better load performance and fewer regressions.',
    highlights: [
      'Developed responsive web apps with React, Node.js & TypeScript',
      'Designed UI/UX flows — wireframes to high-fidelity prototypes in Figma',
      'Optimized performance: lazy loading, code splitting, efficient state management',
      'Implemented RESTful APIs & database schemas for scalable products',
    ],
    skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'REST APIs', 'Figma', 'MongoDB'],
    sortOrder: 1,
    published: true,
  },
];

export const seedProjects: Project[] = [
  {
    id: 'edupeak',
    slug: 'edupeak',
    title: 'EduPeak LMS',
    description:
      'Full-featured LMS with 200+ features — course creation, analytics, payments, multi-tenant workspaces.',
    longDesc:
      'A comprehensive Learning Management System designed to deliver an exceptional educational experience. From course creation to analytics, payments to gamification, EduPeak provides everything needed for modern online learning.',
    contribution:
      'Built the multi-tenant workspace isolation, the Stripe billing/subscription layer, and the analytics dashboard pipeline.',
    tags: ['NextJS', 'React', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe'],
    category: 'Web',
    live: 'https://knowledge-share-eta.vercel.app/',
    color: '#3b82f6',
    cover: '/images/hero_section.png',
    decisionLog: [
      { choice: 'Row-level multi-tenancy over separate databases', reason: 'Cheaper to operate and simpler migrations while still isolating each org via Postgres RLS.' },
      { choice: 'Prisma over a hand-rolled query layer', reason: 'Type-safe schema + migrations paid off across 200+ features and 4 user roles.' },
      { choice: 'Stripe subscriptions over one-time payments only', reason: 'Recurring billing matched the product model and unlocked coupons/invoicing for free.' },
    ],
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
    ],
    sortOrder: 0,
    published: true,
  },
  {
    id: 'tribe',
    slug: 'tribe',
    title: 'Tribe Community App',
    description:
      'A community platform with feeds, spaces, and real-time interactions — anchor/overlay UI structuring.',
    longDesc:
      'A community application with structured spaces, activity feeds, and real-time interactions. This is where the hover/click zone handling and anchor/overlay structuring work lives — the same primitives behind the DSL UI system.',
    contribution:
      'Built the hover/click zone handling and the anchor/overlay structuring that powers the interactive feed surfaces.',
    tags: ['NextJS', 'React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    category: 'Web',
    github: 'https://github.com/sohagzayan/tribe-community-app',
    live: 'https://tribe-community-app.vercel.app/',
    color: '#a78bfa',
    cover: '/images/hero_section.png',
    decisionLog: [
      { choice: 'Anchor/overlay zone model over fixed layouts', reason: 'Let content authors position interactive zones declaratively — the seed of the DSL approach.' },
      { choice: 'Framer Motion layout animations over manual CSS', reason: 'Auto height/position animation removed a whole class of jank in the feed.' },
    ],
    stats: [
      { label: 'Sections', value: '8+' },
      { label: 'Animations', value: '50+' },
      { label: 'Lighthouse', value: '95+' },
    ],
    features: [
      { title: 'Interactive Zones', desc: 'Declarative hover/click zones with anchor + overlay structuring for rich, authorable surfaces.', icon: '🎯', image: '/images/hero_section.png' },
      { title: 'Real-time Feed', desc: 'Live activity feed with optimistic updates and smooth layout transitions.', icon: '⚡', image: '/images/hero_section.png' },
      { title: 'Spaces', desc: 'Structured community spaces with roles, permissions, and per-space theming.', icon: '🏘️', image: '/images/hero_section.png' },
    ],
    sortOrder: 1,
    published: true,
  },
];

/**
 * Fallback stack stats (used when GitHub-derived stats are unavailable).
 * Ordering is by `count` so the most-used tech ranks first, matching the
 * "derived not asserted" principle.
 */
export const seedStack: StackStat[] = [
  { name: 'TypeScript', category: 'Frontend', icon: 'https://cdn.simpleicons.org/typescript', count: 320, percent: 100, level: 'expert', projects: ['EduPeak LMS', 'Tribe Community App'], sparkline: [4, 6, 5, 8, 7, 9, 10, 12] },
  { name: 'React', category: 'Frontend', icon: 'https://cdn.simpleicons.org/react', count: 300, percent: 94, level: 'expert', projects: ['EduPeak LMS', 'Tribe Community App'], sparkline: [5, 5, 7, 6, 8, 9, 9, 11] },
  { name: 'Next.js', category: 'Frontend', icon: 'https://cdn.simpleicons.org/nextdotjs', invert: true, count: 260, percent: 82, level: 'expert', projects: ['EduPeak LMS', 'Tribe Community App'], sparkline: [3, 4, 6, 5, 7, 8, 9, 10] },
  { name: 'Node.js', category: 'Backend', icon: 'https://cdn.simpleicons.org/nodedotjs', count: 210, percent: 66, level: 'comfortable', projects: ['EduPeak LMS'], sparkline: [4, 4, 5, 6, 5, 7, 6, 8] },
  { name: 'PostgreSQL', category: 'Backend', icon: 'https://cdn.simpleicons.org/postgresql', count: 150, percent: 47, level: 'comfortable', projects: ['EduPeak LMS'], sparkline: [2, 3, 3, 4, 5, 4, 6, 6] },
  { name: 'TailwindCSS', category: 'Frontend', icon: 'https://cdn.simpleicons.org/tailwindcss', count: 180, percent: 56, level: 'expert', projects: ['Tribe Community App'], sparkline: [3, 4, 5, 6, 6, 7, 8, 9] },
  { name: 'Prisma', category: 'DSL-CMS', icon: 'https://cdn.simpleicons.org/prisma', invert: true, count: 90, percent: 28, level: 'comfortable', projects: ['EduPeak LMS'], sparkline: [1, 2, 2, 3, 3, 4, 4, 5] },
  { name: 'Docker', category: 'Tooling', icon: 'https://cdn.simpleicons.org/docker', count: 80, percent: 25, level: 'comfortable', projects: ['EduPeak LMS'], sparkline: [1, 1, 2, 2, 3, 3, 4, 4] },
  { name: 'Framer Motion', category: 'DSL-CMS', icon: 'https://cdn.simpleicons.org/framer', count: 70, percent: 22, level: 'expert', projects: ['Tribe Community App'], sparkline: [2, 3, 3, 4, 5, 5, 6, 7] },
  { name: 'Python', category: 'Tooling', icon: 'https://cdn.simpleicons.org/python', count: 60, percent: 19, level: 'comfortable', projects: [], sparkline: [1, 1, 2, 2, 2, 3, 3, 4] },
];
