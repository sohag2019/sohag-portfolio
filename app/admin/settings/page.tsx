import { isSupabaseAdminConfigured, isSupabaseConfigured } from '@/lib/supabase/config';
import PasswordForm from '@/components/admin/PasswordForm';
import { PageHead } from '@/components/admin/PageHead';

function Check({ ok, label, note }: { ok: boolean; label: string; note: string }) {
  return (
    <div className="admin-row" style={{ cursor: 'default' }}>
      <span
        className="admin-row-dot"
        style={{ background: ok ? '#4ade80' : '#fbbf24' }}
      />
      <span className="min-w-0 flex-1">
        <span className="admin-row-title block">{label}</span>
        <span className="admin-row-sub block">{note}</span>
      </span>
      <span className={`admin-badge ${ok ? 'admin-badge-live' : 'admin-badge-draft'}`}>
        {ok ? 'Connected' : 'Missing'}
      </span>
    </div>
  );
}

export default function SettingsPage() {
  const emailReady = Boolean(
    process.env.BREVO_API_KEY &&
      process.env.BREVO_SENDER_EMAIL &&
      process.env.BREVO_SENDER_NAME
  );

  return (
    <div>
      <PageHead
        title="Settings"
        subtitle="Your admin password and the services this panel depends on."
      />

      <div className="admin-card mb-4">
        <div className="admin-card-head">
          <h2 className="admin-card-title">Change password</h2>
        </div>
        <PasswordForm canSave={isSupabaseAdminConfigured} />
      </div>

      <div className="admin-card">
        <div className="admin-card-head">
          <h2 className="admin-card-title">Services</h2>
        </div>

        <div className="admin-list mb-5">
          <Check
            ok={isSupabaseConfigured}
            label="Database (read)"
            note="NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY — lets the public site read your content."
          />
          <Check
            ok={isSupabaseAdminConfigured}
            label="Database (write)"
            note="SUPABASE_SERVICE_ROLE_KEY — lets this panel save changes and store messages."
          />
          <Check
            ok={emailReady}
            label="Email"
            note="BREVO_API_KEY + BREVO_SENDER_EMAIL + BREVO_SENDER_NAME — needed to send replies from the inbox."
          />
        </div>

        {!isSupabaseAdminConfigured && (
          <div className="admin-alert admin-alert-warn">
            <span>⚠</span>
            <span>
              <strong>Finish the setup in three steps:</strong>
              <br />
              1. Create a free project at supabase.com
              <br />
              2. Open the SQL editor and run the contents of{' '}
              <code className="font-mono text-xs">supabase/schema.sql</code>
              <br />
              3. Copy the project URL, anon key and service-role key from Settings → API
              into your <code className="font-mono text-xs">.env</code>, then restart the
              app
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
