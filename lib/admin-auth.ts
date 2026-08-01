import 'server-only';
import { cookies } from 'next/headers';
import { createSupabaseAdminClient } from './supabase/admin';
import {
  ADMIN_COOKIE,
  DEFAULT_ADMIN_PASSWORD,
  hashPassword,
  safeEqual,
  verifySessionToken,
} from './auth';

/**
 * Server-side half of the admin auth: password storage and the privileged DB
 * client. Writes use the service-role key (RLS bypass) because the admin is
 * authenticated by our own password session, not by a Supabase Auth user.
 */

/** True when the current request carries a valid admin session cookie. */
export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) throw new Error('Not authenticated.');
}

/**
 * Privileged Supabase client for admin reads (drafts included) and writes.
 * Throws when the service-role key is missing so the UI can surface setup steps.
 */
export async function adminDb() {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  if (!sb)
    throw new Error(
      'Supabase is not connected. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env, then run supabase/schema.sql.'
    );
  return sb;
}

/** Same client, but null instead of throwing — for pages that render a setup notice. */
export async function adminDbOrNull() {
  if (!(await isAdminAuthenticated())) return null;
  return createSupabaseAdminClient();
}

/** Stored password hash: DB override if present, otherwise env/default. */
export async function getPasswordHash(): Promise<string> {
  const sb = createSupabaseAdminClient();
  if (sb) {
    const { data } = await sb
      .from('admin_settings')
      .select('password_hash')
      .eq('id', 'singleton')
      .maybeSingle();
    if (data?.password_hash) return data.password_hash as string;
  }
  return hashPassword(process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD);
}

export async function verifyPassword(password: string): Promise<boolean> {
  return safeEqual(await hashPassword(password), await getPasswordHash());
}

/** Persists a new password. Requires Supabase (the env default can't be rewritten at runtime). */
export async function setPassword(password: string): Promise<void> {
  const sb = await adminDb();
  const { error } = await sb.from('admin_settings').upsert({
    id: 'singleton',
    password_hash: await hashPassword(password),
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
}
