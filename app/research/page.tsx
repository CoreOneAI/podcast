// app/research/page.tsx
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import ResearchAssistant from '@/components/research/ResearchAssistant';

export const dynamic = 'force-dynamic';

export default async function ResearchPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // still protect this page – if not logged in, go to login
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
            show on your dashboard and calendar.
          </p>
        </div>

        {/* 🔙 This is the “return” link – now goes to /dashboard */}
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
