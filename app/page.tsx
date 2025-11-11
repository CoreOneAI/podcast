// app/page.tsx

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If not logged in, go to the login screen
  if (!session) {
    redirect('/auth/login');
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        {/* Header */}
        <section className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            Encore Podcast Studio
          </h1>
          <p className="max-w-xl text-sm text-slate-300">
            Central hub for your dating-show production — shows, guests, prep,
            and scheduling in one place.
          </p>
        </section>

        {/* Main grid of sections */}
        <section className="grid gap-4 md:grid-cols-2">
          {/* Shows */}
          <Link href="/shows">
            <Card className="h-full cursor-pointer border-white/10 bg-white/[0.03] transition hover:border-pink-400/60 hover:bg-white/[0.06]">
              <CardHeader>
                <CardTitle className="text-base">Shows</CardTitle>
                <CardDescription>
                  Manage your podcast shows and formats. Create a show to start
                  planning episodes.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Guests */}
          <Link href="/guests">
            <Card className="h-full cursor-pointer border-white/10 bg-white/[0.03] transition hover:border-pink-400/60 hover:bg-white/[0.06]">
              <CardHeader>
                <CardTitle className="text-base">Guests</CardTitle>
                <CardDescription>
                  Your recurring network of guests for Encore recordings. Add a
                  guest to start building your roster.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* AI Research Assistant */}
          <Link href="/research">
            <Card className="h-full cursor-pointer border-white/10 bg-white/[0.03] transition hover:border-pink-400/60 hover:bg-white/[0.06]">
              <CardHeader>
                <CardTitle className="text-base">AI Research Assistant</CardTitle>
                <CardDescription>
                  Plan dating-app episodes with AI or manually, then print or
                  save briefs for the guest and your calendar.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Production Board */}
          <Link href="/board">
            <Card className="h-full cursor-pointer border-white/10 bg-white/[0.03] transition hover:border-pink-400/60 hover:bg-white/[0.06]">
              <CardHeader>
                <CardTitle className="text-base">Production Board</CardTitle>
                <CardDescription>
                  Pipeline view of episodes moving from Planning → Booked →
                  Recording → Published.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Production Calendar */}
          <Link href="/calendar">
            <Card className="h-full cursor-pointer border-white/10 bg-white/[0.03] transition hover:border-pink-400/60 hover:bg-white/[0.06]">
              <CardHeader>
                <CardTitle className="text-base">Production Calendar</CardTitle>
                <CardDescription>
                  See booked, pending, and released dates at a glance as you
                  schedule recordings.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Settings */}
          <Link href="/settings">
            <Card className="h-full cursor-pointer border-white/10 bg-white/[0.03] transition hover:border-pink-400/60 hover:bg-white/[0.06]">
              <CardHeader>
                <CardTitle className="text-base">Settings</CardTitle>
                <CardDescription>
                  Studio settings, host accounts, and integrations for your
                  Encore workspace.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </section>
      </div>
    </main>
  );
}
