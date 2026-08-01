'use client';

import { useRef, useState, useTransition } from 'react';
import { uploadImage } from '@/app/admin/actions';

/** Escapes first, so the preview can never execute markup from the editor. */
function renderPreview(md: string): string {
  const escaped = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return escaped
    .replace(/^```[\s\S]*?^```/gm, (m) => `<pre>${m.replace(/```/g, '')}</pre>`)
    .replace(/^### (.*)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*)$/gm, '<h1>$1</h1>')
    .replace(/^&gt; (.*)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^[-*] (.*)$/gm, '<li>$1</li>')
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    .replace(/\n{2,}/g, '</p><p>');
}

const snippets: [string, string, string][] = [
  ['H2', '\n## ', 'Heading'],
  ['B', '**', 'bold'],
  ['I', '*', 'italic'],
  ['Link', '[', 'text](https://)'],
  ['Code', '\n```ts\n', '\n```\n'],
  ['Quote', '\n> ', 'quote'],
  ['List', '\n- ', 'item'],
  ['Note', '\n<Callout type="tip">\n', '\n</Callout>\n'],
  ['YouTube', '\n<YouTube id="', '" />\n'],
];

export default function MarkdownEditor({
  name,
  defaultValue = '',
}: {
  name: string;
  defaultValue?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [preview, setPreview] = useState(false);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const words = value.trim().split(/\s+/).filter(Boolean).length;

  const insert = (before: string, after: string) => {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e } = el;
    const selected = value.slice(s, e);
    const next = `${value.slice(0, s)}${before}${selected}${after}${value.slice(e)}`;
    setValue(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + selected.length);
    });
  };

  const insertImage = (file: File) => {
    start(async () => {
      setError(null);
      const fd = new FormData();
      fd.append('file', file);
      const res = await uploadImage(fd);
      if (res.error) setError(res.error);
      else if (res.url) setValue((v) => `${v}\n\n![${file.name}](${res.url})\n`);
    });
  };

  return (
    <div>
      <div className="flex items-center gap-1.5 flex-wrap mb-3">
        {snippets.map(([label, before, after]) => (
          <button
            key={label}
            type="button"
            className="admin-btn admin-btn-ghost admin-btn-sm"
            onClick={() => insert(before, after)}
          >
            {label}
          </button>
        ))}

        <label className="admin-btn admin-btn-ghost admin-btn-sm cursor-pointer">
          {pending ? 'Uploading…' : 'Image'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={pending}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) insertImage(f);
            }}
          />
        </label>

        <button
          type="button"
          className={`admin-btn admin-btn-sm ${preview ? '' : 'admin-btn-ghost'} ml-auto`}
          onClick={() => setPreview((v) => !v)}
        >
          {preview ? 'Back to editing' : 'Preview'}
        </button>
      </div>

      {preview ? (
        <div
          className="mdx-content"
          style={{
            minHeight: 340,
            padding: '18px 20px',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.02)',
          }}
          dangerouslySetInnerHTML={{ __html: `<p>${renderPreview(value)}</p>` }}
        />
      ) : (
        <textarea
          ref={ref}
          name={name}
          rows={22}
          className="admin-textarea admin-textarea-code"
          value={value}
          spellCheck
          placeholder={'## Start here\n\nWrite in Markdown. Drop in images, code blocks and videos.'}
          onChange={(e) => setValue(e.target.value)}
        />
      )}

      {preview && <input type="hidden" name={name} value={value} />}

      <div
        className="flex items-center gap-4 mt-2"
        style={{ fontSize: 11.5, color: 'var(--muted)', opacity: 0.6 }}
      >
        <span>{words} words</span>
        <span>~{Math.max(1, Math.round(words / 200))} min read</span>
        <span className="ml-auto">
          Markdown + components: &lt;YouTube id=&quot;…&quot; /&gt;, &lt;Video src=&quot;…&quot;
          /&gt;, &lt;Callout type=&quot;tip&quot;&gt;
        </span>
      </div>

      {error && (
        <p className="mt-2 mb-0" style={{ fontSize: 11.5, color: '#fca5a5' }}>
          {error}
        </p>
      )}
    </div>
  );
}
