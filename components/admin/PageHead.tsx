import Link from 'next/link';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';

export function PageHead({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="admin-page-head">
      <div>
        <h1 className="admin-page-title">{title}</h1>
        {subtitle && <p className="admin-page-sub">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/**
 * Saving writes through the service-role key. Without it the forms still
 * render (pre-filled with what the live site shows) but nothing can persist,
 * so say so up front instead of failing on submit.
 */
export function SetupNotice() {
  if (isSupabaseAdminConfigured) return null;
  return (
    <div className="admin-alert admin-alert-warn mb-5">
      <span>⚠</span>
      <span>
        <strong>Database not connected — edits can&apos;t be saved yet.</strong>
        <br />
        Add <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code>,{' '}
        <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and{' '}
        <code className="font-mono text-xs">SUPABASE_SERVICE_ROLE_KEY</code> to your{' '}
        <code className="font-mono text-xs">.env</code>, then run{' '}
        <code className="font-mono text-xs">supabase/schema.sql</code> in the Supabase SQL
        editor. Until then the site runs on its built-in starter content.{' '}
        <Link href="/admin/settings" style={{ textDecoration: 'underline' }}>
          Setup guide
        </Link>
      </span>
    </div>
  );
}
