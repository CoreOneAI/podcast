'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      setErr(error.message);
      return;
    }
    // go to dashboard (home)
    window.location.assign('/');
  };

  const sendReset = async () => {
    setErr(null);
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://encorepodcast.netlify.app/auth/set-password',
    });
    setBusy(false);
    if (error) setErr(error.message);
    else alert('Password reset link sent (check your email).');
  };

  return (
    <main className="min-h-screen grid place-items-center bg-black">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
        <h1 className="text-2xl font-semibold mb-2">Encore Podcast Portal</h1>
        <p className="text-sm text-white/70 mb-6">
          Sign in with email and password.
        </p>
        <form onSubmit={signIn} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              className="w-full rounded-md bg-white/10 border border-white/10 px-3 py-2 outline-none"
              type="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              className="w-full rounded-md bg-white/10 border border-white/10 px-3 py-2 outline-none"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {err && <p className="text-red-400 text-sm">{err}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-white text-black py-2 font-medium disabled:opacity-60"
          >
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={sendReset}
            disabled={busy || !email}
            className="text-sm text-white/80 hover:text-white underline underline-offset-4 disabled:opacity-60"
            type="button"
          >
            Forgot password? Send reset link
          </button>
          <a href="https://encorepodcast.netlify.app/dashboard" className="text-sm text-white/80 hover:text-white underline underline-offset-4">
            Back to portal
          </a>
        </div>
      </div>
    </main>
  );
}
