'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PrintButton from '@/components/PrintButton';

type Mode = 'ai' | 'manual';

export default function ResearchAssistant() {
  const [mode, setMode] = useState<Mode>('ai');
  const [assistLevel, setAssistLevel] = useState(70);
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState('');
  const [recordingDate, setRecordingDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (mode === 'manual') return;
    if (!topic.trim()) return;

    setIsGenerating(true);

    const base = topic.trim() || 'Dating app scenario';

    setTitle((prev) => prev || `Encore: ${base.slice(0, 60)}`);

    setDescription((prev) => {
      if (prev) return prev;
      const dateBit = recordingDate
        ? ` Recording is currently planned for ${recordingDate}.`
        : '';
      return `A TV-style dating app episode exploring: ${base}. Focus on emotional stakes, red flags, and what the audience can learn.${dateBit}`;
    });

    setQuestions((prev) => {
      if (prev) return prev;
      return [
        'What is the core dating app conflict in this story?',
        'What red flags or green flags should the audience look for?',
        'How does this scenario connect to real-world dating app behavior?',
        'What should our guest be prepared to share vulnerably on camera?',
      ].join('\n');
    });

    setIsGenerating(false);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          AI Research Assistant
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Plan dating-app episodes with AI or manually. Save and print briefs
          so your host and guests are fully prepared.
        </p>
      </div>

      <Card className="border-white/10 bg-black/40">
        <CardHeader className="flex flex-col gap-3 border-b border-white/5 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base text-white">
            Episode Brief
          </CardTitle>

          {/* Mode toggle & AI slider */}
          <div className="flex flex-col items-start gap-2 text-xs text-slate-300 sm:flex-row sm:items-center">
            <div className="inline-flex rounded-full border border-white/10 bg-black/60 p-1 text-[11px]">
              <button
                type="button"
                onClick={() => setMode('ai')}
                className={`rounded-full px-3 py-1 ${
                  mode === 'ai'
                    ? 'bg-white text-black'
                    : 'text-slate-300'
                }`}
              >
                AI Assist
              </button>
              <button
                type="button"
                onClick={() => setMode('manual')}
                className={`rounded-full px-3 py-1 ${
                  mode === 'manual'
                    ? 'bg-white text-black'
                    : 'text-slate-300'
                }`}
              >
                Manual
              </button>
            </div>

            {mode === 'ai' && (
              <div className="flex flex-col gap-1 min-w-[200px]">
                <div className="flex items-center justify-between">
                  <span>AI Assist Level</span>
                  <span className="font-medium text-white">
                    {assistLevel}%
                  </span>
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
                  0% = mostly manual prompts. 100% = let the assistant fully
                  shape the episode structure.
                </p>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-4">
          {/* Topic / keywords */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-200">
              Describe the episode (dating scenario, tension, desired angle)
            </label>
            <Textarea
              placeholder="e.g. Guest matched with two people from the same friend group without realizing, and now everyone is in the same dating app group chat…"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              className="resize-none bg-black/40 text-sm text-slate-100"
            />
          </div>

          {/* Title + recording date */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200">
                Episode title
              </label>
              <Input
                placeholder="e.g. Double Matched Disaster"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-black/40 text-sm text-slate-100"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200">
                Recording date
              </label>
              <Input
                type="date"
                value={recordingDate}
                onChange={(e) => setRecordingDate(e.target.value)}
                className="bg-black/40 text-sm text-slate-100"
              />
              <p className="text-[11px] text-slate-400">
                This date will be part of the brief so you can match it on the
                production calendar.
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-200">
              Description
            </label>
            <Textarea
              placeholder="One-sentence show description you’d put in a TV guide or episode listing."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="resize-none bg-black/40 text-sm text-slate-100"
            />
          </div>

          {/* Key questions / beats */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-200">
              Key questions / beats for the host
            </label>
            <Textarea
              placeholder={`- Opening question to set the scene
- Clarifying the dating app mechanics
- Biggest emotional moment
- Takeaway for the audience`}
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              rows={6}
              className="resize-none bg-black/40 text-sm text-slate-100"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex gap-2">
              {mode === 'ai' && (
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic.trim()}
                  className="bg-white text-black hover:bg-slate-100 text-sm px-4 py-2"
                >
                  {isGenerating ? 'Generating…' : 'Generate brief'}
                </Button>
              )}

              <Link href="/auth/login">
                <Button className="border border-white/20 bg-black/40 text-xs text-slate-100 hover:bg-white/10 px-3 py-2">
                  Cancel &amp; return to login
                </Button>
              </Link>
            </div>

            <PrintButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
