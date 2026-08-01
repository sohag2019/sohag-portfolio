import Link from 'next/link';
import { notFound } from 'next/navigation';
import { adminDbOrNull } from '@/lib/admin-auth';
import { markMessage, deleteMessage } from '../../actions';
import ReplyForm from '@/components/admin/ReplyForm';
import { PageHead } from '@/components/admin/PageHead';

export default async function MessageDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sb = await adminDbOrNull();
  if (!sb) notFound();

  const { data: message } = await sb
    .from('messages')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (!message) notFound();

  // Opening a message marks it read.
  if (message.status === 'unread') {
    await sb.from('messages').update({ status: 'read' }).eq('id', id);
    message.status = 'read';
  }

  const received = new Date(message.created_at).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div>
      <PageHead
        title={message.name || 'Anonymous'}
        subtitle={`${message.email} · ${received}`}
        action={
          <Link href="/admin/messages" className="admin-btn admin-btn-ghost">
            ← Inbox
          </Link>
        }
      />

      <div className="admin-card mb-4">
        <div className="admin-card-head">
          <h2 className="admin-card-title">Their message</h2>
          <span className="admin-badge ml-auto">{message.status}</span>
        </div>
        <div className="admin-quote">{message.message}</div>
      </div>

      {message.reply && (
        <div className="admin-card mb-4">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Your reply</h2>
            <span className="admin-badge admin-badge-live ml-auto">
              sent{' '}
              {message.replied_at
                ? new Date(message.replied_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })
                : ''}
            </span>
          </div>
          <div className="admin-quote" style={{ borderLeftColor: 'rgba(74,222,128,0.5)' }}>
            {message.reply}
          </div>
        </div>
      )}

      <ReplyForm
        id={message.id}
        to={message.email}
        toName={message.name}
        defaultSubject={`Re: your message${message.name ? `, ${message.name}` : ''}`}
      />

      <div className="flex gap-2 mt-5 flex-wrap">
        <form action={markMessage}>
          <input type="hidden" name="id" value={message.id} />
          <input
            type="hidden"
            name="status"
            value={message.status === 'archived' ? 'read' : 'archived'}
          />
          <button className="admin-btn admin-btn-ghost">
            {message.status === 'archived' ? 'Move back to inbox' : 'Archive'}
          </button>
        </form>
        <form action={markMessage}>
          <input type="hidden" name="id" value={message.id} />
          <input type="hidden" name="status" value="unread" />
          <button className="admin-btn admin-btn-ghost">Mark unread</button>
        </form>
        <form action={deleteMessage}>
          <input type="hidden" name="id" value={message.id} />
          <button className="admin-btn admin-btn-danger">Delete</button>
        </form>
      </div>
    </div>
  );
}
