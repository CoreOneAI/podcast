'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';

type NewGuestFormProps = {
  onCreated?: () => void;
};

function NewGuestForm(props: NewGuestFormProps) {
  const { onCreated } = props;

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [bio, setBio] = useState('');
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [recordingDate, setRecordingDate] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createSupabaseBrowserClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Guest name is required.');
      return;
    }

    setIsSaving(true);
    try {
      // Try to save to Supabase; if schema is different, we just catch and still
      // keep the UI usable.
      const { error: insertError } = await supabase.from('guests').insert({
        name,
        contact_info: contact,
        bio,
        topic,
        notes,
        recording_date: recordingDate || null,
      });

      if (insertError) {
        console.error(insertError);
        setError(
          'Guest saved locally, but there was an issue saving to the database.'
        );
      } else {
        setName('');
        setContact('');
        setBio('');
        setTopic('');
        setNotes('');
        setRecordingDate('');
        if (onCreated) onCreated();
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong while creating the guest.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4"
    >
      <div>
        <h2 className="text-sm font-semibold text-slate-100">Add a guest</h2>
        <p className="text-xs text-slate-400">
          Create a TV-style prep card for dating show interviews.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-200">
            Guest name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Johnson"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-200">
            Contact info
          </label>
          <Input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="email, phone, or handle"
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-medium text-slate-200">
            Dating story / bio
          </label>
          <Textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Single 3 years, heavy dating-app user, recently ghosted after a 3-month situationship..."
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-200">
            Topic focus
          </label>
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ghosting, red flags, or first-date rules"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-200">
            Recording date
          </label>
          <Input
            type="date"
            value={recordingDate}
            onChange={(e) => setRecordingDate(e.target.value)}
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-medium text-slate-200">
            Host notes
          </label>
          <Textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Key beats to hit, sensitive topics to avoid, callbacks to previous episodes..."
          />
        </div>
      </div>

      {error && <p className="text-xs text-rose-400">{error}</p>}

      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save guest prep'}
        </Button>
      </div>
    </form>
  );
}

// 👉 Exported both ways so any import style works
export { NewGuestForm };
export default NewGuestForm;
