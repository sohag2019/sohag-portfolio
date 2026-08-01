'use client';

import { useState, useTransition } from 'react';
import { replyToMessage } from '@/app/admin/actions';

export default function ReplyForm({
  id,
  to,
  toName,
  defaultSubject,
}: {
  id: string;
  to: string;
  toName?: string;
  defaultSubject: string;
}) {
  const [result, setResult] = useState<{ error?: string; success?: string }>({});
  const [body, setBody] = useState('');
  const [pending, start] = useTransition();

  return (
    <form
      className="admin-card"
      action={(fd) =>
        start(async () => {
          setResult({});
          const res = await replyToMessage(fd);
          setResult(res ?? {});
          if (res?.success) setBody('');
        })
      }
    >
      <div className="admin-card-head">
        <h2 className="admin-card-title">Reply</h2>
        <span className="admin-card-hint ml-auto">Sends to {to}</span>
      </div>

      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="to" value={to} />
      <input type="hidden" name="to_name" value={toName ?? ''} />

      <div className="admin-field">
        <label className="admin-label" htmlFor="subject">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          className="admin-input"
          defaultValue={defaultSubject}
        />
      </div>

      <div className="admin-field">
        <label className="admin-label" htmlFor="body">
          Message
        </label>
        <textarea
          id="body"
          name="body"
          rows={7}
          className="admin-textarea"
          value={body}
          placeholder={`Hi ${toName || 'there'},`}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      {result.error && (
        <div className="admin-alert admin-alert-error mb-4">
          <span>⚠</span>
          <span>{result.error}</span>
        </div>
      )}
      {result.success && (
        <div className="admin-alert admin-alert-success mb-4">
          <span>✓</span>
          <span>{result.success}</span>
        </div>
      )}

      <button className="admin-btn" disabled={pending || !body.trim()}>
        {pending ? 'Sending…' : 'Send reply'}
      </button>
    </form>
  );
}
