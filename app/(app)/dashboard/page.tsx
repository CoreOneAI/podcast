'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = 'https://encorepodcast.netlify.app/login';
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Loading...</div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg mb-4">Not authenticated</div>
          <a 
            href="https://encorepodcast.netlify.app/login" 
            className="bg-white text-black px-4 py-2 rounded-md"
          >
            Go to Login
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Encore Podcast Dashboard</h1>
            <p className="text-white/70">Welcome back, {user.email}</p>
          </div>
          <button
            onClick={signOut}
            className="bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-md"
          >
            Sign Out
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Research Assistant Card */}
          <Link 
            href="/research" 
            className="block border border-white/10 bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">AI Research Assistant</h2>
            <p className="text-white/70 text-sm">
              Plan dating-app episodes with AI or manually. Save briefs for guest prep and scheduling.
            </p>
          </Link>

          {/* Episode Manager Card */}
          <div className="border border-white/10 bg-white/5 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Episode Manager</h2>
            <p className="text-white/70 text-sm">
              Manage your podcast episodes, track progress, and monitor performance.
            </p>
          </div>

          {/* Guest Management Card */}
          <div className="border border-white/10 bg-white/5 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Guest Management</h2>
            <p className="text-white/70 text-sm">
              Coordinate with guests, send reminders, and prepare interview briefs.
            </p>
          </div>

          {/* Analytics Card */}
          <div className="border border-white/10 bg-white/5 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Analytics</h2>
            <p className="text-white/70 text-sm">
              Track listener growth, engagement metrics, and episode performance.
            </p>
          </div>

          {/* Sponsorship Card */}
          <div className="border border-white/10 bg-white/5 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Sponsorship</h2>
            <p className="text-white/70 text-sm">
              Manage sponsor relationships, track campaigns, and generate reports.
            </p>
          </div>

          {/* Settings Card */}
          <div className="border border-white/10 bg-white/5 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Settings</h2>
            <p className="text-white/70 text-sm">
              Configure your podcast settings, team members, and integrations.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
