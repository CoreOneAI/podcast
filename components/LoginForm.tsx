'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.replace('/dashboard'); // go to dashboard after auth
    } catch (err: any) {
      setError(err?.message ?? 'Unable to sign in');
    } finally {
      setBusy(false);
    }
  }

  async function onReset() {
    setBusy(true);
    setError(null);
    try {
      const redirectTo = `${window.location.origin}/auth/set-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) throw error;
      alert('Password reset email sent. Check your inbox.');
    } catch (err: any) {
      setError(err?.message ?? 'Could not send reset email');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/60 p-6 shadow-xl">
      <h1 className="mb-2 text-center text-xl font-semibold text-white">Encore Podcast Portal</h1>
      <p className="mb-6 text-center text-sm text-zinc-300">
        Sign in to manage shows, guests, and production.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-zinc-300">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-white outline-none"
            placeholder="you@studio.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-300">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-white outline-none"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-white/90 px-4 py-2 font-medium text-black hover:bg-white disabled:opacity-60"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-zinc-400">Forgot your password?</span>
        <button
          onClick={onReset}
          disabled={busy || !email}
          className="text-zinc-200 underline-offset-4 hover:underline disabled:opacity-60"
        >
          Send reset link
        </button>
      </div>
    </div>
  );
}
