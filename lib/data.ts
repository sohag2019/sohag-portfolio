import { createClient } from '@supabase/supabase-js';
import {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  isSupabaseConfigured,
} from './supabase/config';
import {
  seedContact,
  seedCurrently,
  seedHero,
  seedProjects,
  seedStack,
  seedStatus,
  seedWork,
} from './seed';
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
 * Public read client — anon key, no cookies, so results are cacheable in RSC.
 * RLS exposes only published rows to the anon role (see supabase/schema.sql).
 */
function readClient() {
  if (!isSupabaseConfigured) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/* eslint-disable @typescript-eslint/no-explicit-any */

// ── Row → domain mappers ──

function mapWork(r: any): WorkEntry {
  return {
    id: r.id,
    company: r.company,
    role: r.role,
    timeframe: r.timeframe,
    duration: r.duration ?? '',
    location: r.location ?? undefined,
    workMode: r.work_mode ?? undefined,
    color: r.color ?? '#3b82f6',
    isCurrent: r.is_current ?? false,
    context: r.context ?? '',
    constraint: r.constraint ?? '',
    decision: r.decision ?? '',
    tradeoff: r.tradeoff ?? '',
    result: r.result ?? '',
    highlights: r.highlights ?? [],
    skills: r.skills ?? [],
    linkLabel: r.link_label ?? undefined,
    linkHref: r.link_href ?? undefined,
    sortOrder: r.sort_order ?? 0,
    published: r.published ?? true,
  };
}

function mapProject(r: any): Project {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description ?? '',
    longDesc: r.long_desc ?? '',
    contribution: r.contribution ?? '',
    tags: r.tags ?? [],
    category: r.category ?? 'Web',
    github: r.github ?? undefined,
    live: r.live ?? undefined,
    color: r.color ?? '#3b82f6',
    cover: r.cover ?? '/images/hero_section.png',
    decisionLog: r.decision_log ?? [],
    features: r.features ?? [],
    stats: r.stats ?? [],
    sortOrder: r.sort_order ?? 0,
    published: r.published ?? true,
  };
}

function mapStatus(r: any): SiteStatus {
  return {
    currentlyBuilding: r.currently_building ?? seedStatus.currentlyBuilding,
    availability: r.availability ?? seedStatus.availability,
    howIWork: r.how_i_work ?? seedStatus.howIWork,
    location: r.location ?? seedStatus.location,
    timezone: r.timezone ?? seedStatus.timezone,
    updatedAt: r.updated_at ?? undefined,
  };
}

function mapHero(r: any): HeroContent {
  return {
    name: r.name ?? seedHero.name,
    roleTitle: r.role_title ?? seedHero.roleTitle,
    badgeText: r.badge_text ?? seedHero.badgeText,
    headingLines: r.heading_lines?.length ? r.heading_lines : seedHero.headingLines,
    description: r.description ?? seedHero.description,
    techPills: r.tech_pills?.length ? r.tech_pills : seedHero.techPills,
    stats: r.stats?.length ? r.stats : seedHero.stats,
    profileImage: r.profile_image ?? seedHero.profileImage,
    updatedAt: r.updated_at ?? undefined,
  };
}

function mapCurrently(r: any): CurrentlyContent {
  return {
    updatedLabel: r.updated_label ?? seedCurrently.updatedLabel,
    tickerLogs: r.ticker_logs?.length ? r.ticker_logs : seedCurrently.tickerLogs,
    cards: r.cards?.length ? r.cards : seedCurrently.cards,
    updatedAt: r.updated_at ?? undefined,
  };
}

function mapContact(r: any): ContactContent {
  return {
    heading: r.heading ?? seedContact.heading,
    subheading: r.subheading ?? seedContact.subheading,
    ctaHeading: r.cta_heading ?? seedContact.ctaHeading,
    ctaSubheading: r.cta_subheading ?? seedContact.ctaSubheading,
    email: r.email ?? seedContact.email,
    resumeUrl: r.resume_url ?? seedContact.resumeUrl,
    socialLinks: r.social_links?.length ? r.social_links : seedContact.socialLinks,
    updatedAt: r.updated_at ?? undefined,
  };
}

// ── Public getters (Supabase → seed fallback) ──

export async function getStatus(): Promise<SiteStatus> {
  const sb = readClient();
  if (!sb) return seedStatus;
  const { data, error } = await sb
    .from('status')
    .select('*')
    .eq('id', 'singleton')
    .maybeSingle();
  if (error || !data) return seedStatus;
  return mapStatus(data);
}

export async function getHero(): Promise<HeroContent> {
  const sb = readClient();
  if (!sb) return seedHero;
  const { data, error } = await sb
    .from('hero')
    .select('*')
    .eq('id', 'singleton')
    .maybeSingle();
  if (error || !data) return seedHero;
  return mapHero(data);
}

export async function getCurrently(): Promise<CurrentlyContent> {
  const sb = readClient();
  if (!sb) return seedCurrently;
  const { data, error } = await sb
    .from('currently')
    .select('*')
    .eq('id', 'singleton')
    .maybeSingle();
  if (error || !data) return seedCurrently;
  return mapCurrently(data);
}

export async function getContact(): Promise<ContactContent> {
  const sb = readClient();
  if (!sb) return seedContact;
  const { data, error } = await sb
    .from('contact')
    .select('*')
    .eq('id', 'singleton')
    .maybeSingle();
  if (error || !data) return seedContact;
  return mapContact(data);
}

export async function getWork(): Promise<WorkEntry[]> {
  const sb = readClient();
  if (!sb) return seedWork;
  const { data, error } = await sb
    .from('work')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });
  if (error || !data?.length) return seedWork;
  return data.map(mapWork);
}

export async function getProjects(): Promise<Project[]> {
  const sb = readClient();
  if (!sb) return seedProjects;
  const { data, error } = await sb
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });
  if (error || !data?.length) return seedProjects;
  return data.map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getStackStats(): Promise<StackStat[]> {
  const sb = readClient();
  if (!sb) return seedStack;
  const { data, error } = await sb
    .from('stack_stats')
    .select('*')
    .order('count', { ascending: false });
  if (error || !data?.length) return seedStack;
  return data.map((r: any) => ({
    name: r.name,
    category: r.category ?? 'Frontend',
    icon: r.icon ?? undefined,
    invert: r.invert ?? false,
    count: r.count ?? 0,
    percent: r.percent ?? 0,
    level: r.level ?? 'comfortable',
    projects: r.projects ?? [],
    sparkline: r.sparkline ?? [],
  }));
}
