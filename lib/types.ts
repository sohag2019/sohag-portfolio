/**
 * Shared data model for the portfolio + dashboard.
 *
 * These types are the single source of truth for both the Supabase schema
 * (see supabase/schema.sql) and the local seed fallback (see lib/seed.ts).
 */

export type Availability = 'available' | 'deep-work' | 'busy' | 'offline';

export interface SiteStatus {
  /** What you are currently building — shown on the Overview live strip. */
  currentlyBuilding: string;
  /** Availability signal driving the pulse dot on the hero. */
  availability: Availability;
  /** Short "how I work" line — not a full bio. */
  howIWork: string;
  /** City used for the local-time clock (IANA timezone). */
  location: string;
  timezone: string;
  updatedAt?: string;
}

export interface HeroHeadingLine {
  text: string;
  accent: boolean;
}

export interface HeroStat {
  value: number;
  suffix: string;
  label: string;
}

/** Content for the homepage Hero — editable from /admin/hero. */
export interface HeroContent {
  /** Display name — first thing a recruiter should read. */
  name: string;
  /** Short role line under the name, e.g. "Full Stack Developer". */
  roleTitle: string;
  badgeText: string;
  headingLines: HeroHeadingLine[];
  description: string;
  techPills: string[];
  stats: HeroStat[];
  profileImage: string;
  updatedAt?: string;
}

/**
 * A single "Currently" card (Work / Learning / Side Project / Fuel / Reading, etc).
 * `meta` is a free-form bag for the per-card visual widgets (commit graph data,
 * skill percentages, terminal lines, book progress…) — see content shape in
 * lib/seed.ts for the fields each card type expects.
 */
export interface CurrentlyCard {
  icon: string;
  badge: string;
  title: string;
  description: string;
  tags?: string[];
  meta?: Record<string, unknown>;
}

/** Content for the homepage "Currently" section — editable from /admin/currently. */
export interface CurrentlyContent {
  updatedLabel: string;
  tickerLogs: string[];
  cards: CurrentlyCard[];
  updatedAt?: string;
}

export type SocialPlatform = 'github' | 'linkedin' | 'discord' | 'twitter' | 'website' | 'other';

export interface ContactSocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
  display: string;
}

/** Content for the homepage Contact section — editable from /admin/contact. */
export interface ContactContent {
  heading: string;
  subheading: string;
  ctaHeading: string;
  ctaSubheading: string;
  email: string;
  resumeUrl: string;
  socialLinks: ContactSocialLink[];
  updatedAt?: string;
}

export interface WorkEntry {
  id: string;
  company: string;
  role: string;
  /** Compact "May 2024 — Present". */
  timeframe: string;
  /** e.g. "1+ year" */
  duration: string;
  location?: string;
  workMode?: string;
  color: string;
  isCurrent?: boolean;
  /** Decision-driven framing. */
  context: string;
  constraint: string;
  decision: string;
  tradeoff: string;
  result: string;
  /** Optional supporting bullets. */
  highlights: string[];
  skills: string[];
  /** Optional deep-dive link (e.g. a Writing post). */
  linkLabel?: string;
  linkHref?: string;
  sortOrder: number;
  published: boolean;
}

export interface ProjectDecision {
  choice: string; // "Custom DSL parser over MDX"
  reason: string; // "why X over Y"
}

export interface ProjectFeature {
  title: string;
  desc: string;
  icon: string;
  image: string;
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDesc: string;
  /** Precise personal contribution. */
  contribution: string;
  tags: string[];
  category: string;
  github?: string;
  live?: string;
  color: string;
  cover: string;
  /** Highest-signal content: 2–3 "why X over Y" bullets. */
  decisionLog: ProjectDecision[];
  features: ProjectFeature[];
  stats: ProjectStat[];
  sortOrder: number;
  published: boolean;
}

export type WritingStatus = 'draft' | 'published';

/**
 * Writing posts come from two places (see lib/writing.ts): the `writing` table
 * edited at /admin/writing, and .mdx files in content/writing/. Both hold a raw
 * MDX body, so they render identically.
 */
export interface WritingPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  /** Raw MDX body, compiled at render time. */
  content: string;
  status: WritingStatus;
  readingMinutes: number;
  publishedAt?: string;
  updatedAt?: string;
  /** Pins the post to the top of the list with a "Trending" badge. */
  trending?: boolean;
}

export type StackLevel = 'learning' | 'comfortable' | 'expert';

export interface StackStat {
  name: string;
  category: string;
  icon?: string;
  invert?: boolean;
  /** Derived commit/byte count from GitHub — drives ordering. */
  count: number;
  percent: number;
  level: StackLevel;
  projects: string[];
  /** Commits per month, most-recent-last, for the sparkline. */
  sparkline: number[];
}

export interface AnalyticsRow {
  section: string;
  views: number;
}
