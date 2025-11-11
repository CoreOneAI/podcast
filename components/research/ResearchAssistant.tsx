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
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';

type Mode = 'ai' | 'manual';

export function ResearchAssistant() {
  const [mode, setMode] = useState<Mode>('ai');
  const [topic, setTopic] = useState('');
  const [assistLevel, setAssistLevel] = useState(70);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  function handleGenerate() {
    if (!topic.trim()) {
      setStatus('Please enter a topic or keywords first.');
      return;
    }

    setIsGenerating(true);
    setStatus(null);

    const intensity = assistLevel / 100;
    const base = topic.trim();

    const generatedTitle =
      intensity > 0.5
        ? `Encore Dating: ${base} – On-Air Deep Dive`
        : base;

    const generatedDescription =
      intensity > 0.5
        ? `A dating-app style conversation exploring ${base}, framed like a TV interview with real tension, red flags, and green lights.`
        : `Discussion of ${base} for the Encore dating show.`;

    const generatedQuestions = [
      'What is the core dating scenario here?',
      'Where is the tension or conflict for the guest?',
      'What is the “hook” that would make someone stay through an ad break?',
      'What outcome or lesson should the audience walk away with?',
    ].join('\n• ');

    setTitle(generatedTitle);
    setDescription(generatedDescription);
    setQuestions(`• ${generatedQuestions}`);

    setStatus('Draft generated. Review and tweak before saving.');

    // tiny fake delay so the button state feels natural
    if (typeof window !== 'undefined') {
      window.setTimeout(() => setIsGenerating(false), 300);
    } else {
      setIsGenerating(false);
    }
  }

  function handleSaveLocal() {
    const payload = {
      mode,
      topic,
      assistLevel,
      title,
      description,
      questions,
      savedAt: new Date().toISOString(),
    };

    if (typeof window === 'undefined') {
      setStatus('Local save only works in the browser.');
      return;
    }

    try {
      const existing = window.localStorage.getItem('encore-briefs');
      const parsed = existing ? JSON.parse(existing) : [];
      parsed.push(payload);
      window.localStorage.setItem('encore-briefs', JSON.stringify(parsed));
      setStatus(
        'Saved locally in this browser. In a future version this will also update the dashboard and calendar.',
      );
    } catch {
      setStatus('Could not save locally (storage error).');
    }
  }

  function handlePrint() {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }

  return (
    <section className="max-w-4xl space-y-4">
      {/* Header row with title + actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            AI Research Assistant
          </h1>
          <p className="text-sm text-slate-400">
            Plan dating-app episodes with AI or manually, then save or print a
            clean brief for your host and guests.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-white/10"
          >
            Print / Save as PDF
          </button>
          <Link
            href="/"
            className="rounded-lg border border-transparent bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-50 hover:bg-slate-600"
          >
            Cancel &amp; go home
          </Link>
        </div>
      </div>

      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>Episode brief</CardTitle>
          <CardDescription>
            Use AI Assist for structure, or switch to Manual mode if you already
            know the beats. Perfect for TV-style interview prep.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Mode toggle + AI controls */}
          <Tabs
            value={mode}
            onValueChange={(v) => setMode(v as Mode)}
          >
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="ai">AI Assist</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>

            {/* AI mode */}
            <TabsContent value="ai" className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-200">
                  Describe the episode (dating scenario, tension, desired angle)
                </label>
                <Textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={4}
                  placeholder="Example: Two people matched on a dating app but one has a secret they haven’t revealed yet…"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>AI Assist Level</span>
                  <span>{assistLevel}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={assistLevel}
                  onChange={(e) =>
                    setAssistLevel(Number(e.target.value) || 0)
                  }
                  className="w-full"
                />
                <p className="text-[11px] text-slate-500">
                  0% = mostly manual. 100% = let the assistant strongly shape
                  the title, description, and beats.
                </p>
              </div>

              <Button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating…' : 'Generate brief'}
              </Button>
            </TabsContent>

            {/* Manual mode helper copy */}
            <TabsContent value="manual" className="pt-4">
              <p className="text-xs text-slate-400">
                Manual mode leaves the structure completely to you. Use this
                when the showrunner already has a clear outline.
              </p>
            </TabsContent>
          </Tabs>

          {/* Brief fields – shared by AI + Manual */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Episode title
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: The Secret Match: When Your Profile Isn’t the Whole Story"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Description (for run-of-show & platforms)
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Short description of what happens in the segment and why it matters to the audience."
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-200">
                Key questions / beats
              </label>
              <Textarea
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                rows={10}
                placeholder={`• Opening question\n• Where does the tension show up?\n• What’s the turning point?\n• How do we land the ending?`}
              />
            </div>
          </div>

          {/* Actions + status */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={handleSaveLocal}
              >
                Save brief (local)
              </Button>
            </div>
            {status && (
              <p className="text-xs text-slate-400 max-w-md">{status}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
