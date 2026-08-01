import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';
import {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  isSupabaseConfigured,
} from './supabase/config';
import type { WritingPost } from './types';

/**
 * Writing (blog) content from two sources, merged:
 *   1. Posts written in /admin/writing (Supabase `writing` table)
 *   2. .mdx files in content/writing/ committed to the repo
 *
 * Database posts win on a slug collision. Both are plain MDX bodies compiled
 * at render time, so the two are interchangeable.
 */

const WRITING_DIR = path.join(process.cwd(), 'content', 'writing');

function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function toIso(value: unknown): string | undefined {
  if (!value) return undefined;
  const d = new Date(value as string);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

function listMdxFiles(): string[] {
  if (!fs.existsSync(WRITING_DIR)) return [];
  return fs.readdirSync(WRITING_DIR).filter((f) => f.endsWith('.mdx'));
}

function parseFile(filename: string): WritingPost {
  const slugFromFile = filename.replace(/\.mdx$/, '');
  const raw = fs.readFileSync(path.join(WRITING_DIR, filename), 'utf8');
  const { data, content } = matter(raw);

  return {
    id: slugFromFile,
    slug: (data.slug as string) ?? slugFromFile,
    title: (data.title as string) ?? slugFromFile,
    excerpt: (data.excerpt as string) ?? '',
    tags: (data.tags as string[]) ?? [],
    coverImage: (data.coverImage as string) ?? undefined,
    content,
    status: (data.status as WritingPost['status']) ?? 'published',
    readingMinutes:
      (data.readingMinutes as number) ?? estimateReadingMinutes(content),
    publishedAt: toIso(data.publishedAt),
    updatedAt: toIso(data.updatedAt),
    trending: Boolean(data.trending),
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */

function mapDbPost(r: any): WritingPost {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt ?? '',
    tags: r.tags ?? [],
    coverImage: r.cover_image ?? undefined,
    content: r.content ?? '',
    status: r.status ?? 'draft',
    readingMinutes: r.reading_minutes ?? estimateReadingMinutes(r.content ?? ''),
    publishedAt: toIso(r.published_at),
    updatedAt: toIso(r.updated_at),
    trending: Boolean(r.trending),
  };
}

/** Published posts from Supabase. Returns [] when unconfigured or on error. */
async function getDbPosts(): Promise<WritingPost[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await sb
      .from('writing')
      .select('*')
      .eq('status', 'published');
    if (error || !data) return [];
    return data.map(mapDbPost);
  } catch {
    return [];
  }
}

function sortByDate(posts: WritingPost[]): WritingPost[] {
  return posts.sort((a, b) => {
    const at = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bt = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bt - at;
  });
}

/** All published posts, newest first (trending posts are NOT pre-sorted here). */
export async function getWriting(): Promise<WritingPost[]> {
  const filePosts = listMdxFiles()
    .map(parseFile)
    .filter((p) => p.status === 'published');
  const dbPosts = await getDbPosts();

  const bySlug = new Map<string, WritingPost>();
  filePosts.forEach((p) => bySlug.set(p.slug, p));
  dbPosts.forEach((p) => bySlug.set(p.slug, p));

  return sortByDate(Array.from(bySlug.values()));
}

export async function getWritingBySlug(
  slug: string
): Promise<WritingPost | null> {
  const dbPost = (await getDbPosts()).find((p) => p.slug === slug);
  if (dbPost) return dbPost;

  const file = listMdxFiles().find((f) => f.replace(/\.mdx$/, '') === slug);
  if (!file) return null;
  const post = parseFile(file);
  return post.status === 'published' ? post : null;
}

/** File-backed slugs only — database posts render on demand. */
export function getAllWritingSlugs(): string[] {
  return listMdxFiles().map((f) => f.replace(/\.mdx$/, ''));
}

export async function getAllWritingTags(): Promise<string[]> {
  const posts = await getWriting();
  const tags = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

/** Posts sharing at least one tag with `post`, excluding itself. */
export async function getRelatedWriting(
  post: WritingPost,
  limit = 2
): Promise<WritingPost[]> {
  const posts = await getWriting();
  return posts
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, limit);
}
