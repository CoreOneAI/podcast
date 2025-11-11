// components/guest/NewGuestForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type Mode = 'ai' | 'manual';

export function NewGuestForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('ai');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [topic, setTopic] = useState('');
  const [prepDate, setPrepDate] = useState('');
  const [notes, setNotes] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const supabase = createClient();

      let avatarUrl: string | null = null;

      if (avatarFile) {
        const ext = avatarFile.name.split('.').pop() ?? 'jpg';
        const fileName = `${crypto.randomUUID()}.${ext}`;
        const filePath = `guests/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('guest-avatars')
          .upload(filePath, avatarFile);

        if (uploadError) {
          console.error(uploadError);
          setError('Could not upload guest photo.');
          setIsSaving(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from('guest-avatars')
          .getPublicUrl(filePath);

        avatarUrl = publicUrlData.publicUrl ?? null;
      }

      const { error: insertError } = await supabase.from('guests').insert({
        name,
        email,
        phone,
        bio,
        topic,
        prep_date: prepDate || null,
        notes,
        avatar_url: avatarUrl,
      });

      if (insertError) {
        console.error(insertError);
        setError(insertError.message ?? 'Unable to save guest.');
        setIsSaving(false);
        return;
      }

      // Clear form
      setName('');
      setEmail('');
      setPhone('');
      setBio('');
      setTopic('');
      setPrepDate('');
      setNotes('');
      setAvatarFile(null);

      // Refresh server-rendered guests list
      router.refresh();
    } catch (err) {
      console.error(err);
      setError('Something went wrong saving the guest.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 via-slate-900/60 to-slate-900/80 p-5 shadow-lg shadow-emerald-900/20">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-white">
            New guest prep
          </h2>
          <p className="text-xs text-slate-300">
            Capture everything your host needs to walk into a TV-style
            dating interview fully prepared.
          </p>
        </div>

        {/* Simple mode toggle: AI vs Manual */}
        <div className="flex items-center gap-1 rounded-full bg-black/40 p-1 text-[11px] text-slate-200">
          <button
            type="button"
            onClick={() => setMode('ai')}
            className={`rounded-full px-2 py-1 ${
              mode === 'ai'
                ? 'bg-emerald-500 text-black'
                : 'bg-transparent text-slate-300'
            }`}
          >
            AI assist
          </button>
          <button
            type="button"
            onClick={() => setMode('manual')}
            className={`rounded-full px-2 py-1 ${
              mode === 'manual'
                ? 'bg-emerald-500 text-black'
                : 'bg-transparent text-slate-300'
            }`}
          >
            Manual
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-4 grid gap-3 md:grid-cols-2"
      >
        {/* Left column: identity + contacts */}
        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-200">Guest name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dr. Maya Ortiz"
              className="mt-1 bg-black/40 text-sm text-white"
              required
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs text-slate-200">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="guest@example.com"
                className="mt-1 bg-black/40 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-200">Phone</label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="mt-1 bg-black/40 text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-200">
              Headshot / avatar
            </label>
            <Input
              type="file"
              accept="image/*"
              className="mt-1 bg-black/40 text-sm text-white"
              onChange={(e) =>
                setAvatarFile(e.target.files?.[0] ?? null)
              }
            />
            <p className="mt-1 text-[10px] text-slate-400">
              Stored in Supabase Storage (bucket: <code>guest-avatars</code>).
            </p>
          </div>
        </div>

        {/* Right column: TV-style prep */}
        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-200">
              Segment focus / topic
            </label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. First-date red flags on apps"
              className="mt-1 bg-black/40 text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs text-slate-200">
              Bio highlight (short)
            </label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="One-paragraph intro your host can read on air."
              className="mt-1 h-20 bg-black/40 text-xs text-slate-100"
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs text-slate-200">
                Recording / interview date
              </label>
              <Input
                type="date"
                value={prepDate}
                onChange={(e) => setPrepDate(e.target.value)}
                className="mt-1 bg-black/40 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-200">
                Backstage notes
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Boundaries, sensitive topics, do-not-ask list, chemistry notes…"
                className="mt-1 h-20 bg-black/40 text-xs text-slate-100"
              />
            </div>
          </div>

          {/* AI vs Manual explanation (you already have AI elsewhere, this is UX only for now) */}
          <p className="text-[10px] text-slate-400">
            <span className="font-medium text-emerald-300">AI mode:</span>{' '}
            later we can auto-draft intros, questions, and talking
            points for your dating-show format. For now this toggle is
            just visual, but the saved data is the same.
          </p>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-emerald-500 text-sm font-medium text-black hover:bg-emerald-400"
            >
              {isSaving ? 'Saving…' : 'Save guest'}
            </Button>
          </div>

          {error && (
            <p className="text-xs text-red-400">
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
