// app/(app)/shows/page.tsx
import { createClient } from '@/utils/supabase/server';
import { NewShowForm } from '@/components/shows/NewShowForm';

export default async function ShowsPage() {
  const supabase = await createClient();

  const { data: shows, error } = await supabase
    .from('shows')
    .select('id, title, description, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading shows:', error);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">Shows</h1>
          <p className="text-sm text-slate-400">
            Manage your podcast shows for Encore.
          </p>
        </div>
      </div>

      {/* NEW: real create-show form */}
      <NewShowForm />

      {/* Show list */}
      <div className="space-y-3">
        {shows && shows.length > 0 ? (
          shows.map((show: any) => (
            <div
              key={show.id}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <h2 className="text-sm font-medium text-white">{show.title}</h2>

              {show.description && (
                <p className="mt-1 text-xs text-slate-300">
                  {show.description}
                </p>
              )}

              <p className="mt-1 text-[11px] text-slate-500">
                Created{' '}
                {show.created_at
                  ? new Date(show.created_at as string).toLocaleString()
                  : 'Unknown'}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400">
            No shows yet. Use the form above to create your first show.
          </p>
        )}
      </div>
    </div>
  );
}
