// app/(app)/shows/page.tsx
import { createClient } from '@/utils/supabase/server';
import NewShowForm from '@/components/shows/NewShowForm';

export default async function ShowsPage() {
  const supabase = await createClient();

  const { data: shows } =
    await supabase
      .from('shows')
      .select('id, title, tagline, created_at')
      .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Shows</h1>
          <p className="text-sm text-slate-400">
            Manage your podcast shows for Encore.
          </p>
        </div>
      </header>

      {/* 🔓 Real create-show UI instead of placeholder */}
      <section className="rounded-xl border border-white/10 bg-white/5 p-4">
        <h2 className="text-sm font-medium text-slate-200 mb-2">
          Create a new show
        </h2>
        <NewShowForm />
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-medium text-slate-200">
          Existing shows
        </h2>
        {shows && shows.length ? (
          <div className="space-y-2">
            {shows.map((show) => (
              <div
                key={show.id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
              >
                <div>
                  <div className="font-medium text-white">{show.title}</div>
                  {show.tagline && (
                    <div className="text-xs text-slate-400">
                      {show.tagline}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">
            No shows yet. Use the form above to create your first show.
          </p>
        )}
      </section>
    </div>
  );
}
