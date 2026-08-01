'use client';

import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

/**
 * Form footer for admin saves: submit button with pending state and a
 * "saved" toast once the server action resolves. Sits at the bottom of the form.
 */
export default function SaveBar({
  label = 'Save changes',
  note,
}: {
  label?: string;
  note?: string;
}) {
  const { pending } = useFormStatus();
  const [wasPending, setWasPending] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (pending) {
      setWasPending(true);
      return;
    }
    if (wasPending) {
      setWasPending(false);
      setSaved(true);
      const t = setTimeout(() => setSaved(false), 2600);
      return () => clearTimeout(t);
    }
  }, [pending, wasPending]);

  return (
    <>
      <div className="admin-savebar">
        <button type="submit" className="admin-btn" disabled={pending}>
          {pending ? 'Saving…' : label}
        </button>
        <span className="admin-savebar-note">
          {note ?? 'Changes appear on the live site immediately.'}
        </span>
      </div>
      {saved && (
        <div className="admin-toast">
          <span>✓</span> Saved
        </div>
      )}
    </>
  );
}
