// app/(app)/calendar/page.tsx
import { createClient } from '@/utils/supabase/server';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

type Episode = any; // keep types loose to avoid TS fights

function groupByDate(episodes: Episode[]) {
  const map = new Map<string, Episode[]>();

  for (const ep of episodes) {
    const raw =
      ep.scheduled_recording_at ||
      ep.scheduled_at ||
      ep.recording_date ||
      null;

    if (!raw) continue;

    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) continue;

    const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
    const list = map.get(key) ?? [];
    list.push(ep);
    map.set(key, list);
  }

  // Turn into a sorted array of days
  const days = Array.from(map.entries()).map(([date, eps]) => {
    const d = new Date(date);
    return {
      date,
      label: d.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
      episodes: eps,
    };
  });

  days.sort((a, b) => a.date.localeCompare(b.date));
  return days;
}

export default async function CalendarPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('episodes')
    .select('id, title, status, scheduled_recording_at, scheduled_at')
    .order('scheduled_recording_at', { ascending: true });

  if (error) {
    console.error('Error loading episodes for calendar:', error);
  }

  const episodes = (data ?? []) as Episode[];
  const days = groupByDate(episodes);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-white">
          Production Calendar
        </h1>
        <p className="text-sm text-slate-400">
          See your dating-show recordings laid out by day so you and your host
          always know what&apos;s coming up.
        </p>
      </div>

      {days.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No scheduled recordings yet</CardTitle>
            <CardDescription>
              When you start scheduling episodes, they&apos;ll show up here by
              date. Use your Guest prep and AI Assistant to plan sessions, then
              add recording dates to your episodes.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {days.map((day) => (
            <Card key={day.date}>
              <CardHeader>
                <CardTitle>{day.label}</CardTitle>
                <CardDescription>
                  {day.episodes.length} recording
                  {day.episodes.length === 1 ? '' : 's'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {day.episodes.map((ep: Episode) => (
                  <div
                    key={ep.id}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-medium text-slate-100">
                        {ep.title || 'Untitled episode'}
                      </div>
                      {ep.status && (
                        <span className="rounded-full border border-white/15 bg-black/30 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
                          {ep.status}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-[11px] text-slate-400">
                      Recording time:{' '}
                      {(() => {
                        const raw =
                          ep.scheduled_recording_at || ep.scheduled_at || null;
                        if (!raw) return 'Not set';
                        const d = new Date(raw);
                        if (Number.isNaN(d.getTime())) return 'Not set';
                        return d.toLocaleTimeString(undefined, {
                          hour: 'numeric',
                          minute: '2-digit',
                        });
                      })()}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
