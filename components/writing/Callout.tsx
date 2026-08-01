interface CalloutProps {
  type?: 'note' | 'tip' | 'warning';
  children: React.ReactNode;
}

const icons: Record<NonNullable<CalloutProps['type']>, string> = {
  note: '◎',
  tip: '✦',
  warning: '▲',
};

export default function Callout({ type = 'note', children }: CalloutProps) {
  return (
    <div className={`mdx-callout mdx-callout-${type}`}>
      <span className="mdx-callout-icon" aria-hidden="true">{icons[type]}</span>
      <div className="mdx-callout-body">{children}</div>
    </div>
  );
}
