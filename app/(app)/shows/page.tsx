// app/(app)/shows/page.tsx
import { createClient } from '@/utils/supabase/server';
import { NewShowForm } from '@/components/shows/NewShowForm';

type ShowRow = {
  id: string;
  title?: string | null;
  tagline?: string | null;
  created_at?: string | null;
};

export default async function ShowsPage() {
  const supabase = await createClient();

  const { data: shows } = await supabase
    .from('shows')
    .select('id, title, tagline, created_at')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Shows</h1>
          <p className="text-sm text-slate-400">
            Manage your dating-format podcast shows for Encore.
          </p>
        </div>
      </header>

      {/* Create show */}
      <section>
        <NewShowForm />
      </section>

      {/* Existing shows */}
      <section className="space-y-2">
        <h2 className="text-sm font-medium text-slate-200">
          Existing shows
        </h2>

        {!shows?.length && (
          <p className="text-xs text-slate-400">
            No shows yet. Use the form above to create your first show.
          </p>
        )}

        {shows?.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {shows.map((show: ShowRow) => (
              <article
                key={show.id}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <h3 className="text-sm font-semibold text-white">
                  {show.title || 'Untitled show'}
                </h3>
                {show.tagline && (
                  <p className="mt-1 text-xs text-slate-400">
                    {show.tagline}
                  </p>
                )}
                {show.created_at && (
                  <p className="mt-2 text-[11px] uppercase tracking-wide text-slate-500">
                    Created{' '}
                    {new Date(show.created_at).toLocaleDateString()}
                  </p>
                )}
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
