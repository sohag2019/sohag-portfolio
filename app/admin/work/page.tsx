import Link from 'next/link';
import { adminDbOrNull } from '@/lib/admin-auth';
import { PageHead, SetupNotice } from '@/components/admin/PageHead';

export default async function WorkList() {
  const sb = await adminDbOrNull();
  const { data } = sb
    ? await sb.from('work').select('*').order('sort_order')
    : { data: [] };
  const rows = data ?? [];

  return (
    <div>
      <PageHead
        title="Experience"
        subtitle="Your roles and timeline, shown in the Experience section of the homepage."
        action={
          <Link href="/admin/work/new" className="admin-btn">
            + Add role
          </Link>
        }
      />
      <SetupNotice />

      {rows.length > 0 ? (
        <div className="admin-list">
          {rows.map((w) => (
            <Link key={w.id} href={`/admin/work/${w.id}`} className="admin-row">
              <span className="admin-row-dot" style={{ background: w.color || '#3b82f6' }} />
              <span className="min-w-0 flex-1">
                <span className="admin-row-title block truncate">
                  {w.role} · {w.company}
                </span>
                <span className="admin-row-sub block truncate">{w.timeframe}</span>
              </span>
              {w.is_current && <span className="admin-badge admin-badge-new">Current</span>}
              <span className={`admin-badge ${w.published ? 'admin-badge-live' : 'admin-badge-draft'}`}>
                {w.published ? 'Live' : 'Draft'}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="admin-empty">
          <div className="admin-empty-icon">❖</div>
          <h2 className="admin-empty-title">No roles yet</h2>
          <p className="admin-empty-text">
            Add your first role and it will appear in the Experience timeline on your
            homepage.
          </p>
          <Link href="/admin/work/new" className="admin-btn mt-5">
            + Add role
          </Link>
        </div>
      )}
    </div>
  );
}
