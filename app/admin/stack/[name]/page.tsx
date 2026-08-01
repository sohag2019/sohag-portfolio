import Link from 'next/link';
import { notFound } from 'next/navigation';
import { adminDbOrNull } from '@/lib/admin-auth';
import { saveStack, deleteStack } from '../../actions';
import SaveBar from '@/components/admin/SaveBar';
import { Field, JsonField, Switch, TextField } from '@/components/admin/Fields';
import { PageHead, SetupNotice } from '@/components/admin/PageHead';

/* eslint-disable @typescript-eslint/no-explicit-any */

const levels = ['learning', 'comfortable', 'expert'];

export default async function StackEdit({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  const isNew = decoded === 'new';
  let row: any = null;

  if (!isNew) {
    const sb = await adminDbOrNull();
    if (!sb) notFound();
    const { data } = await sb
      .from('stack_stats')
      .select('*')
      .eq('name', decoded)
      .maybeSingle();
    if (!data) notFound();
    row = data;
  }

  return (
    <div>
      <PageHead
        title={isNew ? 'Add technology' : `Edit ${decoded}`}
        action={
          <Link href="/admin/stack" className="admin-btn admin-btn-ghost">
            ← Back
          </Link>
        }
      />
      <SetupNotice />

      <form action={saveStack}>
        {!isNew && <input type="hidden" name="original_name" value={row.name} />}

        <div className="admin-card mb-4">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Technology</h2>
          </div>

          <div className="admin-grid-2">
            <TextField
              name="name"
              label="Name"
              defaultValue={row?.name ?? ''}
              placeholder="Next.js"
              required
            />
            <TextField
              name="category"
              label="Category"
              hint="Groups the cards — e.g. Frontend, Backend, DevOps."
              defaultValue={row?.category ?? 'Frontend'}
            />
          </div>

          <div className="admin-grid-2">
            <TextField
              name="icon"
              label="Icon URL"
              hint="Logo image shown on the card."
              defaultValue={row?.icon ?? ''}
              placeholder="https://cdn.simpleicons.org/nextdotjs"
            />
            <Field label="Level" htmlFor="level">
              <select
                id="level"
                name="level"
                className="admin-select"
                defaultValue={row?.level ?? 'comfortable'}
              >
                {levels.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Switch
            name="invert"
            label="Invert icon colour (for dark logos)"
            defaultChecked={row?.invert ?? false}
          />
        </div>

        <div className="admin-card">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Usage</h2>
          </div>

          <div className="admin-grid-2">
            <TextField
              name="count"
              label="Project count"
              hint="How many projects use it — drives the ordering."
              type="number"
              defaultValue={String(row?.count ?? 0)}
            />
            <TextField
              name="percent"
              label="Usage percent"
              hint="0–100, fills the bar on the card."
              type="number"
              defaultValue={String(row?.percent ?? 0)}
            />
          </div>

          <TextField
            name="projects"
            label="Used in"
            hint="Comma separated project names."
            defaultValue={(row?.projects ?? []).join(', ')}
          />

          <JsonField
            name="sparkline"
            label="Sparkline"
            hint="Array of numbers, oldest first — the little activity graph."
            value={row?.sparkline ?? []}
            rows={4}
          />
        </div>

        <SaveBar label={isNew ? 'Add technology' : 'Save technology'} />
      </form>

      {!isNew && (
        <form action={deleteStack} className="mt-5">
          <input type="hidden" name="name" value={row.name} />
          <button className="admin-btn admin-btn-danger">Remove from stack</button>
        </form>
      )}
    </div>
  );
}
