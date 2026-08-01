/**
 * Admin authentication — a single password, no user accounts.
 *
 * Everything here is Edge-runtime safe (Web Crypto only, no Node APIs, no
 * Supabase import) because proxy.ts imports it to gate /admin on every request.
 */

export const ADMIN_COOKIE = 'admin_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/** Fallback password when ADMIN_PASSWORD isn't set. Change it from /admin/settings. */
export const DEFAULT_ADMIN_PASSWORD = '257000';

function sessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    DEFAULT_ADMIN_PASSWORD
  );
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function sha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  return toHex(await crypto.subtle.digest('SHA-256', data));
}

async function hmac(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(sessionSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(value)
  );
  return toHex(sig);
}

/** Hash used to store the password at rest (never store the plain value). */
export async function hashPassword(password: string): Promise<string> {
  return sha256(`admin:${password}`);
}

/** Length-constant-ish comparison to avoid leaking match position. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Signed, expiring token: "<expiresAt>.<hmac>". */
export async function createSessionToken(): Promise<string> {
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;
  return `${expiresAt}.${await hmac(String(expiresAt))}`;
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<boolean> {
  if (!token) return false;
  const [expiresAt, signature] = token.split('.');
  if (!expiresAt || !signature) return false;
  if (Number(expiresAt) < Date.now()) return false;
  return safeEqual(signature, await hmac(expiresAt));
}
