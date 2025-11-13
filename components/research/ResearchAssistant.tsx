'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// If you have a UI lib, keep these; otherwise plain divs are fine.
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

type Brief = {
  topic: string;
  title: string;
  description: string;
  questions: string[];
};

export default function ResearchAssistant() {
  const router = useRouter();
  const [mode, setMode] = useState<'ai' | 'manual'>('ai');
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [questions, setQuestions] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const generated: Brief | null = useMemo(() => {
    if (mode !== 'ai' || !topic.trim()) return null;
    // Lightweight client-side mock (replace with your server call if desired)
    const base = topic.trim();
    return {
      topic: base,
      title: `Episode: ${base}`,
      description:
        `Exploring "${base}" for a dating-show angle—stakes, tension, and resolution.`,
      questions: [
        `What’s the “meet” moment around ${base}?`,
        `Where’s the tension or dilemma in ${base}?`,
        `What decision forces movement forward regarding ${base}?`,
        `What’s the resolution or twist connected to ${base}?`,
      ],
    };
  }, [mode, topic]);

  const briefToSave: Brief | null = useMemo(() => {
    if (mode === 'ai') return generated;
    // manual mode requires title/desc/questions
    const qs = questions
      .split('\n')
      .map(q => q.trim())
      .filter(Boolean);
    if (!title.trim() || !desc.trim()) return null;
    return { topic, title, description: desc, questions: qs };
  }, [mode, generated, title, desc, questions, topic]);

  async function handleSave() {
    try {
      setLoading(true);
      // Placeholder save: replace with your API route call if needed
      // await fetch('/api/briefs', { method: 'POST', body: JSON.stringify(briefToSave) })
      // For now just simulate success:
      await new Promise(r => setTimeout(r, 600));
      // Go back to dashboard (home)
      router.push('/');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Top bar with Back to Dashboard */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">AI Research Assistant</h1>
        <Link
          href="/"
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back to Dashboard
        </Link>
      </div>

      <p className="mb-6 text-sm text-slate-600">
        Plan dating-app episodes with AI or manually. Save briefs so they can be used for guest prep and scheduling.
      </p>

      {/* Controls */}
      <Card className="card mb-6">
        <CardHeader>
          <CardTitle className="text-base">Setup</CardTitle>
          <CardDescription>Choose AI or manual, then enter your details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setMode('ai')}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium border ${
                mode === 'ai'
                  ? 'bg-sky-600 text-white border-sky-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              AI mode
            </button>
            <button
              type="button"
              onClick={() => setMode('manual')}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium border ${
                mode === 'manual'
                  ? 'bg-sky-600 text-white border-sky-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              Manual mode
            </button>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Topic / keywords
            </label>
            <input
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g., blind-date at a farmer’s market"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Editor */}
      <Card className="card">
        <CardHeader>
          <CardTitle className="text-base">Episode Brief</CardTitle>
          <CardDescription>Title, description, and key beats.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mode === 'ai' ? (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Suggested title
                </label>
                <input
                  value={generated?.title ?? ''}
                  readOnly
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Suggested description
                </label>
                <textarea
                  value={generated?.description ?? ''}
                  readOnly
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Key questions / beats
                </label>
                <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {(generated?.questions ?? []).map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Episode title
                </label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Give it a working title"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  rows={3}
                  placeholder="Describe the angle, stakes, and desired outcome"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Key questions / beats (one per line)
                </label>
                <textarea
                  value={questions}
                  onChange={e => setQuestions(e.target.value)}
                  rows={4}
                  placeholder="Who meets who?&#10;Where’s the tension?&#10;What decision moves it forward?"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/"
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              onClick={handleSave}
              disabled={!briefToSave || loading}
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Saving…' : 'Save brief'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
