'use client';

import {
  useState,
  FormEvent,
  ChangeEvent,
} from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type GuestFormState = {
  name: string;
  email: string;
  phone: string;
  bio: string;
  topic: string;
  notes: string;
  preferredDate: string; // yyyy-MM-dd or datetime-local
  avatarFile: File | null;
};

export function NewGuestForm() {
  const router = useRouter();
  const [form, setForm] = useState<GuestFormState>({
    name: '',
    email: '',
    phone: '',
    bio: '',
    topic: '',
    notes: '',
    preferredDate: '',
    avatarFile: null,
  });
  const [isSaving, setIsSaving] = useState(false);

  function update<K extends keyof GuestFormState>(
    key: K,
    value: GuestFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    update('avatarFile', file);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      alert('Guest name is required.');
      return;
    }

    setIsSaving(true);
    try {
      const supabase = createSupabaseBrowserClient();
      let avatarUrl: string | null = null;

      if (form.avatarFile) {
        const file = form.avatarFile;
        const ext = file.name.split('.').pop() || 'jpg';
        const path = `guest-${Date.now()}.${ext}`;

        const { data: uploadData, error: uploadError } =
          await supabase.storage.from('guest-avatars').upload(path, file);

        if (uploadError) {
          console.error(uploadError);
          alert('Avatar upload failed, but the guest will still be saved.');
        } else if (uploadData) {
          const { data } = supabase.storage
            .from('guest-avatars')
            .getPublicUrl(uploadData.path);
          avatarUrl = data.publicUrl;
        }
      }

      const isoDate = form.preferredDate
        ? new Date(form.preferredDate).toISOString()
        : null;

      const { error } = await supabase.from('guests').insert({
        name: form.name.trim(),
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        bio: form.bio.trim() || null,
        topic: form.topic.trim() || null,
        notes: form.notes.trim() || null,
        first_appearance_at: isoDate,
        avatar_url: avatarUrl,
      });

      if (error) {
        console.error(error);
        alert('Could not save guest.');
        return;
      }

      // Reset form
      setForm({
        name: '',
        email: '',
        phone: '',
        bio: '',
        topic: '',
        notes: '',
        preferredDate: '',
        avatarFile: null,
      });

      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-white">Add guest</h2>
          <p className="text-xs text-slate-400">
            Think of this like a TV interview prep card.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs text-slate-400">Name</label>
          <Input
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Taylor, the guest"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-slate-400">Email</label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="guest@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-slate-400">Phone</label>
          <Input
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-slate-400">
            Preferred recording date
          </label>
          <Input
            type="date"
            value={form.preferredDate}
            onChange={(e) => update('preferredDate', e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs text-slate-400">Bio</label>
          <Textarea
            rows={3}
            value={form.bio}
            onChange={(e) => update('bio', e.target.value)}
            placeholder="Short TV-style intro you’d read on air."
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-slate-400">Topic / angle</label>
          <Textarea
            rows={3}
            value={form.topic}
            onChange={(e) => update('topic', e.target.value)}
            placeholder="Dating-app angle, tension, or story hook for this guest."
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-slate-400">Notes</label>
        <Textarea
          rows={3}
          value={form.notes}
          onChange={(e) => update('notes', e.target.value)}
          placeholder="Backstory, sensitive topics to avoid, must-hit moments."
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-slate-400">Guest photo</label>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
        <p className="text-[11px] text-slate-500">
          Used as their avatar in the portal and prep view.
        </p>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSaving || !form.name.trim()}
          className="px-3 py-1 text-sm"
        >
          {isSaving ? 'Saving guest…' : 'Save guest'}
        </Button>
      </div>
    </form>
  );
}
