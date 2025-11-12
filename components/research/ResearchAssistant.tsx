// components/research/ResearchAssistant.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Mode = 'ai' | 'manual';

export default function ResearchAssistant() {
  const [mode, setMode] = useState<Mode>('ai');
  const [aiLevel, setAiLevel] = useState(70);

  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [beats, setBeats] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleGenerate() {
    if (!topic.trim()) {
      setMessage('Add a topic or keywords first.');
      return;
    }

    setIsGenerating(true);
    setMessage(null);

    try {
      const baseTitle = `Dating Dilemma: ${topic.trim()}`;
      const assistLabel =
        aiLevel >= 80
          ? 'AI-shaped episode'
          : aiLevel <= 20
          ? 'Host-driven episode'
          : 'Co-created episode';

      setTitle(baseTitle);
      setDescription(
        `${assistLabel} for a dating-app conversation built around: ${topic.trim()}. ` +
          'Explore red flags, green flags, and what this guest has learned from modern dating.'
      );

      setBeats(
        [
          '• How they actually use dating apps right now.',
          '• One great date and what made it work.',
          '• One terrible date and what it revealed.',
          '• Where they are now and what they want next.',
        ].join('\n')
      );
    } finally {
      setIsGenerating(false);
    }
  }

  const previewTitle = title || 'Working title goes here';
  const previewDescription =
    description ||
    'One-paragraph setup of the dating situation, the tension, and what we want the audience to feel.';
  const previewBeats =
    beats ||
    [
      '• How they describe their dating-app personality.',
      '• One great date and what made it work.',
      '• One disastrous date and what it revealed.',
      '• Where they are now and what they want next.',
    ].join('\n');

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Page header (centered) */}
      <header className="text-center space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          AI Research Assistant
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          Plan dating-app episodes with AI or manually. Save briefs so they can
          be used for guest prep and scheduling.
        </p>
        <div className="text-[0.7rem] text-slate-400">
          <Link
            href="https://encorepodcast.netlify.app/dashboard"
            className="underline underline-offset-4 hover:text-white hover:no-underline"
          >
            Back to dashboard
          </Link>
        </div>
      </header>

      {/* Mode / slider card */}
      <Card className="border-white/10 bg-black/40">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-sm text-white">
              Assistant mode &amp; intensity
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Choose between AI-assisted planning or mostly manual. The slider
              controls how strongly the assistant shapes your outline.
            </CardDescription>
          </div>

          <div className="flex flex-col items-stretch gap-3 sm:w-72">
            {/* Manual / AI toggle */}
            <div className="flex items-center justify-between text-xs text-slate-300">
              <button
                type="button"
                onClick={() => setMode('manual')}
                className={`rounded-full px-3 py-1 text-xs ${
                  mode === 'manual'
                    ? 'bg-white text-black'
                    : 'border border-white/20 text-slate-300 hover:border-white/40'
                }`}
              >
                Manual
              </button>
              <button
                type="button"
                onClick={() => setMode('ai')}
                className={`rounded-full px-3 py-1 text-xs ${
                  mode === 'ai'
                    ? 'bg-white text-black'
                    : 'border border-white/20 text-slate-300 hover:border-white/40'
                }`}
              >
                AI Assist
              </button>
            </div>

            {/* Slider */}
            <div className="space-y-1">
              <input
                type="range"
                min={0}
                max={100}
                value={aiLevel}
                onChange={(e) => setAiLevel(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[0.7rem] text-slate-400">
                <span>0% — host-driven</span>
                <span>{aiLevel}%</span>
                <span>100% — AI-shaped</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        {/* LEFT: Input form */}
        <Card className="border-white/10 bg-black/40">
          <CardHeader>
            <CardTitle className="text-sm text-white">Episode inputs</CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Dating scenario, tension, and the angle you want the guest to help
              explore.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Topic */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-200">
                Topic / keywords
              </label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Example: ‘Ghosted after 3 great dates’, ‘Dating while co-parenting’"
              />
            </div>

            {/* Title */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-200">
                Episode title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Dating Dilemma: …"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-200">
                Short description
              </label>
              <Textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="One-paragraph description for the run-of-show or show notes."
              />
            </div>

            {/* Beats */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-200">
                Key questions / beats
              </label>
              <Textarea
                rows={5}
                value={beats}
                onChange={(e) => setBeats(e.target.value)}
                placeholder="Bullet points for segment flow, must-ask questions, and reveals."
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <Button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || mode !== 'ai'}
                className="text-xs"
              >
                {isGenerating ? 'Generating…' : 'Generate with AI'}
              </Button>
            </div>

            {message && (
              <p className="text-[0.72rem] text-slate-300" role="status">
                {message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* RIGHT: Preview card */}
        <Card className="border-white/10 bg-black/30">
          <CardHeader>
            <CardTitle className="text-sm text-white">
              Guest-facing brief
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              This is what you can email or read from during the segment.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 text-sm">
            {/* Title preview */}
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-400">
                Episode title
              </p>
              <p className="mt-1 text-base font-semibold text-white">
                {previewTitle}
              </p>
            </div>

            {/* Description preview */}
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-400">
                Setup
              </p>
              <p className="mt-1 text-sm text-slate-200">{previewDescription}</p>
            </div>

            {/* Beats preview */}
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-400">
                Key beats
              </p>
              <pre className="mt-1 whitespace-pre-wrap rounded-md bg-black/40 p-3 text-[0.78rem] text-slate-100">
                {previewBeats}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
