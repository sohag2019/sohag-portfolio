import Link from 'next/link';
import { notFound } from 'next/navigation';
import { adminDbOrNull } from '@/lib/admin-auth';
import { saveWork, deleteWork } from '../../actions';
import SaveBar from '@/components/admin/SaveBar';
import { Field, Switch, TextArea, TextField } from '@/components/admin/Fields';
import { PageHead, SetupNotice } from '@/components/admin/PageHead';

/* eslint-disable @typescript-eslint/no-explicit-any */

const framing: [string, string, string][] = [
  ['context', 'Context', 'What was the situation when you joined?'],
  ['constraint', 'Constraint', 'What made it hard — time, team size, legacy code?'],
  ['decision', 'Decision', 'What did you decide to do about it?'],
  ['tradeoff', 'Tradeoff', 'What did you consciously give up?'],
  ['result', 'Result', 'What changed because of it — numbers help.'],
];

export default async function WorkEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === 'new';
  let row: any = null;

  if (!isNew) {
    const sb = await adminDbOrNull();
    if (!sb) notFound();
    const { data } = await sb.from('work').select('*').eq('id', id).maybeSingle();
    if (!data) notFound();
    row = data;
  }

  return (
    <div>
      <PageHead
        title={isNew ? 'Add role' : 'Edit role'}
        subtitle={isNew ? undefined : `${row.role} at ${row.company}`}
        action={
          <Link href="/admin/work" className="admin-btn admin-btn-ghost">
            ← Back
          </Link>
        }
      />
      <SetupNotice />

      <form action={saveWork}>
        {!isNew && <input type="hidden" name="id" value={row.id} />}

        <div className="admin-card mb-4">
          <div className="admin-card-head">
            <h2 className="admin-card-title">The basics</h2>
          </div>

          <div className="admin-grid-2">
            <TextField name="company" label="Company" defaultValue={row?.company ?? ''} required />
            <TextField name="role" label="Role" defaultValue={row?.role ?? ''} required />
          </div>
          <div className="admin-grid-2">
            <TextField
              name="timeframe"
              label="Timeframe"
              defaultValue={row?.timeframe ?? ''}
              placeholder="May 2024 — Present"
            />
            <TextField
              name="duration"
              label="Duration"
              defaultValue={row?.duration ?? ''}
              placeholder="1+ year"
            />
          </div>
          <div className="admin-grid-2">
            <TextField name="location" label="Location" defaultValue={row?.location ?? ''} />
            <TextField
              name="work_mode"
              label="Work mode"
              defaultValue={row?.work_mode ?? ''}
              placeholder="Remote / Onsite / Hybrid"
            />
          </div>
        </div>

        <div className="admin-card mb-4">
          <div className="admin-card-head">
            <h2 className="admin-card-title">The story</h2>
            <p className="admin-card-hint ml-auto">Context → Constraint → Decision → Tradeoff → Result</p>
          </div>

          {framing.map(([key, label, hint]) => (
            <TextArea
              key={key}
              name={key}
              label={label}
              hint={hint}
              defaultValue={row?.[key] ?? ''}
              rows={3}
            />
          ))}

          <TextArea
            name="highlights"
            label="Highlights"
            hint="One bullet per line."
            defaultValue={(row?.highlights ?? []).join('\n')}
            rows={4}
          />
          <TextArea
            name="skills"
            label="Skills"
            hint="Comma or newline separated."
            defaultValue={(row?.skills ?? []).join(', ')}
            rows={2}
          />
        </div>

        <div className="admin-card">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Extras</h2>
          </div>

          <div className="admin-grid-2">
            <TextField
              name="link_label"
              label="Deep-dive link label"
              defaultValue={row?.link_label ?? ''}
              placeholder="Read the decision log"
            />
            <TextField
              name="link_href"
              label="Deep-dive link URL"
              defaultValue={row?.link_href ?? ''}
              placeholder="/writing/…"
            />
          </div>

          <div className="admin-grid-2">
            <Field label="Accent colour" htmlFor="color">
              <input
                id="color"
                name="color"
                type="color"
                className="admin-input"
                style={{ height: 42, padding: 4 }}
                defaultValue={row?.color ?? '#3b82f6'}
              />
            </Field>
            <TextField
              name="sort_order"
              label="Sort order"
              hint="Lower numbers appear first."
              type="number"
              defaultValue={String(row?.sort_order ?? 0)}
            />
          </div>

          <div className="flex gap-7 flex-wrap mt-2">
            <Switch name="is_current" label="Current role" defaultChecked={row?.is_current ?? false} />
            <Switch name="published" label="Show on site" defaultChecked={row?.published ?? true} />
          </div>
        </div>

        <SaveBar label={isNew ? 'Create role' : 'Save role'} />
      </form>

      {!isNew && (
        <form action={deleteWork} className="mt-5">
          <input type="hidden" name="id" value={row.id} />
          <button className="admin-btn admin-btn-danger">Delete this role</button>
        </form>
      )}
    </div>
  );
}
