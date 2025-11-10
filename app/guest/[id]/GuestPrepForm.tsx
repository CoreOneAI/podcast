'use client';

import { useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

type Guest = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  dating_app: string | null;
  episode_angle: string | null;
  bio: string | null;
  story_summary: string | null;
  red_flags: string | null;
  green_flags: string | null;
  host_notes: string | null;
  avatar_url: string | null;
};

export function GuestPrepForm({ guest }: { guest: Guest }) {
  const supabase = createSupabaseBrowserClient();

  const [name, setName] = useState(guest.name ?? '');
  const [email, setEmail] = useState(guest.email ?? '');
  const [phone, setPhone] = useState(guest.phone ?? '');
  const [datingApp, setDatingApp] = useState(guest.dating_app ?? '');
  const [episodeAngle, setEpisodeAngle] = useState(guest.episode_angle ?? '');
  const [bio, setBio] = useState(guest.bio ?? '');
  const [storySummary, setStorySummary] = useState(guest.story_summary ?? '');
  const [redFlags, setRedFlags] = useState(guest.red_flags ?? '');
  const [greenFlags, setGreenFlags] = useState(guest.green_flags ?? '');
  const [hostNotes, setHostNotes] = useState(guest.host_notes ?? '');
  const [avatarUrl, setAvatarUrl] = useState(guest.avatar_url ?? '');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const filePath = `guest-${guest.id}-${Date.now()}.jpg`;

      const { error } = await supabase.storage
        .from('guest-avatars')
        .upload(filePath, file);

      if (error) {
        console.error(error);
        alert('Failed to upload image.');
        return;
      }

      const { data } = supabase.storage
        .from('guest-avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(data.publicUrl);
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSave() {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('guests')
        .update({
          name,
          email,
          phone,
          dating_app: datingApp,
          episode_angle: episodeAngle,
          bio,
          story_summary: storySummary,
          red_flags: redFlags,
          green_flags: greenFlags,
          host_notes: hostNotes,
          avatar_url: avatarUrl,
        })
        .eq('id', guest.id);

      if (error) {
        console.error(error);
        alert('Failed to save guest.');
      } else {
        alert('Guest saved.');
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Guest profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={name} />
              ) : (
                <AvatarFallback>{name?.[0] ?? '?'}</AvatarFallback>
              )}
            </Avatar>
            <div className="space-y-1 text-xs text-slate-400">
              <div>Upload a headshot for your episode and social clips.</div>
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
              {isUploading && <div>Uploading…</div>}
            </div>
          </div>

          <Input
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            placeholder="Phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <Input
            placeholder="Dating app (Hinge, Tinder, Bumble...)"
            value={datingApp}
            onChange={e => setDatingApp(e.target.value)}
          />
          <Input
            placeholder="Episode angle (e.g. 'Three green flags & one walking red flag')"
            value={episodeAngle}
            onChange={e => setEpisodeAngle(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interview prep</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            rows={3}
            placeholder="Short bio – what should listeners know about them?"
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
          <Textarea
            rows={3}
            placeholder="Story summary – what's their dating situation or core story?"
            value={storySummary}
            onChange={e => setStorySummary(e.target.value)}
          />
          <Textarea
            rows={3}
            placeholder="Green flags (what’s going right, redeeming qualities)"
            value={greenFlags}
            onChange={e => setGreenFlags(e.target.value)}
          />
          <Textarea
            rows={3}
            placeholder="Red flags / off-limits topics (things to tread lightly around)"
            value={redFlags}
            onChange={e => setRedFlags(e.target.value)}
          />
          <Textarea
            rows={3}
            placeholder="Host notes – beats, transitions, killer lines to hit."
            value={hostNotes}
            onChange={e => setHostNotes(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving…' : 'Save guest'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
