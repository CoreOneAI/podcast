// app/(app)/dashboard/page.tsx
import { createSupabaseServerClient } from '@/lib/supabaseServer';

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();

  const [{ data: shows }, { data: episodes }, { data: guests }] =
    await Promise.all([
      supabase.from('shows').select('id'),
      supabase.from('episodes').select('id, title, status, scheduled_recording_at'),
      supabase.from('guests').select('id'),
    ]);

  const totalShows = shows?.length ?? 0;
  const totalEpisodes = episodes?.length ?? 0;
  const totalGuests = guests?.length ?? 0;

  const upcoming = (episodes ?? [])
    .filter((ep) => ep.scheduled_recording_at)
    .sort(
      (a, b) =>
        new Date(a.scheduled_recording_at as string).getTime() -
        new Date(b.scheduled_recording_at as string).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="text-xs text-slate-400">Total Shows</div>
          <div className="mt-1 text-2xl font-semibold text-white">
            {totalShows}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="text-xs text-slate-400">Total Episodes</div>
          <div className="mt-1 text-2xl font-semibold text-white">
            {totalEpisodes}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="text-xs text-slate-400">Total Guests</div>
          <div className="mt-1 text-2xl font-semibold text-white">
            {totalGuests}
          </div>
        </div>
      </div>

      {/* Upcoming recordings */}
      <section>
        <h2 className="text-sm font-medium text-slate-200 mb-2">
          Upcoming Recordings
        </h2>
        <div className="space-y-2">
          {upcoming.length ? (
            upcoming.map((ep: any) => (
              <div
                key={ep.id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
              >
                <span>{ep.title ?? 'Untitled episode'}</span>
                <span className="text-xs text-slate-400">
                  {ep.scheduled_recording_at
                    ? new Date(
                        ep.scheduled_recording_at as string
                      ).toLocaleString()
                    : 'Not scheduled'}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400">
              No upcoming recordings yet. Schedule your first session.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
