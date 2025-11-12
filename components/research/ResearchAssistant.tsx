// components/research/ResearchAssistant.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { PrintButton } from '@/components/PrintButton';

type Mode = 'ai' | 'manual';

export default function ResearchAssistant() {
  const [mode, setMode] = useState<Mode>('ai');
  const [topic, setTopic] = useState('');
  const [assistLevel, setAssistLevel] = useState(70);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [recordingDate, setRecordingDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleGenerate() {
    if (!topic) return;
    setIsGenerating(true);

    // Simple client-side "AI-ish" helper so nothing breaks in build/runtime.
    // You can later replace this with a real API call.
    const strongAI = assistLevel >= 60;

    const baseTitle =
      title ||
      (strongAI
        ? 'Ghosted Reunion: When Matches Come Face to Face'
        : 'Dating App Confessions');

    const baseDescription =
      description ||
      (strongAI
        ? 'A TV-style dating episode where two app matches who ghosted each other finally sit down in studio to unpack what happened, what they expected, and whether there is still chemistry.'
        : 'A conversation-style episode about modern dating, app culture, and mixed signals.');

    const baseKeyPoints =
      keyPoints ||
      [
        'How they matched and what made them swipe right',
        'Why communication slowed down or stopped',
        'Each person’s version of the “ghosting” moment',
        'What they learned about themselves and modern dating',
        'Producer notes: leave room for a possible “second chance” beat at the end',
      ].join('\n• ');

    setTitle(baseTitle);
    setDescription(baseDescription);
    setKeyPoints(baseKeyPoints);

    setIsGenerating(false);
  }

  function handleClear() {
    setTopic('');
    setTitle('');
    setDescription('');
    setKeyPoints('');
    setRecordingDate('');
  }

  return (
    <div className="space-y-8">
      {/* Centered header */}
      <div className="max-w-3xl mx-auto space-y-1 text-center">
        <h1 className="text-2xl font-semibold text-white">
          AI Research Assistant
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          Plan dating-app episodes with AI or manually. Save briefs so they can
          be used for guest prep and scheduling.
        </p>
      </div>

      {/* Main card, centered */}
      <Card className="border-white/10 bg-black/40 max-w-4xl mx-auto">
        <CardHeader className="flex flex-col gap-3 border-b border-white/5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base text-white">
              Episode Brief
            </CardTitle>
            <p className="mt-1 text-xs text-slate-400">
              Use AI or manual mode. You can print or save this brief for your
              host and guests.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Mode</span>
            <Tabs
              value={mode}
              onValueChange={(val) => setMode(val as Mode)}
              className="rounded-full bg-white/5 p-1"
            >
              <TabsList className="grid grid-cols-2 bg-transparent">
                <TabsTrigger
                  value="ai"
                  className="rounded-full text-xs px-3 py-1"
                >
                  AI Assist
                </TabsTrigger>
                <TabsTrigger
                  value="manual"
                  className="rounded-full text-xs px-3 py-1"
                >
                  Manual
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-4">
          {/* Topic + AI slider */}
          <Tabs value={mode} onValueChange={(val) => setMode(val as Mode)}>
            <TabsContent value="ai" className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-200">
                  Describe the episode (dating scenario, tension, desired angle)
                </label>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ex: Blind date between app matches who ghosted each other after a great first week…"
                  className="bg-black/40 border-white/10 text-sm"
                />
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>AI Assist Level</span>
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
                  <p className="text-[11px] text-slate-500">
                    0% = mostly your outline. 100% = let the assistant shape the
                    episode structure.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-200">
                  Describe the episode in your own words
                </label>
                <Textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={3}
                  placeholder="Outline the dating story, conflict, and what you want the guest to reveal on-camera…"
                  className="bg-black/40 border-white/10 text-sm resize-none"
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Title + date */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200">
                Episode title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: “The Ghosted Reunion”"
                className="bg-black/40 border-white/10 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200">
                Recording date (optional)
              </label>
              <Input
                type="date"
                value={recordingDate}
                onChange={(e) => setRecordingDate(e.target.value)}
                className="bg-black/40 border-white/10 text-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-200">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Short, TV-style description of the episode for your host, producer, or show notes…"
              className="bg-black/40 border-white/10 text-sm resize-none"
            />
          </div>

          {/* Key beats */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-200">
              Key questions / beats
            </label>
            <Textarea
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              rows={4}
              placeholder="Bullet out questions, reveals, and emotional beats you want to hit in the interview…"
              className="bg-black/40 border-white/10 text-sm resize-none"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 border-t border-white/5 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {mode === 'ai' && (
              <Button
                type="button"
                onClick={handleGenerate}
                disabled={!topic || isGenerating}
                className="text-sm"
              >
                {isGenerating ? 'Generating…' : 'Generate from topic'}
              </Button>
            )}
            <Button
              type="button"
              onClick={handleClear}
              className="text-sm border border-white/20 bg-transparent hover:bg-white/10"
            >
              Clear
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <PrintButton />
            <Link
              href="/dashboard"
              className="text-xs text-slate-400 hover:text-slate-200 underline-offset-2 hover:underline"
            >
              ← Back to dashboard
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
