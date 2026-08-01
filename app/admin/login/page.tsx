'use client';

import { useState, useTransition, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from '../actions';
import { IconLock } from '@/components/admin/icons';

function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const [show, setShow] = useState(false);
  const next = useSearchParams().get('next') ?? '/admin';

  return (
    <form
      className="admin-login-card"
      action={(fd) =>
        start(async () => {
          setError(null);
          const res = await signIn(fd);
          if (res?.error) setError(res.error);
        })
      }
    >
      <div className="admin-login-mark">
        <IconLock />
      </div>

      <p className="admin-login-kicker">Private access</p>
      <h1 className="admin-login-title">Unlock your panel</h1>
      <p className="admin-login-sub">
        One password protects every edit — Hero, Projects, Messages, and more.
        Nobody else can open this area.
      </p>

      <input type="hidden" name="next" value={next} />

      <div className="admin-field">
        <label className="admin-label" htmlFor="password">
          Password
        </label>
        <div className="admin-password-wrap">
          <input
            id="password"
            name="password"
            type={show ? 'text' : 'password'}
            required
            autoFocus
            className="admin-input"
            placeholder="Enter admin password"
            autoComplete="current-password"
          />
          <button
            type="button"
            className="admin-password-toggle"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      {error && (
        <div className="admin-alert admin-alert-error mb-4">
          <span>!</span>
          <span>{error}</span>
        </div>
      )}

      <button className="admin-btn admin-btn-block" disabled={pending}>
        {pending ? 'Checking…' : 'Enter control panel'}
      </button>

      <p className="admin-login-foot">
        Protected area · never indexed · change password in Settings after login
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="admin-login-wrap admin-body">
      <div className="admin-login-glow" aria-hidden />
      <div className="admin-login-grid" aria-hidden />
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
