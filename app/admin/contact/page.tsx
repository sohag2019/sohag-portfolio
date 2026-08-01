import Link from 'next/link';
import { getContact } from '@/lib/data';
import { saveContact } from '../actions';
import SaveBar from '@/components/admin/SaveBar';
import { JsonField, TextArea, TextField } from '@/components/admin/Fields';
import { PageHead, SetupNotice } from '@/components/admin/PageHead';

export default async function ContactPage() {
  const contact = await getContact();

  return (
    <div>
      <PageHead
        title="Get In Touch"
        subtitle="The contact section at the bottom of your homepage."
        action={
          <Link href="/admin/messages" className="admin-btn admin-btn-ghost">
            View messages →
          </Link>
        }
      />
      <SetupNotice />

      <form action={saveContact}>
        <div className="admin-card mb-4">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Section copy</h2>
          </div>

          <TextField
            name="heading"
            label="Heading"
            defaultValue={contact.heading}
            placeholder="Get In Touch"
          />
          <TextArea
            name="subheading"
            label="Subheading"
            defaultValue={contact.subheading}
            rows={2}
            maxLength={220}
          />
          <TextField
            name="cta_heading"
            label="Left column headline"
            hint="The bold line above your buttons."
            defaultValue={contact.ctaHeading}
          />
          <TextArea
            name="cta_subheading"
            label="Left column subheading"
            defaultValue={contact.ctaSubheading}
            rows={2}
            maxLength={200}
          />
        </div>

        <div className="admin-card mb-4">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Contact details</h2>
          </div>

          <div className="admin-grid-2">
            <TextField
              name="email"
              label="Email address"
              hint="Used by the “Start a Conversation” button."
              type="email"
              defaultValue={contact.email}
            />
            <TextField
              name="resume_url"
              label="Resume link"
              hint="Leave empty to hide the Resume button."
              defaultValue={contact.resumeUrl}
            />
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Social links</h2>
          </div>
          <JsonField
            name="social_links"
            label="Links"
            hint={
              <>
                <code>platform</code> picks the icon — one of <code>github</code>,{' '}
                <code>linkedin</code>, <code>discord</code>, <code>twitter</code>,{' '}
                <code>website</code>, <code>other</code>. <code>display</code> is the text
                shown on the card.
              </>
            }
            value={contact.socialLinks}
            rows={16}
          />
        </div>

        <SaveBar label="Save contact" />
      </form>
    </div>
  );
}
