'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Parse tokens from the URL hash (Supabase puts them after #)
function useHashParams() {
  return useMemo(() => {
    if (typeof window === 'undefined') return new URLSearchParams();
    return new URLSearchParams(window.location.hash.replace(/^#/, ''));
  }, []);
}

export default function SetPasswordPage() {
  const params = useHashParams();
  const [ready, setReady] = useState(false);
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // If the invite/reset link includes tokens, set the session so updateUser works.
  useEffect(() => {
    (async () => {
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');
      if (access_token && refresh_token) {
        await supabase.auth.setSession({ access_token, refresh_token });
      }
      setReady(true);
    })();
  }, [params]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (pw1.length < 8) {
      setErr('Password must be at least 8 characters.');
      return;
    }
    if (pw1 !== pw2) {
      setErr('Passwords do not match.');
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw1 });
    setBusy(false);
    if (error) {
      setErr(error.message);
      return;
    }
    // After setting password, go to dashboard (home)
    window.location.assign('/');
  };

  if (!ready) {
    return (
      <main className="min-h-screen grid place-items-center bg-black text-white">
        <p>Loading…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen grid place-items-center bg-black">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
        <h1 className="text-2xl font-semibold mb-2">Set your password</h1>
        <p className="text-sm text-white/70 mb-6">
          You arrived here from an invite or reset email. Choose a new password to finish.
        </p>

        <form onSubmit={save} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">New password</label>
            <input
              className="w-full rounded-md bg-white/10 border border-white/10 px-3 py-2 outline-none"
              type="password"
              value={pw1}
              onChange={e => setPw1(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Confirm password</label>
            <input
              className="w-full rounded-md bg-white/10 border border-white/10 px-3 py-2 outline-none"
              type="password"
              value={pw2}
              onChange={e => setPw2(e.target.value)}
              required
            />
          </div>
          {err && <p className="text-red-400 text-sm">{err}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-white text-black py-2 font-medium disabled:opacity-60"
          >
            {busy ? 'Saving…' : 'Save password'}
          </button>
        </form>

        <div className="mt-4 text-right">
          <a href="/" className="text-sm text-white/80 hover:text-white underline underline-offset-4">
            Back to dashboard
          </a>
        </div>
      </div>
    </main>
  );
}
