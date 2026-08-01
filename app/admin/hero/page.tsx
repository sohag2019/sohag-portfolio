import { getHero } from '@/lib/data';
import { saveHero } from '../actions';
import ImageUpload from '@/components/admin/ImageUpload';
import SaveBar from '@/components/admin/SaveBar';
import { TextArea, TextField } from '@/components/admin/Fields';
import { HeadingLinesEditor, StatsEditor } from '@/components/admin/HeroEditors';
import { PageHead, SetupNotice } from '@/components/admin/PageHead';

export default async function HeroPage() {
  const hero = await getHero();

  return (
    <div>
      <PageHead
        title="Hero"
        subtitle="The first thing visitors see — availability badge, big headline, intro, tech pills, counters and photo."
      />
      <SetupNotice />

      <form action={saveHero}>
        <div className="admin-card mb-4">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Headline</h2>
            <span className="admin-badge">Section 01</span>
          </div>

          <div className="admin-grid-2">
            <TextField
              name="name"
              label="Name"
              hint="Shown first — recruiters should see this immediately."
              defaultValue={hero.name}
              placeholder="Sohag Hossain"
            />
            <TextField
              name="role_title"
              label="Role line"
              hint="e.g. Full Stack Developer · 4+ years"
              defaultValue={hero.roleTitle}
              placeholder="Full Stack Developer · 4+ years"
            />
          </div>

          <TextField
            name="badge_text"
            label="Availability badge"
            hint="The small pill above the headline, with the pulsing green dot."
            defaultValue={hero.badgeText}
            placeholder="Open to opportunities — React · Node · Cloud"
          />

          <HeadingLinesEditor name="heading_lines" defaultValue={hero.headingLines} />

          <TextArea
            name="description"
            label="Intro paragraph"
            hint="Two or three sentences on what you do."
            defaultValue={hero.description}
            rows={4}
            maxLength={400}
          />
        </div>

        <div className="admin-card mb-4">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Tech &amp; numbers</h2>
          </div>

          <TextArea
            name="tech_pills"
            label="Tech pills"
            hint="Separate with commas or new lines. These are the small chips under your intro."
            defaultValue={hero.techPills.join(', ')}
            rows={3}
          />

          <StatsEditor name="stats" defaultValue={hero.stats} />
        </div>

        <div className="admin-card">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Photo</h2>
          </div>
          <ImageUpload
            name="profile_image"
            label="Profile photo"
            hint="Square image works best — it's shown with a 3D tilt effect."
            defaultValue={hero.profileImage}
          />
        </div>

        <SaveBar label="Save hero" />
      </form>
    </div>
  );
}
