// app/research/page.tsx
import React from 'react';
import ResearchAssistant from '@/components/research/ResearchAssistant';

export default function Page() {
  // No extra <h1> or <p> here — the component handles its own header.
  return (
    <main className="p-4 sm:p-6">
      <ResearchAssistant />
    </main>
  );
}


export default async function ResearchPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect this route – if not logged in, send to auth
  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            AI Research Assistant
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Plan dating-app episodes with AI or manually. Save briefs so they
            can be used for guest prep and scheduling.
          </p>
        </div>

        {/* Back link – if you’d rather go to login, change href to "/auth/login" */}
        <Link
          href="/dashboard"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10"
        >
          Back to dashboard
        </Link>
      </div>

      <ResearchAssistant />
    </div>
  );
}
