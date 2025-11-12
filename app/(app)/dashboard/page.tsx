// app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Encore Podcast Studio</h1>
          {/* simple sign out link if you want it later:
            <form action={signOut} className="inline">
              <button className="text-sm text-white/70 hover:text-white">Sign out</button>
            </form>
          */}
        </header>

        {/* Your existing dashboard sections/links can live here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/shows" className="block rounded-xl border border-white/10 p-5 hover:bg-white/5">
            <h2 className="font-medium">Shows</h2>
            <p className="text-sm text-white/60">Manage overall formats and planning.</p>
          </a>
          <a href="/guest" className="block rounded-xl border border-white/10 p-5 hover:bg-white/5">
            <h2 className="font-medium">Guests</h2>
            <p className="text-sm text-white/60">Build your recurring guest roster.</p>
          </a>
          <a href="/research" className="block rounded-xl border border-white/10 p-5 hover:bg-white/5">
            <h2 className="font-medium">AI Research Assistant</h2>
            <p className="text-sm text-white/60">Plan episodes with AI or manually.</p>
          </a>
          <a href="/board" className="block rounded-xl border border-white/10 p-5 hover:bg-white/5">
            <h2 className="font-medium">Production Board</h2>
            <p className="text-sm text-white/60">Pipeline view from Planning → Published.</p>
          </a>
        </div>
      </div>
    </main>
  );
}
