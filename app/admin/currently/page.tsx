import { getCurrently } from '@/lib/data';
import { saveCurrently } from '../actions';
import SaveBar from '@/components/admin/SaveBar';
import { JsonField, TextArea, TextField } from '@/components/admin/Fields';
import { PageHead, SetupNotice } from '@/components/admin/PageHead';

export default async function CurrentlyPage() {
  const currently = await getCurrently();

  return (
    <div>
      <PageHead
        title="Currently"
        subtitle="The “Now” section — a live snapshot of what you’re building, learning, drinking and reading."
      />
      <SetupNotice />

      <form action={saveCurrently}>
        <div className="admin-card mb-4">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Section basics</h2>
          </div>

          <TextField
            name="updated_label"
            label="“Updated” badge"
            hint="The pulsing pill on the right of the section intro."
            defaultValue={currently.updatedLabel}
            placeholder="● Updated May 2026"
          />

          <TextArea
            name="ticker_logs"
            label="Scrolling ticker"
            hint="One line per entry — these scroll across the bottom of the section."
            defaultValue={currently.tickerLogs.join('\n')}
            rows={8}
          />
        </div>

        <div className="admin-card">
          <div className="admin-card-head">
            <h2 className="admin-card-title">Cards</h2>
            <p className="admin-card-hint ml-auto">
              First two show as wide cards, the rest sit in the row below
            </p>
          </div>

          <div className="admin-alert mb-4">
            <span>ℹ</span>
            <span>
              Every card needs <code>icon</code>, <code>badge</code>, <code>title</code> and{' '}
              <code>description</code>. Add optional <code>tags</code> (array of words) and a{' '}
              <code>meta</code> object to pick the mini-widget:
              <br />
              <code>meta.type: &quot;commit-graph&quot;</code> — with{' '}
              <code>commitData</code> (numbers 1-10), <code>fromLabel</code>, <code>toLabel</code>
              <br />
              <code>&quot;skills&quot;</code> — with <code>skills</code>:{' '}
              {'[{ "label": "AI Agents", "pct": 70 }]'}
              <br />
              <code>&quot;terminal&quot;</code> — with <code>terminalPath</code> and{' '}
              <code>terminalLines</code> (array of commit messages)
              <br />
              <code>&quot;coffee&quot;</code> — with <code>cupsToday</code> and <code>note</code>
              <br />
              <code>&quot;book&quot;</code> — with <code>chapter</code> and{' '}
              <code>progressPct</code> (here <code>title</code> is the book,{' '}
              <code>description</code> the author)
            </span>
          </div>

          <JsonField
            name="cards"
            label="Card list"
            value={currently.cards}
            rows={26}
          />
        </div>

        <SaveBar label="Save currently" />
      </form>
    </div>
  );
}
