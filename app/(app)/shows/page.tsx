// app/(app)/shows/page.tsx
import { createClient } from '@/utils/supabase/server';

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
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">
            Shows
          </h1>
          <p className="text-xs text-slate-400">
            Manage your podcast shows for Encore.
          </p>
        </div>
        {/* Stubbed – later this becomes a proper "New Show" dialog */}
        <span className="text-xs text-slate-500">
          (Create show button coming soon)
        </span>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        {shows && shows.length > 0 ? (
          shows.map((show) => (
            <div
              key={show.id}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <h2 className="text-sm font-semibold text-slate-50">
                {show.title}
              </h2>
              {show.description && (
                <p className="mt-1 text-xs text-slate-400">
                  {show.description}
                </p>
              )}
              <p className="mt-2 text-[11px] text-slate-500">
                Created:{' '}
                {show.created_at
                  ? new Date(show.created_at as string).toLocaleString()
                  : 'Unknown'}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-white/15 bg-white/5 px-4 py-6 text-center text-sm text-slate-400">
            No shows yet. Create your first show to start planning episodes.
          </div>
        )}
      </div>
    </div>
  );
}
