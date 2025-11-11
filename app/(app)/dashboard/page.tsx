// app/(app)/board/page.tsx
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export default async function BoardPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  const columns = [
    {
      key: 'planning',
      title: 'Planning',
      description: 'Ideas, pitches, and early concepts.',
    },
    {
      key: 'booked',
      title: 'Booked',
      description: 'Guests confirmed and recording scheduled.',
    },
    {
      key: 'recording',
      title: 'Recording',
      description: 'Actively recording or in raw edit.',
    },
    {
      key: 'published',
      title: 'Published',
      description: 'Fully edited and released episodes.',
    },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Production Board
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            A simple pipeline view of your dating-show episodes moving from{' '}
            <span className="font-medium text-slate-50">Planning</span> →{' '}
            <span className="font-medium text-slate-50">Published</span>.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Drag &amp; drop will come in a future version — for now, episodes
            will appear here based on their status.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10"
        >
          Back to dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {columns.map((column) => (
          <div
            key={column.key}
            className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-100">
                {column.title}
              </h2>
              <span className="text-xs text-slate-400">0 eps</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{column.description}</p>
            <div className="mt-3 flex-1 rounded-lg border border-dashed border-white/10 bg-black/10 p-3 text-xs text-slate-500">
              Nothing here yet. Episodes will show in this column once we start
              tracking them in the portal.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
