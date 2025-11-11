import React from "react";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import NewGuestForm from "@/components/guest/NewGuestForm";
import Link from "next/link";

type Guest = {
  id: string;
  name: string | null;
  email: string | null;
  phone?: string | null;
  topic?: string | null;
};

export default async function GuestsPage() {
  const supabase = createSupabaseServerClient();

  const { data: guests } = await supabase
    .from("guests")
    .select("id, name, email, phone, topic")
    .order("created_at", { ascending: false });

  const guestList = (guests ?? []) as Guest[];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold text-white">Guests</h1>
        <p className="text-sm text-slate-400">
          Your recurring network of guests for Encore recordings.
        </p>
      </header>

      {/* Add guest form */}
      <NewGuestForm />

      {/* Guest list */}
      <section className="space-y-2">
        {guestList.length === 0 ? (
          <p className="text-sm text-slate-400">
            No guests yet. Add a guest to start building your network.
          </p>
        ) : (
          <ul className="space-y-2">
            {guestList.map((guest) => (
              <li
                key={guest.id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
              >
                <div>
                  <div className="font-medium text-white">
                    {guest.name ?? "Unnamed guest"}
                  </div>
                  <div className="text-xs text-slate-400">
                    {guest.email ?? "No email"}{" "}
                    {guest.phone ? `• ${guest.phone}` : null}
                  </div>
                  {guest.topic && (
                    <div className="text-xs text-emerald-300">
                      Topic: {guest.topic}
                    </div>
                  )}
                </div>
                <Link
                  href={`/guest/${guest.id}`}
                  className="text-xs text-emerald-300 hover:text-emerald-200 underline"
                >
                  Prep sheet
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
