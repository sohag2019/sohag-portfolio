import Link from 'next/link';
import { adminDbOrNull } from '@/lib/admin-auth';
import { PageHead, SetupNotice } from '@/components/admin/PageHead';

const levelBadge: Record<string, string> = {
  expert: 'admin-badge-live',
  comfortable: 'admin-badge-new',
  learning: 'admin-badge-draft',
};

export default async function StackList() {
  const sb = await adminDbOrNull();
  const { data } = sb
    ? await sb.from('stack_stats').select('*').order('count', { ascending: false })
    : { data: [] };
  const rows = data ?? [];

  return (
    <div>
      <PageHead
        title="My Stack"
        subtitle="The technologies in your Stack section, with the level and usage bar shown for each."
        action={
          <Link href="/admin/stack/new" className="admin-btn">
            + Add technology
          </Link>
        }
      />
      <SetupNotice />

      {rows.length > 0 ? (
        <div className="admin-list">
          {rows.map((s) => (
            <Link
              key={s.name}
              href={`/admin/stack/${encodeURIComponent(s.name)}`}
              className="admin-row"
            >
              <span className="min-w-0 flex-1">
                <span className="admin-row-title block truncate">{s.name}</span>
                <span className="admin-row-sub block truncate">
                  {s.category} · {s.count} uses
                </span>
              </span>
              <span
                className="hidden sm:block h-1.5 rounded-full overflow-hidden"
                style={{ width: 110, background: 'rgba(255,255,255,0.08)' }}
              >
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${Math.min(100, s.percent ?? 0)}%`,
                    background: 'linear-gradient(90deg,#60a5fa,#a78bfa)',
                  }}
                />
              </span>
              <span className={`admin-badge ${levelBadge[s.level] ?? 'admin-badge-muted'}`}>
                {s.level}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="admin-empty">
          <div className="admin-empty-icon">⬢</div>
          <h2 className="admin-empty-title">No technologies yet</h2>
          <p className="admin-empty-text">
            Add the tools you work with — each one becomes a card in your Stack section.
          </p>
          <Link href="/admin/stack/new" className="admin-btn mt-5">
            + Add technology
          </Link>
        </div>
      )}
    </div>
  );
}
