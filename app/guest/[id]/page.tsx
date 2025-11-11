// app/(app)/guests/page.tsx
import { createClient } from '@/utils/supabase/server';
import { NewGuestForm } from '@/components/guest/NewGuestForm';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

type Guest = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  topic: string | null;
  bio: string | null;
  prep_date: string | null;
  notes: string | null;
  avatar_url: string | null;
};

export default async function GuestsPage() {
  const supabase = await createClient();

  const { data: guests, error } = await supabase
    .from('guests')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      {/* Page header */}
      <header className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold text-white">Guests</h1>
        <p className="text-sm text-slate-400">
          Your recurring network of guests for Encore recordings.
        </p>
      </header>

      {/* New guest card (host-facing prep form) */}
      <section>
        <NewGuestForm />
      </section>

      {/* Existing guest list */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-slate-200">
          Guest roster
        </h2>

        {error && (
          <p className="text-xs text-red-400">
            There was a problem loading guests from Supabase: {error.message}
          </p>
        )}

        {(!guests || guests.length === 0) && !error && (
          <p className="text-xs text-slate-400">
            No guests yet. Add a guest to start building your network.
          </p>
        )}

        <div className="grid gap-3 md:grid-cols-2">
          {(guests ?? []).map((guest: Guest) => {
            const initials =
              guest.name
                ?.split(' ')
                .map((p) => p[0])
                .join('')
                .toUpperCase() || 'G';

            return (
              <div
                key={guest.id}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <Avatar className="h-10 w-10 shrink-0">
                  {guest.avatar_url ? (
                    <AvatarImage
                      src={guest.avatar_url}
                      alt={guest.name ?? 'Guest avatar'}
                    />
                  ) : (
                    <AvatarFallback>{initials}</AvatarFallback>
                  )}
                </Avatar>

                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="font-medium text-white">
                        {guest.name ?? 'Unnamed guest'}
                      </div>
                      {guest.topic && (
                        <div className="text-xs text-emerald-300/80">
                          Topic: {guest.topic}
                        </div>
                      )}
                    </div>
                    {guest.prep_date && (
                      <div className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-300">
                        Prep {new Date(guest.prep_date).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  {guest.bio && (
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {guest.bio}
                    </p>
                  )}

                  <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-slate-400">
                    {guest.email && (
                      <span className="rounded-full bg-black/30 px-2 py-0.5">
                        {guest.email}
                      </span>
                    )}
                    {guest.phone && (
                      <span className="rounded-full bg-black/30 px-2 py-0.5">
                        {guest.phone}
                      </span>
                    )}
                  </div>

                  {guest.notes && (
                    <p className="mt-1 text-[11px] text-slate-400 line-clamp-2">
                      Notes: {guest.notes}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
