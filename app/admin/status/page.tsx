import { getStatus } from '@/lib/data';
import { saveStatus } from '../actions';
import SaveBar from '@/components/admin/SaveBar';
import { Field, TextArea, TextField } from '@/components/admin/Fields';
import { PageHead, SetupNotice } from '@/components/admin/PageHead';

const availabilities = [
  { value: 'available', label: 'Available for work' },
  { value: 'deep-work', label: 'Deep work' },
  { value: 'busy', label: 'Busy' },
  { value: 'offline', label: 'Offline' },
];

export default async function StatusPage() {
  const status = await getStatus();

  return (
    <div>
      <PageHead
        title="Live status"
        subtitle="The thin strip under your hero — what you're building right now, your availability and local time."
      />
      <SetupNotice />

      <form action={saveStatus}>
        <div className="admin-card">
          <TextField
            name="currently_building"
            label="Currently building"
            defaultValue={status.currentlyBuilding}
          />

          <div className="admin-grid-2">
            <Field label="Availability" htmlFor="availability">
              <select
                id="availability"
                name="availability"
                className="admin-select"
                defaultValue={status.availability}
              >
                {availabilities.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </select>
            </Field>

            <TextField name="location" label="City" defaultValue={status.location} />
          </div>

          <TextField
            name="timezone"
            label="Timezone"
            hint="IANA name, e.g. Asia/Dhaka — drives the clock in your navbar."
            defaultValue={status.timezone}
            placeholder="Asia/Dhaka"
          />

          <TextArea
            name="how_i_work"
            label="How I work"
            hint="One line on your working style."
            defaultValue={status.howIWork}
            rows={3}
            maxLength={220}
          />
        </div>

        <SaveBar label="Save status" />
      </form>
    </div>
  );
}
