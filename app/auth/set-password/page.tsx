'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

type Phase = 'checking' | 'ready' | 'error' | 'saving' | 'done';

export default function SetPasswordPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('checking');
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  // Create a browser Supabase client without relying on any project utils.
  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) {
      console.warn('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }
    return createClient(url ?? '', anon ?? '');
  }, []);

  // Read tokens from the URL hash and establish a session.
  useEffect(() => {
    (async () => {
      try {
        // Example: #access_token=...&refresh_token=...&type=recovery
        const hash = typeof window !== 'undefined' ? window.location.hash : '';
        const params = new URLSearchParams(hash.replace(/^#/, ''));
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');

        if (!access_token || !refresh_token) {
          setError('This recovery link is invalid or expired. Request a new one.');
          setPhase('error');
          return;
        }

        // Persist the session so updateUser() will be authorized.
        const { data, error: setErr } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        if (setErr || !data.session) {
          setError(setErr?.message ?? 'Could not establish a session from this link.');
          setPhase('error');
          return;
        }

        setPhase('ready');
      } catch (e: any) {
        setError(e?.message ?? 'Unexpected error while parsing the link.');
        setPhase('error');
      }
    })();
  }, [supabase]);

  const disabled = phase === 'saving' || phase === 'checking';

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setError(null);
    setPhase('saving');

    const { error: updErr } = await supabase.auth.updateUser({ password });
    if (updErr) {
      setError(updErr.message);
      setPhase('ready');
      return;
    }

    setPhase('done');
    // Small pause so the success state is visible, then go to dashboard.
    setTimeout(() => router.replace('https://encorepodcast.netlify.app/dashboard'), 300);
  }

  return (
    <main className="min-h-dvh bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
        <h1 className="text-2xl font-semibold">Set your password</h1>
        <p className="mt-2 text-sm text-white/70">
          Choose a new password to finish signing in.
        </p>

        {phase === 'checking' && (
          <div className="mt-6 text-sm text-white/70">Validating your link…</div>
        )}

        {phase === 'error' && (
          <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm">
            {error ?? 'Link invalid or expired.'}
            <div className="mt-3">
              <a
                href="https://encorepodcast.netlify.app/login"
                className="underline decoration-white/40 underline-offset-4"
              >
                Request a new reset link
              </a>
            </div>
          </div>
        )}

        {phase === 'ready' && (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm">
                {error}
              </div>
            )}

            <label className="block">
              <span className="mb-1 block text-sm">New password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 outline-none focus:border-white/40"
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={disabled}
                required
                minLength={8}
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm">Confirm password</span>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 outline-none focus:border-white/40"
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={disabled}
                required
                minLength={8}
              />
            </label>

            <button
              type="submit"
              disabled={disabled}
              className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15 disabled:opacity-50"
            >
              {phase === 'saving' ? 'Saving…' : 'Save password & continue'}
            </button>

            <div className="mt-4 text-center">
              <a
                href="https://encorepodcast.netlify.app/dashboard"
                className="text-xs text-white/60 underline decoration-white/30 underline-offset-4 hover:text-white/80"
              >
                Back to dashboard
              </a>
            </div>
          </form>
        )}

        {phase === 'done' && (
          <div className="mt-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm">
            Password updated. Redirecting…
          </div>
        )}
      </div>
    </main>
  );
}
