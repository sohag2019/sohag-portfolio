/**
 * GitHub integration — public REST API (no auth required for basic use).
 * A GITHUB_TOKEN raises rate limits. All fetches are cached via Next's
 * revalidate so the Overview strip and Stack ordering update without a redeploy.
 */

export const GITHUB_USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'sohagzayan';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

function ghHeaders(): HeadersInit {
  const h: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (GITHUB_TOKEN) (h as Record<string, string>).Authorization = `Bearer ${GITHUB_TOKEN}`;
  return h;
}

export interface LastCommit {
  repo: string;
  message: string;
  url: string;
  date: string;
  relative: string;
}

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  return `${months}mo ago`;
}

/** Latest public push event → repo + commit message. */
export async function getLastCommit(
  username = GITHUB_USERNAME
): Promise<LastCommit | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=30`,
      { headers: ghHeaders(), next: { revalidate: 900 } }
    );
    if (!res.ok) return null;
    const events: any[] = await res.json(); // eslint-disable-line @typescript-eslint/no-explicit-any
    const push = events.find(
      (e) => e.type === 'PushEvent' && e.payload?.commits?.length
    );
    if (!push) return null;
    const commit = push.payload.commits[push.payload.commits.length - 1];
    const repo: string = push.repo?.name ?? '';
    return {
      repo: repo.split('/').pop() ?? repo,
      message: commit.message.split('\n')[0],
      url: `https://github.com/${repo}/commit/${commit.sha}`,
      date: push.created_at,
      relative: relativeTime(push.created_at),
    };
  } catch {
    return null;
  }
}

export interface GitHubProfile {
  publicRepos: number;
  followers: number;
  following: number;
}

export async function getProfile(
  username = GITHUB_USERNAME
): Promise<GitHubProfile | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: ghHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const d = await res.json();
    return {
      publicRepos: d.public_repos ?? 0,
      followers: d.followers ?? 0,
      following: d.following ?? 0,
    };
  } catch {
    return null;
  }
}

export interface LanguageAgg {
  name: string;
  bytes: number;
  percent: number;
}

/**
 * Aggregate language bytes across the user's most recently pushed repos.
 * This drives the "derived not asserted" ordering in the Stack section.
 */
export async function getLanguageStats(
  username = GITHUB_USERNAME,
  maxRepos = 20
): Promise<LanguageAgg[]> {
  try {
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=${maxRepos}&sort=pushed`,
      { headers: ghHeaders(), next: { revalidate: 86400 } }
    );
    if (!reposRes.ok) return [];
    const repos: any[] = await reposRes.json(); // eslint-disable-line @typescript-eslint/no-explicit-any
    const totals = new Map<string, number>();

    await Promise.all(
      repos
        .filter((r) => !r.fork)
        .map(async (r) => {
          try {
            const lr = await fetch(r.languages_url, {
              headers: ghHeaders(),
              next: { revalidate: 86400 },
            });
            if (!lr.ok) return;
            const langs: Record<string, number> = await lr.json();
            for (const [lang, bytes] of Object.entries(langs)) {
              totals.set(lang, (totals.get(lang) ?? 0) + bytes);
            }
          } catch {
            /* skip repo on error */
          }
        })
    );

    const grand = Array.from(totals.values()).reduce((a, b) => a + b, 0) || 1;
    return Array.from(totals.entries())
      .map(([name, bytes]) => ({
        name,
        bytes,
        percent: Math.round((bytes / grand) * 100),
      }))
      .sort((a, b) => b.bytes - a.bytes);
  } catch {
    return [];
  }
}
