'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';

export default function NewGuestForm() {
  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [topic, setTopic] = useState('');
  const [bio, setBio] = useState('');
  const [notes, setNotes] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const supabase = createSupabaseBrowserClient();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    try {
      const { error } = await supabase.from('guests').insert({
        name,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        topic,
        bio,
        notes,
        preferred_recording_at: preferredDate || null,
      });

      if (error) throw error;

      setSuccess('Guest added!');
      setName('');
      setContactEmail('');
      setContactPhone('');
      setTopic('');
      setBio('');
      setNotes('');
      setPreferredDate('');
    } catch (err: any) {
      setError(err.message ?? 'Failed to add guest');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-200">Guest name</label>
          <Input
            className="mt-1 bg-slate-900/60 border-slate-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Taylor from Hinge Date Ep. 3"
            required
          />
        </div>
        <div>
          <label className="text-sm text-slate-200">Topic / angle</label>
          <Input
            className="mt-1 bg-slate-900/60 border-slate-700"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="First dates & red flags"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-200">Contact email</label>
          <Input
            type="email"
            className="mt-1 bg-slate-900/60 border-slate-700"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="guest@example.com"
          />
        </div>
        <div>
          <label className="text-sm text-slate-200">Contact phone</label>
          <Input
            className="mt-1 bg-slate-900/60 border-slate-700"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-slate-200">Preferred recording date</label>
        <Input
          type="datetime-local"
          className="mt-1 bg-slate-900/60 border-slate-700"
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-slate-200">Short bio</label>
        <Textarea
          className="mt-1 bg-slate-900/60 border-slate-700 min-h-[100px]"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Dating background, profession, on-air comfort level…"
        />
      </div>

      <div>
        <label className="text-sm text-slate-200">Host prep notes</label>
        <Textarea
          className="mt-1 bg-slate-900/60 border-slate-700 min-h-[80px]"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What to avoid, key stories to hit, any sensitivities…"
        />
      </div>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm text-emerald-400">
          {success}
        </p>
      )}

      <Button type="submit" disabled={isSaving}>
        {isSaving ? 'Saving…' : 'Add guest'}
      </Button>
    </form>
  );
}
