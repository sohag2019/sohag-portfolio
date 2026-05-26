'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/sohagdev',
    display: 'github.com/sohagdev',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sohagdev',
    display: 'linkedin.com/in/sohagdev',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Discord',
    href: 'https://discord.com/users/sohagdev',
    display: 'sohagdev',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 17H7A5 5 0 0 1 7 7h2" />
        <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
        <line x1="8" x2="16" y1="12" y2="12" />
      </svg>
    ),
  },
];

type FormatAction = 'bold' | 'italic' | 'underline' | 'link';

function RichEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);

  const applyFormat = useCallback((action: FormatAction) => {
    if (action === 'link') {
      const url = prompt('Enter URL:');
      if (url) document.execCommand('createLink', false, url);
    } else {
      document.execCommand(action);
    }
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  return (
    <div>
      {/* Toolbar */}
      <div
        className="flex items-center gap-1 px-3 py-2 rounded-t-lg"
        style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--hair)' }}
      >
        {[
          { action: 'bold' as FormatAction, icon: 'B', style: 'font-bold' },
          { action: 'italic' as FormatAction, icon: 'I', style: 'italic' },
          { action: 'underline' as FormatAction, icon: 'U', style: 'underline' },
        ].map((btn) => (
          <button
            key={btn.action}
            type="button"
            onClick={() => applyFormat(btn.action)}
            className={`w-7 h-7 flex items-center justify-center rounded text-xs cursor-pointer transition-all duration-200 ${btn.style}`}
            style={{ background: 'transparent', border: '1px solid transparent', color: 'var(--muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--fg)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; }}
          >
            {btn.icon}
          </button>
        ))}
        <div className="w-px h-4 mx-1" style={{ background: 'var(--hair)' }} />
        <button
          type="button"
          onClick={() => applyFormat('link')}
          className="w-7 h-7 flex items-center justify-center rounded text-xs cursor-pointer transition-all duration-200"
          style={{ background: 'transparent', border: '1px solid transparent', color: 'var(--muted)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--fg)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; }}
        >
          🔗
        </button>
        <span className="ml-auto text-[10px] font-mono" style={{ color: 'var(--muted)', opacity: 0.3 }}>Rich Text</span>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        className="w-full px-4 py-3 text-sm outline-none contact-editor"
        style={{
          background: 'rgba(255,255,255,0.03)',
          color: 'var(--fg)',
          minHeight: 120,
          lineHeight: 1.7,
        }}
        onInput={() => {
          if (editorRef.current) onChange(editorRef.current.innerHTML);
        }}
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-32 pb-32 relative z-10">
      <motion.div
        className="w-full max-w-6xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-14 text-center">
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter"
            style={{ color: 'var(--fg)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-medium"
            style={{ color: 'var(--muted)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Let&apos;s build something great together. Always open to new opportunities and collaborations.
          </motion.p>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: CTA + Social links */}
          <motion.div
            className="text-left space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter" style={{ color: 'var(--fg)' }}>
              Let&apos;s build{' '}
              <span style={{ color: '#3b82f6', textShadow: '0 0 30px rgba(59,130,246,0.3)' }}>better</span>{' '}
              products.
            </h3>
            <p className="text-lg md:text-xl font-medium max-w-md leading-relaxed" style={{ color: 'var(--muted)' }}>
              Open for interesting opportunities or just a meaningful chat.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:sohag@example.com"
                className="contact-btn-primary px-6 py-3.5 rounded-full font-black text-base flex items-center gap-2"
                style={{ background: 'var(--fg)', color: 'var(--bg)' }}
              >
                Start a Conversation
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn-outline inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-black text-base"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'var(--fg)' }}
              >
                Resume
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 7h10v10" /><path d="M7 17 17 7" />
                </svg>
              </a>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3 pt-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-card group flex items-center gap-4 p-4 rounded-2xl w-full"
                  style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  whileHover={{ borderColor: 'rgba(59,130,246,0.3)', background: 'rgba(255,255,255,0.04)' }}
                >
                  <div
                    className="p-2.5 rounded-xl transition-transform duration-500 group-hover:scale-110"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <span className="transition-colors duration-300" style={{ color: 'var(--muted)' }}>
                      {link.icon}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col items-start text-left">
                    <span className="font-black uppercase tracking-widest text-[10px] mb-0.5" style={{ color: 'var(--muted)' }}>
                      {link.label}
                    </span>
                    <span className="text-sm font-bold transition-colors duration-300 group-hover:!text-[#3b82f6]" style={{ color: 'var(--fg)' }}>
                      {link.display}
                    </span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: 'var(--fg)' }}>
                    <path d="M7 7h10v10" /><path d="M7 17 17 7" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Email form */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
            >
              {/* Form header */}
              <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                </div>
                <span className="font-mono text-[11px] tracking-wide" style={{ color: 'var(--muted)', opacity: 0.5 }}>
                  Send a message
                </span>
              </div>

              <div className="p-6 flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--muted)', opacity: 0.5 }}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 contact-input"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--fg)' }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--muted)', opacity: 0.5 }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 contact-input"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--fg)' }}
                  />
                </div>

                {/* Message with rich text editor */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--muted)', opacity: 0.5 }}>
                    Message
                  </label>
                  <div className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                    <RichEditor value={message} onChange={setMessage} />
                  </div>
                </div>

                {/* Send button */}
                <motion.button
                  onClick={handleSend}
                  disabled={sending || !name.trim() || !email.trim() || !message.trim()}
                  className="w-full py-3.5 rounded-full text-sm font-black uppercase tracking-widest cursor-pointer transition-all duration-300 mt-2 contact-send-btn"
                  style={{
                    background: sent ? '#4ade80' : '#3b82f6',
                    color: '#000',
                    border: 'none',
                    opacity: (sending || !name.trim() || !email.trim() || !message.trim()) && !sent ? 0.5 : 1,
                  }}
                  whileHover={!sending ? { y: -2, boxShadow: '0 8px 24px rgba(59,130,246,0.3)' } : {}}
                  whileTap={!sending ? { scale: 0.98 } : {}}
                >
                  {sent ? '✓ Message Sent!' : sending ? 'Sending...' : 'Send Message'}
                </motion.button>

                <p className="text-[11px] text-center" style={{ color: 'var(--muted)', opacity: 0.3 }}>
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
