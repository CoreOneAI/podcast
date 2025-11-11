// app/(app)/calendar/page.tsx

import { createClient } from '@/utils/supabase/server';

type Episode = {
  id: string;
  title: string | null;
  scheduled_recording_at: string | null;
};

export default async function CalendarPage() {
  const supabase = await createClient();
  const { data: episodes } = await supabase
    .from('episodes')
    .select('id, title, scheduled_recording_at')
    .order('scheduled_recording_at', { ascending: true });

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0–11

  const firstOfMonth = new Date(year, month, 1);
  const firstWeekday = firstOfMonth.getDay(); // 0=Sun..6=Sat
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Build calendar grid
  const weeks: { day: number | null }[][] = [];
  let currentWeek: { day: number | null }[] = [];

  // leading blanks
  for (let i = 0; i < firstWeekday; i++) {
    currentWeek.push({ day: null });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push({ day });
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ day: null });
    }
    weeks.push(currentWeek);
  }

  // Map day -> episodes on that day
  const bookedByDay = new Map<number, Episode[]>();

  (episodes ?? []).forEach((ep) => {
    if (!ep.scheduled_recording_at) return;
    const d = new Date(ep.scheduled_recording_at);
    if (d.getFullYear() !== year || d.getMonth() !== month) return;
    const day = d.getDate();
    const arr = bookedByDay.get(day) ?? [];
    arr.push(ep);
    bookedByDay.set(day, arr);
  });

  const monthLabel = now.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });

  const monthEpisodes =
    episodes?.filter((ep) => {
      if (!ep.scheduled_recording_at) return false;
      const d = new Date(ep.scheduled_recording_at);
      return d.getFullYear() === year && d.getMonth() === month;
    }) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Production Calendar
        </h1>
        <p className="text-sm text-slate-400">
          Days with booked recordings are highlighted. As you schedule episodes,
          they’ll appear on this grid.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-medium text-slate-100">{monthLabel}</div>
          <div className="text-xs text-slate-500">
            Grey squares = at least one booked recording.
          </div>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-400">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="mt-1 grid grid-cols-7 gap-1 text-sm">
          {weeks.map((week, i) =>
            week.map((cell, j) => {
              if (cell.day === null) {
                return (
                  <div
                    key={`${i}-${j}`}
                    className="h-10 rounded-lg border border-transparent"
                  />
                );
              }

              const day = cell.day;
              const dayEpisodes = bookedByDay.get(day) ?? [];
              const hasBooking = dayEpisodes.length > 0;

              return (
                <div
                  key={`${i}-${j}`}
                  className={`relative flex h-10 items-center justify-center rounded-lg border text-xs ${
                    hasBooking
                      ? 'border-white/20 bg-slate-800/70 text-slate-50'
                      : 'border-white/5 bg-transparent text-slate-300'
                  }`}
                >
                  <span>{day}</span>
                  {hasBooking && (
                    <span className="absolute bottom-0 right-0 mb-0.5 mr-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  )}
                </div>
              );
            }),
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-medium text-slate-200">
          This month&apos;s booked recordings
        </h2>

        {monthEpisodes.length === 0 ? (
          <p className="text-xs text-slate-400">
            No booked recordings yet this month. When you schedule episodes,
            they&apos;ll show up here and on the calendar above.
          </p>
        ) : (
          <ul className="space-y-1 text-xs text-slate-200">
            {monthEpisodes.map((ep) => {
              const d = new Date(ep.scheduled_recording_at!);
              return (
                <li
                  key={ep.id}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                >
                  <div className="font-medium">
                    {ep.title || 'Untitled episode'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {d.toLocaleString()}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
