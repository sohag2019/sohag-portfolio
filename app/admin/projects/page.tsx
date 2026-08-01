import Link from 'next/link';
import { adminDbOrNull } from '@/lib/admin-auth';
import { PageHead, SetupNotice } from '@/components/admin/PageHead';

export default async function ProjectsList() {
  const sb = await adminDbOrNull();
  const { data } = sb
    ? await sb.from('projects').select('*').order('sort_order')
    : { data: [] };
  const rows = data ?? [];

  return (
    <div>
      <PageHead
        title="Featured Projects"
        subtitle="Case studies shown on the homepage and at /projects/…"
        action={
          <Link href="/admin/projects/new" className="admin-btn">
            + Add project
          </Link>
        }
      />
      <SetupNotice />

      {rows.length > 0 ? (
        <div className="admin-list">
          {rows.map((p) => (
            <Link key={p.id} href={`/admin/projects/${p.id}`} className="admin-row">
              <span className="admin-row-dot" style={{ background: p.color || '#3b82f6' }} />
              <span className="min-w-0 flex-1">
                <span className="admin-row-title block truncate">{p.title}</span>
                <span className="admin-row-sub block truncate font-mono">/projects/{p.slug}</span>
              </span>
              <span className="admin-badge admin-badge-muted">{p.category}</span>
              <span className={`admin-badge ${p.published ? 'admin-badge-live' : 'admin-badge-draft'}`}>
                {p.published ? 'Live' : 'Draft'}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="admin-empty">
          <div className="admin-empty-icon">⬡</div>
          <h2 className="admin-empty-title">No projects yet</h2>
          <p className="admin-empty-text">
            Add a project to fill the Featured Projects section with your work.
          </p>
          <Link href="/admin/projects/new" className="admin-btn mt-5">
            + Add project
          </Link>
        </div>
      )}
    </div>
  );
}
