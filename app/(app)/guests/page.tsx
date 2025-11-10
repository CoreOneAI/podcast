// app/(app)/guests/page.tsx
import { createClient } from '@/utils/supabase/server';

export default async function GuestsPage() {
  const supabase = await createClient();

  const { data: guests, error } = await supabase
    .from('guests')
    .select('id, name, email, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading guests:', error);
  }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-xl font-semibold text-slate-50">
          Guests
        </h1>
        <p className="text-xs text-slate-400">
          Your recurring network of guests for Encore recordings.
        </p>
      </header>

      <div className="space-y-2">
        {guests && guests.length > 0 ? (
          guests.map((g) => (
            <div
              key={g.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
            >
              <div>
                <div className="font-medium text-slate-50">
                  {g.name}
                </div>
                {g.email && (
                  <div className="text-xs text-slate-400">
                    {g.email}
                  </div>
                )}
              </div>
              <div className="text-[11px] text-slate-500">
                Added{' '}
                {g.created_at
                  ? new Date(g.created_at as string).toLocaleDateString()
                  : '—'}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-white/15 bg-white/5 px-4 py-6 text-center text-sm text-slate-400">
            No guests yet. Add a guest to start building your network.
          </div>
        )}
      </div>
    </div>
  );
}
