'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, SESSION_MAX_AGE, createSessionToken } from '@/lib/auth';
import {
  adminDb,
  isAdminAuthenticated,
  setPassword,
  verifyPassword,
} from '@/lib/admin-auth';
import { sendMail } from '@/lib/email';

function revalidateAll() {
  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/writing');
}

// ── Parsing helpers ──
function list(v: FormDataEntryValue | null): string[] {
  if (!v) return [];
  return String(v)
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function lines(v: FormDataEntryValue | null): string[] {
  if (!v) return [];
  return String(v)
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

function json<T>(v: FormDataEntryValue | null, fallback: T): T {
  if (!v || !String(v).trim()) return fallback;
  try {
    return JSON.parse(String(v)) as T;
  } catch {
    return fallback;
  }
}

function bool(v: FormDataEntryValue | null): boolean {
  return v === 'on' || v === 'true' || v === '1';
}

function num(v: FormDataEntryValue | null, d = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
}

function str(fd: FormData, key: string, d = ''): string {
  const v = fd.get(key);
  return v === null ? d : String(v);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ── Auth ──
export async function signIn(formData: FormData) {
  const password = str(formData, 'password');
  if (!password) return { error: 'Enter your password.' };
  if (!(await verifyPassword(password))) return { error: 'Wrong password.' };

  const store = await cookies();
  store.set(ADMIN_COOKIE, await createSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });

  const next = str(formData, 'next');
  redirect(next.startsWith('/admin') ? next : '/admin');
}

export async function signOut() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect('/admin/login');
}

export async function changePassword(formData: FormData) {
  if (!(await isAdminAuthenticated())) return { error: 'Not authenticated.' };

  const current = str(formData, 'current_password');
  const next = str(formData, 'new_password');
  const confirm = str(formData, 'confirm_password');

  if (!(await verifyPassword(current))) return { error: 'Current password is wrong.' };
  if (next.length < 6) return { error: 'New password must be at least 6 characters.' };
  if (next !== confirm) return { error: 'New passwords do not match.' };

  try {
    await setPassword(next);
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Could not save password.' };
  }
  return { success: 'Password updated.' };
}

// ── Status ──
export async function saveStatus(formData: FormData) {
  const sb = await adminDb();
  const { error } = await sb.from('status').upsert({
    id: 'singleton',
    currently_building: str(formData, 'currently_building'),
    availability: str(formData, 'availability', 'available'),
    how_i_work: str(formData, 'how_i_work'),
    location: str(formData, 'location', 'Dhaka'),
    timezone: str(formData, 'timezone', 'Asia/Dhaka'),
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
  revalidateAll();
}

// ── Hero ──
export async function saveHero(formData: FormData) {
  const sb = await adminDb();
  const { error } = await sb.from('hero').upsert({
    id: 'singleton',
    name: str(formData, 'name'),
    role_title: str(formData, 'role_title'),
    badge_text: str(formData, 'badge_text'),
    heading_lines: json(formData.get('heading_lines'), []),
    description: str(formData, 'description'),
    tech_pills: list(formData.get('tech_pills')),
    stats: json(formData.get('stats'), []),
    profile_image: str(formData, 'profile_image'),
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
  revalidateAll();
}

// ── Currently ──
export async function saveCurrently(formData: FormData) {
  const sb = await adminDb();
  const { error } = await sb.from('currently').upsert({
    id: 'singleton',
    updated_label: str(formData, 'updated_label'),
    ticker_logs: lines(formData.get('ticker_logs')),
    cards: json(formData.get('cards'), []),
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
  revalidateAll();
}

// ── Contact ──
export async function saveContact(formData: FormData) {
  const sb = await adminDb();
  const { error } = await sb.from('contact').upsert({
    id: 'singleton',
    heading: str(formData, 'heading'),
    subheading: str(formData, 'subheading'),
    cta_heading: str(formData, 'cta_heading'),
    cta_subheading: str(formData, 'cta_subheading'),
    email: str(formData, 'email'),
    resume_url: str(formData, 'resume_url'),
    social_links: json(formData.get('social_links'), []),
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
  revalidateAll();
}

// ── Work ──
export async function saveWork(formData: FormData) {
  const sb = await adminDb();
  const id = str(formData, 'id').trim();
  const row = {
    company: str(formData, 'company'),
    role: str(formData, 'role'),
    timeframe: str(formData, 'timeframe'),
    duration: str(formData, 'duration'),
    location: str(formData, 'location'),
    work_mode: str(formData, 'work_mode'),
    color: str(formData, 'color', '#3b82f6'),
    is_current: bool(formData.get('is_current')),
    context: str(formData, 'context'),
    constraint: str(formData, 'constraint'),
    decision: str(formData, 'decision'),
    tradeoff: str(formData, 'tradeoff'),
    result: str(formData, 'result'),
    highlights: lines(formData.get('highlights')),
    skills: list(formData.get('skills')),
    link_label: str(formData, 'link_label'),
    link_href: str(formData, 'link_href'),
    sort_order: num(formData.get('sort_order')),
    published: bool(formData.get('published')),
    updated_at: new Date().toISOString(),
  };
  const { error } = id
    ? await sb.from('work').update(row).eq('id', id)
    : await sb.from('work').insert(row);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect('/admin/work');
}

export async function deleteWork(formData: FormData) {
  const sb = await adminDb();
  await sb.from('work').delete().eq('id', str(formData, 'id'));
  revalidateAll();
  redirect('/admin/work');
}

// ── Projects ──
export async function saveProject(formData: FormData) {
  const sb = await adminDb();
  const id = str(formData, 'id').trim();
  const title = str(formData, 'title');
  const row = {
    slug: slugify(str(formData, 'slug') || title),
    title,
    description: str(formData, 'description'),
    long_desc: str(formData, 'long_desc'),
    contribution: str(formData, 'contribution'),
    tags: list(formData.get('tags')),
    category: str(formData, 'category', 'Web'),
    github: str(formData, 'github'),
    live: str(formData, 'live'),
    color: str(formData, 'color', '#3b82f6'),
    cover: str(formData, 'cover', '/images/hero_section.png'),
    decision_log: json(formData.get('decision_log'), []),
    features: json(formData.get('features'), []),
    stats: json(formData.get('stats'), []),
    sort_order: num(formData.get('sort_order')),
    published: bool(formData.get('published')),
    updated_at: new Date().toISOString(),
  };
  const { error } = id
    ? await sb.from('projects').update(row).eq('id', id)
    : await sb.from('projects').insert(row);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect('/admin/projects');
}

export async function deleteProject(formData: FormData) {
  const sb = await adminDb();
  await sb.from('projects').delete().eq('id', str(formData, 'id'));
  revalidateAll();
  redirect('/admin/projects');
}

// ── Stack ──
export async function saveStack(formData: FormData) {
  const sb = await adminDb();
  const originalName = str(formData, 'original_name').trim();
  const row = {
    name: str(formData, 'name').trim(),
    category: str(formData, 'category', 'Frontend'),
    icon: str(formData, 'icon'),
    invert: bool(formData.get('invert')),
    count: num(formData.get('count')),
    percent: num(formData.get('percent')),
    level: str(formData, 'level', 'comfortable'),
    projects: list(formData.get('projects')),
    sparkline: json(formData.get('sparkline'), [] as number[]),
    updated_at: new Date().toISOString(),
  };
  // `name` is the primary key, so a rename is a delete + insert.
  if (originalName && originalName !== row.name) {
    await sb.from('stack_stats').delete().eq('name', originalName);
  }
  const { error } = await sb.from('stack_stats').upsert(row);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect('/admin/stack');
}

export async function deleteStack(formData: FormData) {
  const sb = await adminDb();
  await sb.from('stack_stats').delete().eq('name', str(formData, 'name'));
  revalidateAll();
  redirect('/admin/stack');
}

// ── Writing ──
export async function saveWriting(formData: FormData) {
  const sb = await adminDb();
  const id = str(formData, 'id').trim();
  const title = str(formData, 'title');
  const content = str(formData, 'content');
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const publishedAt = str(formData, 'published_at');

  const row = {
    slug: slugify(str(formData, 'slug') || title),
    title,
    excerpt: str(formData, 'excerpt'),
    tags: list(formData.get('tags')),
    cover_image: str(formData, 'cover_image'),
    content,
    status: str(formData, 'status', 'draft'),
    reading_minutes: Math.max(1, Math.round(words / 200)),
    trending: bool(formData.get('trending')),
    published_at: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const { error } = id
    ? await sb.from('writing').update(row).eq('id', id)
    : await sb.from('writing').insert(row);
  if (error) throw new Error(error.message);
  revalidateAll();
  revalidatePath(`/writing/${row.slug}`);
  redirect('/admin/writing');
}

export async function deleteWriting(formData: FormData) {
  const sb = await adminDb();
  await sb.from('writing').delete().eq('id', str(formData, 'id'));
  revalidateAll();
  redirect('/admin/writing');
}

// ── Messages ──
export async function markMessage(formData: FormData) {
  const sb = await adminDb();
  await sb
    .from('messages')
    .update({ status: str(formData, 'status', 'read') })
    .eq('id', str(formData, 'id'));
  revalidatePath('/admin/messages');
  revalidatePath(`/admin/messages/${str(formData, 'id')}`);
}

export async function deleteMessage(formData: FormData) {
  const sb = await adminDb();
  await sb.from('messages').delete().eq('id', str(formData, 'id'));
  revalidatePath('/admin/messages');
  redirect('/admin/messages');
}

export async function replyToMessage(formData: FormData) {
  const sb = await adminDb();
  const id = str(formData, 'id');
  const to = str(formData, 'to');
  const subject = str(formData, 'subject', 'Re: your message');
  const body = str(formData, 'body');

  if (!body.trim()) return { error: 'Write a reply first.' };

  const sent = await sendMail({
    to,
    toName: str(formData, 'to_name'),
    subject,
    text: body,
    html: body.replace(/\n/g, '<br>'),
  });
  if (!sent.ok) return { error: sent.error ?? 'Could not send the reply.' };

  const { error } = await sb
    .from('messages')
    .update({
      status: 'replied',
      reply: body,
      replied_at: new Date().toISOString(),
    })
    .eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/admin/messages');
  revalidatePath(`/admin/messages/${id}`);
  return { success: 'Reply sent.' };
}

// ── Image upload (Supabase Storage → public URL) ──
export async function uploadImage(
  formData: FormData
): Promise<{ url?: string; error?: string }> {
  let sb;
  try {
    sb = await adminDb();
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Not authenticated.' };
  }
  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0)
    return { error: 'No file provided.' };
  const ext = file.name.split('.').pop() ?? 'png';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await sb.storage
    .from('media')
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { error: error.message };
  const { data } = sb.storage.from('media').getPublicUrl(path);
  return { url: data.publicUrl };
}
