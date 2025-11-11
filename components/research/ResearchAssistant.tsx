'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PrintButton from '@/components/PrintButton';

type Mode = 'ai' | 'manual';

export default function ResearchAssistant() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('ai');

  const [topic, setTopic] = useState('');
  const [guestName, setGuestName] = useState('');
  const [assistLevel, setAssistLevel] = useState(70);
  const [notes, setNotes] = useState('');

  const [outline, setOutline] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleGenerate() {
    setIsGenerating(true);
    try {
      const title = guestName
        ? `Encore Dating Lab: ${guestName} on ${topic || 'modern dating'}`
        : `Encore Dating Lab: ${topic || 'modern dating'}`;

      const description =
        `A candid, TV-style conversation about ${topic || 'dating'} — ` +
        `framed for listeners who feel like contestants trying to win at love.`;

      const bullets = [
        'Origin story & past relationships that shaped today',
        'Biggest dating challenges right now',
        'Red flags, green flags, and non-negotiables',
        'One real scenario from the guest’s life to break down',
        'On-air “experiment” or challenge for the guest',
      ];

      const text =
        `Episode title:\n${title}\n\n` +
        `Short description:\n${description}\n\n` +
        `Talking points:\n` +
        bullets.map((b, i) => `${i + 1}. ${b}`).join('\n') +
        (notes ? `\n\nHost notes:\n${notes}` : '');

      setOutline(text);
    } finally {
      setIsGenerating(false);
    }
  }

  function handleCancel() {
    router.push('/'); // back to main dashboard
  }

  return (
    <div className="space-y-6">
      <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
        <TabsList className="mb-4">
          <TabsTrigger value="ai">AI Assist</TabsTrigger>
          <TabsTrigger value="manual">Manual Prep</TabsTrigger>
        </TabsList>

        {/* AI MODE */}
        <TabsContent value="ai" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Left column: inputs */}
            <div className="space-y-3">
              <label className="text-xs font-medium text-slate-200">
                Topic / hook for this episode
                <Input
                  className="mt-1"
                  placeholder="e.g. First-date rules in the app era"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </label>

              <label className="text-xs font-medium text-slate-200">
                Guest name
                <Input
                  className="mt-1"
                  placeholder="e.g. Taylor, 34 — recently back on the apps"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
              </label>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>AI Assist level</span>
                  <span>{assistLevel}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={assistLevel}
                  onChange={(e) => setAssistLevel(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-[11px] text-slate-400">
                  0% = mostly your notes. 100% = let the assistant fully shape
                  the brief.
                </p>
              </div>

              <label className="text-xs font-medium text-slate-200">
                Host notes / must-hit beats
                <Textarea
                  className="mt-1 min-h-[96px]"
                  placeholder="Specific stories, boundaries, or questions you want to cover…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </label>
            </div>

            {/* Right column: preview + actions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-200">
                  Episode brief preview
                </span>
                <div className="flex items-center gap-2">
                  <PrintButton />
                  <Button
                    type="button"
                    onClick={handleCancel}
                    className="text-[11px] border border-white/20 bg-transparent px-3 py-1 text-slate-200 hover:bg-white/10"
                  >
                    Cancel &amp; go home
                  </Button>
                </div>
              </div>
              <Textarea
                className="mt-1 min-h-[220px]"
                value={outline}
                onChange={(e) => setOutline(e.target.value)}
                placeholder="Your episode brief will appear here after you hit Generate."
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="text-sm px-4 py-2"
            >
              {isGenerating ? 'Generating…' : 'Generate brief'}
            </Button>
          </div>
        </TabsContent>

        {/* MANUAL MODE */}
        <TabsContent value="manual" className="space-y-4">
          <p className="text-xs text-slate-300">
            Prefer to prep like a classic TV producer? Fill everything in by
            hand — you can still print or export later.
          </p>

          <div className="space-y-3">
            <label className="text-xs font-medium text-slate-200">
              Full prep notes
              <Textarea
                className="mt-1 min-h-[260px]"
                value={outline}
                onChange={(e) => setOutline(e.target.value)}
                placeholder="Outline your beats, questions, and segments for this guest…"
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              onClick={handleCancel}
              className="text-[11px] border border-white/20 bg-transparent px-3 py-1 text-slate-200 hover:bg-white/10"
            >
              Cancel &amp; go home
            </Button>
            <div className="flex items-center gap-2">
              <PrintButton />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
