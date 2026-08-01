import Link from 'next/link';
import { notFound } from 'next/navigation';
import { adminDbOrNull } from '@/lib/admin-auth';
import { saveWriting, deleteWriting } from '../../actions';
import ImageUpload from '@/components/admin/ImageUpload';
import SaveBar from '@/components/admin/SaveBar';
import { Field, Switch, TextField } from '@/components/admin/Fields';
import MarkdownEditor from '@/components/admin/MarkdownEditor';
import { PageHead, SetupNotice } from '@/components/admin/PageHead';

/* eslint-disable @typescript-eslint/no-explicit-any */

function forInput(iso?: string) {
  const d = iso ? new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

export default async function WritingEdit({
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
    const { data } = await sb.from('writing').select('*').eq('id', id).maybeSingle();
    if (!data) notFound();
    row = data;
  }

  return (
    <div>
      <PageHead
        title={isNew ? 'New post' : 'Edit post'}
        subtitle={isNew ? undefined : row.title}
        action={
          <div className="flex gap-2">
            {!isNew && row.status === 'published' && (
              <Link
                href={`/writing/${row.slug}`}
                target="_blank"
                className="admin-btn admin-btn-ghost"
              >
                View ↗
              </Link>
            )}
            <Link href="/admin/writing" className="admin-btn admin-btn-ghost">
              ← Back
            </Link>
          </div>
        }
      />
      <SetupNotice />

      <form action={saveWriting}>
        {!isNew && <input type="hidden" name="id" value={row.id} />}

        <div className="admin-card mb-4">
          <TextField
            name="title"
            label="Title"
            defaultValue={row?.title ?? ''}
            placeholder="What I learned shipping a DSL"
            required
          />

          <div className="admin-grid-2">
            <TextField
              name="slug"
              label="URL slug"
              hint="Leave empty to build it from the title."
              defaultValue={row?.slug ?? ''}
            />
            <TextField
              name="published_at"
              label="Publish date"
              type="date"
              defaultValue={forInput(row?.published_at)}
            />
          </div>

          <TextField
            name="excerpt"
            label="Excerpt"
            hint="One or two lines shown on the post card and in link previews."
            defaultValue={row?.excerpt ?? ''}
          />

          <TextField
            name="tags"
            label="Tags"
            hint="Comma separated — these become the filters on /writing."
            defaultValue={(row?.tags ?? []).join(', ')}
            placeholder="Engineering, Next.js"
          />

          <ImageUpload
            name="cover_image"
            label="Cover image"
            hint="Shown at the top of the post and in social previews."
            defaultValue={row?.cover_image ?? ''}
          />
        </div>

        <div className="admin-card mb-4">
          <div className="admin-card-head">
            <h2 className="admin-card-title">The post</h2>
          </div>
          <MarkdownEditor name="content" defaultValue={row?.content ?? ''} />
        </div>

        <div className="admin-card">
          <div className="admin-grid-2">
            <Field label="Status" htmlFor="status">
              <select
                id="status"
                name="status"
                className="admin-select"
                defaultValue={row?.status ?? 'draft'}
              >
                <option value="draft">Draft — only you can see it</option>
                <option value="published">Published — live on the site</option>
              </select>
            </Field>
            <div className="flex items-end pb-3">
              <Switch
                name="trending"
                label="Pin as trending"
                defaultChecked={row?.trending ?? false}
              />
            </div>
          </div>
        </div>

        <SaveBar label={isNew ? 'Create post' : 'Save post'} />
      </form>

      {!isNew && (
        <form action={deleteWriting} className="mt-5">
          <input type="hidden" name="id" value={row.id} />
          <button className="admin-btn admin-btn-danger">Delete this post</button>
        </form>
      )}
    </div>
  );
}
