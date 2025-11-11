// app/(app)/settings/page.tsx

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="text-sm text-slate-400">
          Workspace settings for the Encore Podcast portal.
        </p>
      </header>

      <section className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-4">
        <div>
          <h2 className="text-sm font-medium text-slate-200">
            Account & host info
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            This is where we’ll let you manage host profiles, contact details,
            and show branding (like intro lines, socials, etc.).
          </p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-slate-200">
            Notifications
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Future update: email reminders before recordings, guest prep
            checklists, and follow-up tasks.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-slate-200">
            Access & roles
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            We&apos;ll use this section later to control who can book guests,
            edit shows, or just view the prep notes.
          </p>
        </div>
      </section>

      <p className="text-xs text-slate-500">
        For now, settings are read-only. We&apos;ll flesh this out once the
        core scheduling and prep flows are fully locked.
      </p>
    </div>
  );
}
