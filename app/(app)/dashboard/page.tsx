// app/(app)/board/page.tsx
import { createClient } from '@/utils/supabase/server';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

type Episode = any;

const COLUMNS = [
  { key: 'planning', label: 'Planning' },
  { key: 'booked', label: 'Booked' },
  { key: 'recording', label: 'Recording' },
  { key: 'published', label: 'Published' },
] as const;

type ColumnKey = (typeof COLUMNS)[number]['key'];

function normalizeStatus(raw: string | null | undefined): ColumnKey {
  const s = (raw || '').toLowerCase();

  if (s.includes('publish')) return 'published';
  if (s.includes('record')) return 'recording';
  if (s.includes('book') || s.includes('schedule')) return 'booked';
  return 'planning';
}

function groupByStatus(episodes: Episode[]) {
  const map = new Map<ColumnKey, Episode[]>();
  for (const col of COLUMNS) {
    map.set(col.key, []);
  }

  for (const ep of episodes) {
    const colKey = normalizeStatus(ep.status);
    const list = map.get(colKey)!;
    list.push(ep);
  }

  return map;
}

export default async function ProductionBoardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('episodes')
    .select('id, title, status, scheduled_recording_at, scheduled_at');

  if (error) {
    console.error('Error loading episodes for board:', error);
  }

  const episodes = (data ?? []) as Episode[];
  const grouped = groupByStatus(episodes);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">Production Board</h1>
          <p className="text-sm text-slate-400">
            A simple pipeline view of your dating-show episodes moving from
            Planning → Published.
          </p>
        </div>
        <p className="text-xs text-slate-500">
          Drag &amp; drop coming in a future version — for now, use status
          fields on episodes to move cards between columns.
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {COLUMNS.map((col) => {
          const list = grouped.get(col.key) ?? [];
          return (
            <Card
              key={col.key}
              className="min-w-[240px] max-w-xs flex-1 bg-black/40"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-sm">
                  <span>{col.label}</span>
                  <span className="text-xs font-normal text-slate-400">
                    {list.length} ep{list.length === 1 ? '' : 's'}
                  </span>
                </CardTitle>
                <CardDescription>
                  {col.key === 'planning' &&
                    'Ideas, pitches, and early concepts.'}
                  {col.key === 'booked' &&
                    'Guests confirmed and recording scheduled.'}
                  {col.key === 'recording' &&
                    'Actively recording or in raw edit.'}
                  {col.key === 'published' &&
                    'Fully edited and released episodes.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {list.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    Nothing here yet. Update episode statuses to see them
                    appear in this column.
                  </p>
                ) : (
                  list.map((ep: Episode) => (
                    <div
                      key={ep.id}
                      className="space-y-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs"
                    >
                      <div className="font-medium text-slate-100">
                        {ep.title || 'Untitled episode'}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {(() => {
                          const raw =
                            ep.scheduled_recording_at || ep.scheduled_at || null;
                          if (!raw) return 'Date not set';
                          const d = new Date(raw);
                          if (Number.isNaN(d.getTime())) return 'Date not set';
                          return d.toLocaleString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                          });
                        })()}
                      </div>
                      {ep.status && (
                        <div className="text-[10px] uppercase tracking-wide text-slate-400">
                          Status: {ep.status}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
