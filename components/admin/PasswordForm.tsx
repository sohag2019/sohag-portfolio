'use client';

import { useRef, useState, useTransition } from 'react';
import { changePassword } from '@/app/admin/actions';

export default function PasswordForm({ canSave }: { canSave: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [result, setResult] = useState<{ error?: string; success?: string }>({});
  const [pending, start] = useTransition();

  return (
    <form
      ref={formRef}
      action={(fd) =>
        start(async () => {
          setResult({});
          const res = await changePassword(fd);
          setResult(res ?? {});
          if (res?.success) formRef.current?.reset();
        })
      }
    >
      <p className="admin-hint mb-4">
        This is the password for <code className="font-mono">/admin</code>. Sessions last
        7 days on the devices you sign in from.
      </p>

      <div className="admin-field">
        <label className="admin-label" htmlFor="current_password">
          Current password
        </label>
        <input
          id="current_password"
          name="current_password"
          type="password"
          className="admin-input"
          autoComplete="current-password"
          required
        />
      </div>

      <div className="admin-grid-2">
        <div className="admin-field">
          <label className="admin-label" htmlFor="new_password">
            New password
          </label>
          <input
            id="new_password"
            name="new_password"
            type="password"
            className="admin-input"
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="confirm_password">
            Confirm new password
          </label>
          <input
            id="confirm_password"
            name="confirm_password"
            type="password"
            className="admin-input"
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>
      </div>

      {!canSave && (
        <div className="admin-alert admin-alert-warn mb-4">
          <span>⚠</span>
          <span>
            Connect the database below first — the new password needs somewhere to live.
            Until then, set <code className="font-mono text-xs">ADMIN_PASSWORD</code> in
            your <code className="font-mono text-xs">.env</code> to change it.
          </span>
        </div>
      )}

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

      <button className="admin-btn" disabled={pending}>
        {pending ? 'Updating…' : 'Update password'}
      </button>
    </form>
  );
}
