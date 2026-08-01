'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { uploadImage } from '@/app/admin/actions';

export default function ImageUpload({
  name,
  label,
  hint,
  defaultValue = '',
}: {
  name: string;
  label: string;
  hint?: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [pending, start] = useTransition();

  const upload = (file: File) => {
    start(async () => {
      setError(null);
      const fd = new FormData();
      fd.append('file', file);
      const res = await uploadImage(fd);
      if (res.error) setError(res.error);
      else if (res.url) setUrl(res.url);
    });
  };

  return (
    <div className="admin-field">
      <label className="admin-label">{label}</label>
      {hint && <span className="admin-hint">{hint}</span>}
      <div className="flex gap-4 items-start">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) upload(file);
          }}
          className="relative shrink-0 rounded-xl overflow-hidden grid place-items-center"
          style={{
            width: 92,
            height: 92,
            border: `1px ${url ? 'solid' : 'dashed'} ${
              dragging ? 'rgba(96,165,250,0.6)' : 'var(--admin-line, rgba(255,255,255,0.12))'
            }`,
            background: dragging ? 'rgba(96,165,250,0.08)' : 'rgba(255,255,255,0.02)',
          }}
        >
          {url ? (
            <Image src={url} alt="preview" fill className="object-cover" unoptimized />
          ) : (
            <span style={{ fontSize: 11, color: 'var(--muted)', opacity: 0.55 }}>
              {dragging ? 'Drop' : 'No image'}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <input
            type="text"
            name={name}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="admin-input mb-2"
            placeholder="/images/… or https://…"
          />
          <div className="flex items-center gap-2 flex-wrap">
            <label className="admin-btn admin-btn-ghost admin-btn-sm cursor-pointer">
              {pending ? 'Uploading…' : 'Upload image'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={pending}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) upload(file);
                }}
              />
            </label>
            {url && (
              <button
                type="button"
                className="admin-btn admin-btn-ghost admin-btn-sm"
                onClick={() => setUrl('')}
              >
                Clear
              </button>
            )}
            <span style={{ fontSize: 11, color: 'var(--muted)', opacity: 0.5 }}>
              or drag &amp; drop
            </span>
          </div>
          {error && (
            <p className="mt-2 mb-0" style={{ fontSize: 11.5, color: '#fca5a5' }}>
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
