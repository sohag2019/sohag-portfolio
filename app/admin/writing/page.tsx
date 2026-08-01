import Link from 'next/link';
import { adminDbOrNull } from '@/lib/admin-auth';
import { getAllWritingSlugs } from '@/lib/writing';
import { PageHead, SetupNotice } from '@/components/admin/PageHead';

function fmtDate(iso?: string) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export default async function WritingList() {
  const sb = await adminDbOrNull();
  const { data } = sb
    ? await sb.from('writing').select('*').order('published_at', { ascending: false })
    : { data: [] };
  const rows = data ?? [];
  const fileSlugs = getAllWritingSlugs();

  return (
    <div>
      <PageHead
        title="Writing"
        subtitle="Your blog — these posts power the “From the archive” section and the /writing page."
        action={
          <Link href="/admin/writing/new" className="admin-btn">
            + Write a post
          </Link>
        }
      />
      <SetupNotice />

      {rows.length > 0 ? (
        <div className="admin-list mb-8">
          {rows.map((p) => (
            <Link key={p.id} href={`/admin/writing/${p.id}`} className="admin-row">
              <span className="min-w-0 flex-1">
                <span className="admin-row-title block truncate">{p.title}</span>
                <span className="admin-row-sub block truncate">
                  {fmtDate(p.published_at)} · {p.reading_minutes} min read
                  {p.tags?.length ? ` · ${p.tags.join(', ')}` : ''}
                </span>
              </span>
              {p.trending && <span className="admin-badge admin-badge-new">Trending</span>}
              <span
                className={`admin-badge ${
                  p.status === 'published' ? 'admin-badge-live' : 'admin-badge-draft'
                }`}
              >
                {p.status === 'published' ? 'Live' : 'Draft'}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="admin-empty mb-8">
          <div className="admin-empty-icon">✎</div>
          <h2 className="admin-empty-title">No posts written here yet</h2>
          <p className="admin-empty-text">
            Write your first post and it goes live on /writing straight away — images,
            headings, code blocks and videos all supported.
          </p>
          <Link href="/admin/writing/new" className="admin-btn mt-5">
            + Write a post
          </Link>
        </div>
      )}

      {fileSlugs.length > 0 && (
        <section className="admin-card">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Posts shipped in the code</h2>
            <span className="admin-badge admin-badge-muted">read-only</span>
          </div>
          <p className="admin-card-hint mb-4">
            These live as .mdx files in <code>content/writing/</code> and show alongside
            the posts you write here. To retire one, delete its file — or republish it
            above using the same slug and your version wins.
          </p>
          <div className="admin-list">
            {fileSlugs.map((slug) => (
              <div key={slug} className="admin-row" style={{ cursor: 'default' }}>
                <span className="min-w-0 flex-1">
                  <span className="admin-row-sub font-mono block truncate">/writing/{slug}</span>
                </span>
                <Link
                  href={`/writing/${slug}`}
                  target="_blank"
                  className="admin-btn admin-btn-ghost admin-btn-sm"
                >
                  View ↗
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
