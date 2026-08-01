'use client';

import { useEffect, useState } from 'react';

export default function ShareBar({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      /* user cancelled or unsupported */
    }
  };

  const tweetHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="share-bar">
      <span className="share-label">Share</span>
      <button type="button" onClick={handleCopy} className="share-btn">
        {copied ? 'Copied ✓' : 'Copy link'}
      </button>
      <a href={tweetHref} target="_blank" rel="noopener noreferrer" className="share-btn">
        X
      </a>
      <a href={linkedinHref} target="_blank" rel="noopener noreferrer" className="share-btn">
        LinkedIn
      </a>
      {canNativeShare && (
        <button type="button" onClick={handleNativeShare} className="share-btn">
          Share…
        </button>
      )}
    </div>
  );
}
