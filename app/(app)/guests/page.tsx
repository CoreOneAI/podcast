// app/(app)/guests/page.tsx
import { createClient } from '@/utils/supabase/server';
import NewGuestForm from '@/components/guest/NewGuestForm';

export default async function GuestsPage() {
  const supabase = await createClient();

  const { data: guests } =
    await supabase
      .from('guests')
      .select('id, name, topic, preferred_recording_at')
      .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Guests</h1>
          <p className="text-sm text-slate-400">
            Your recurring network of guests for Encore recordings.
          </p>
        </div>
      </header>

      <section className="rounded-xl border border-white/10 bg-white/5 p-4">
        <h2 className="text-sm font-medium text-slate-200 mb-2">
          Add a new guest
        </h2>
        <NewGuestForm />
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-medium text-slate-200">
          Guest roster
        </h2>
        {guests && guests.length ? (
          <div className="space-y-2">
            {guests.map((guest) => (
              <div
                key={guest.id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
              >
                <div>
                  <div className="font-medium text-white">
                    {guest.name}
                  </div>
                  {guest.topic && (
                    <div className="text-xs text-slate-400">
                      Topic: {guest.topic}
                    </div>
                  )}
                </div>
                <div className="text-xs text-slate-400">
                  {guest.preferred_recording_at
                    ? new Date(
                        guest.preferred_recording_at as string
                      ).toLocaleString()
                    : 'No date yet'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">
            No guests yet. Use the form above to start building your network.
          </p>
        )}
      </section>
    </div>
  );
}
