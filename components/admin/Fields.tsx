'use client';

import { useState } from 'react';

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="admin-field">
      <label className="admin-label" htmlFor={htmlFor}>
        {label}
      </label>
      {hint && <span className="admin-hint">{hint}</span>}
      {children}
    </div>
  );
}

export function TextField({
  name,
  label,
  hint,
  defaultValue = '',
  placeholder,
  type = 'text',
  required,
}: {
  name: string;
  label: string;
  hint?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <Field label={label} hint={hint} htmlFor={name}>
      <input
        id={name}
        name={name}
        type={type}
        className="admin-input"
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
      />
    </Field>
  );
}

export function TextArea({
  name,
  label,
  hint,
  defaultValue = '',
  placeholder,
  rows = 4,
  maxLength,
}: {
  name: string;
  label: string;
  hint?: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <Field label={label} hint={hint} htmlFor={name}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className="admin-textarea"
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => setValue(e.target.value)}
      />
      {maxLength && (
        <div
          className="text-right mt-1"
          style={{ fontSize: 11, color: 'var(--muted)', opacity: 0.5 }}
        >
          {value.length} / {maxLength}
        </div>
      )}
    </Field>
  );
}

export function Switch({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="admin-switch">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      <span className="admin-switch-track" />
      {label}
    </label>
  );
}

/**
 * Textarea for structured JSON fields with live validity feedback, so a typo
 * is caught here instead of silently falling back to an empty value on save.
 */
export function JsonField({
  name,
  label,
  hint,
  value,
  rows = 12,
}: {
  name: string;
  label: string;
  hint?: React.ReactNode;
  value: unknown;
  rows?: number;
}) {
  const [text, setText] = useState(() => JSON.stringify(value ?? [], null, 2));

  let error: string | null = null;
  try {
    JSON.parse(text);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Invalid JSON';
  }

  const format = () => {
    try {
      setText(JSON.stringify(JSON.parse(text), null, 2));
    } catch {
      /* leave as-is when it can't be parsed */
    }
  };

  return (
    <div className="admin-field">
      <div className="flex items-center justify-between gap-3 mb-[7px]">
        <label className="admin-label mb-0" htmlFor={name}>
          {label}
        </label>
        <div className="flex items-center gap-2">
          <span
            className="admin-badge"
            style={
              error
                ? { color: '#fca5a5', borderColor: 'rgba(239,68,68,0.35)' }
                : { color: '#86efac', borderColor: 'rgba(74,222,128,0.3)' }
            }
          >
            {error ? 'Invalid' : 'Valid'}
          </span>
          <button
            type="button"
            onClick={format}
            className="admin-btn admin-btn-ghost admin-btn-sm"
          >
            Tidy
          </button>
        </div>
      </div>
      {hint && <span className="admin-hint">{hint}</span>}
      <textarea
        id={name}
        name={name}
        rows={rows}
        className="admin-textarea admin-textarea-code"
        value={text}
        spellCheck={false}
        onChange={(e) => setText(e.target.value)}
      />
      {error && (
        <p className="mt-2 mb-0" style={{ fontSize: 11.5, color: '#fca5a5' }}>
          {error}
        </p>
      )}
    </div>
  );
}
