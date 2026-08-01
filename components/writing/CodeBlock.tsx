'use client';

import { useRef, useState } from 'react';

/** Overrides the `pre` tag rehype-pretty-code renders code blocks into, adding a copy button. */
export default function CodeBlock(props: React.ComponentPropsWithoutRef<'pre'>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = preRef.current?.textContent ?? '';
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="mdx-code-block">
      <button
        type="button"
        onClick={handleCopy}
        className="mdx-code-copy"
        aria-label="Copy code to clipboard"
      >
        {copied ? 'Copied ✓' : 'Copy'}
      </button>
      <pre ref={preRef} {...props} />
    </div>
  );
}
