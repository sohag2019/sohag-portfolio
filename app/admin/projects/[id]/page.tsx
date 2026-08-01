import Link from 'next/link';
import { notFound } from 'next/navigation';
import { adminDbOrNull } from '@/lib/admin-auth';
import { saveProject, deleteProject } from '../../actions';
import ImageUpload from '@/components/admin/ImageUpload';
import SaveBar from '@/components/admin/SaveBar';
import { Field, JsonField, Switch, TextArea, TextField } from '@/components/admin/Fields';
import { PageHead, SetupNotice } from '@/components/admin/PageHead';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function ProjectEdit({
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
    const { data } = await sb.from('projects').select('*').eq('id', id).maybeSingle();
    if (!data) notFound();
    row = data;
  }

  return (
    <div>
      <PageHead
        title={isNew ? 'Add project' : 'Edit project'}
        subtitle={isNew ? undefined : row.title}
        action={
          <div className="flex gap-2">
            {!isNew && (
              <Link
                href={`/projects/${row.slug}`}
                target="_blank"
                className="admin-btn admin-btn-ghost"
              >
                Preview ↗
              </Link>
            )}
            <Link href="/admin/projects" className="admin-btn admin-btn-ghost">
              ← Back
            </Link>
          </div>
        }
      />
      <SetupNotice />

      <form action={saveProject}>
        {!isNew && <input type="hidden" name="id" value={row.id} />}

        <div className="admin-card mb-4">
          <div className="admin-card-head">
            <h2 className="admin-card-title">The basics</h2>
          </div>

          <div className="admin-grid-2">
            <TextField name="title" label="Title" defaultValue={row?.title ?? ''} required />
            <TextField
              name="slug"
              label="URL slug"
              hint="Leave empty to generate it from the title."
              defaultValue={row?.slug ?? ''}
              placeholder="edupeak"
            />
          </div>

          <TextArea
            name="description"
            label="Short description"
            hint="One line, shown on the project card."
            defaultValue={row?.description ?? ''}
            rows={2}
            maxLength={200}
          />
          <TextArea
            name="long_desc"
            label="The problem"
            hint="What problem does this project solve?"
            defaultValue={row?.long_desc ?? ''}
            rows={4}
          />
          <TextArea
            name="contribution"
            label="Your contribution"
            hint="Be specific about what you personally built."
            defaultValue={row?.contribution ?? ''}
            rows={3}
          />

          <ImageUpload name="cover" label="Cover image" defaultValue={row?.cover ?? ''} />
        </div>

        <div className="admin-card mb-4">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Links &amp; tags</h2>
          </div>

          <div className="admin-grid-2">
            <TextField name="live" label="Live URL" defaultValue={row?.live ?? ''} />
            <TextField name="github" label="Repository URL" defaultValue={row?.github ?? ''} />
          </div>

          <div className="admin-grid-2">
            <TextField
              name="category"
              label="Category"
              defaultValue={row?.category ?? 'Web'}
              placeholder="Web / Mobile / Tooling"
            />
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
          </div>

          <TextField
            name="tags"
            label="Stack / tags"
            hint="Comma separated."
            defaultValue={(row?.tags ?? []).join(', ')}
            placeholder="Next.js, PostgreSQL, Docker"
          />
        </div>

        <div className="admin-card mb-4">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Case study detail</h2>
          </div>

          <JsonField
            name="decision_log"
            label="Decision log"
            hint={<>Array of {'{ "choice": "…", "reason": "…" }'} — the “why X over Y” bullets.</>}
            value={row?.decision_log ?? []}
            rows={10}
          />
          <JsonField
            name="features"
            label="Features"
            hint={<>Array of {'{ "title", "desc", "icon", "image" }'}.</>}
            value={row?.features ?? []}
            rows={12}
          />
          <JsonField
            name="stats"
            label="Stats"
            hint={<>Array of {'{ "label", "value" }'} — the numbers on the case study page.</>}
            value={row?.stats ?? []}
            rows={9}
          />
        </div>

        <div className="admin-card">
          <div className="admin-grid-2">
            <TextField
              name="sort_order"
              label="Sort order"
              hint="Lower numbers appear first."
              type="number"
              defaultValue={String(row?.sort_order ?? 0)}
            />
            <div className="flex items-end pb-3">
              <Switch name="published" label="Show on site" defaultChecked={row?.published ?? true} />
            </div>
          </div>
        </div>

        <SaveBar label={isNew ? 'Create project' : 'Save project'} />
      </form>

      {!isNew && (
        <form action={deleteProject} className="mt-5">
          <input type="hidden" name="id" value={row.id} />
          <button className="admin-btn admin-btn-danger">Delete this project</button>
        </form>
      )}
    </div>
  );
}
