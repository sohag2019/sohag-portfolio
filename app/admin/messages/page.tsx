import Link from 'next/link';
import { adminDbOrNull } from '@/lib/admin-auth';
import { PageHead, SetupNotice } from '@/components/admin/PageHead';

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const statusBadge: Record<string, string> = {
  unread: 'admin-badge-new',
  replied: 'admin-badge-live',
  archived: 'admin-badge-muted',
};

export default async function MessagesPage() {
  const sb = await adminDbOrNull();
  const { data } = sb
    ? await sb.from('messages').select('*').order('created_at', { ascending: false })
    : { data: [] };
  const rows = data ?? [];

  const unread = rows.filter((m) => m.status === 'unread').length;
  const replied = rows.filter((m) => m.status === 'replied').length;

  return (
    <div>
      <PageHead
        title="Messages"
        subtitle="Everything sent through your contact form. Open one to read it and reply — the reply goes straight to their inbox."
      />
      <SetupNotice />

      {rows.length > 0 && (
        <div className="admin-stat-grid mb-7">
          <div className="admin-stat">
            <div className="admin-stat-value">{rows.length}</div>
            <div className="admin-stat-label">Total</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-value">{unread}</div>
            <div className="admin-stat-label">Unread</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-value">{replied}</div>
            <div className="admin-stat-label">Replied</div>
          </div>
        </div>
      )}

      {rows.length > 0 ? (
        <div className="admin-list">
          {rows.map((m) => (
            <Link
              key={m.id}
              href={`/admin/messages/${m.id}`}
              className={`admin-msg ${m.status === 'unread' ? 'admin-msg-unread' : ''}`}
            >
              <span className="admin-msg-avatar">
                {(m.name || m.email || '?').charAt(0).toUpperCase()}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="admin-row-title truncate">{m.name || 'Anonymous'}</span>
                  <span className="admin-row-sub truncate">{m.email}</span>
                </span>
                <span className="admin-msg-preview">{m.message}</span>
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <span className="admin-row-sub">{timeAgo(m.created_at)}</span>
                <span className={`admin-badge ${statusBadge[m.status] ?? ''}`}>{m.status}</span>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="admin-empty">
          <div className="admin-empty-icon">✱</div>
          <h2 className="admin-empty-title">Inbox is empty</h2>
          <p className="admin-empty-text">
            When someone fills in the contact form on your site, their message shows up
            here and you can reply without leaving the panel.
          </p>
        </div>
      )}
    </div>
  );
}
