'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PrintButton } from '@/components/PrintButton';

type Mode = 'ai' | 'manual';

interface EpisodeBrief {
  title: string;
  description: string;
  questions: string;
}

export default function ResearchAssistant() {
  const [mode, setMode] = useState<Mode>('ai');
  const [topic, setTopic] = useState('');
  const [assistLevel, setAssistLevel] = useState(70);
  const [brief, setBrief] = useState<EpisodeBrief>({
    title: '',
    description: '',
    questions: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);

    try {
      // Simple placeholder “AI” output for now – safe and deterministic
      const cleanTopic = topic.trim();

      const title = cleanTopic
        ? `Dating Dilemma: ${cleanTopic}`
        : 'Untitled dating-show segment';

      const description =
        `Encore Podcast dives into ${cleanTopic || 'a high-stakes dating scenario'} ` +
        `— a TV-style conversation with real emotional stakes.`;

      const questions = [
        'What is the core conflict in this dating story?',
        'How did each person meet and what drew them together?',
        'What is at risk if this doesn’t work out?',
        'What decision point are they facing right now?',
        'What outcome is each person secretly hoping for?',
      ].join('\n');

      setBrief({ title, description, questions });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    setTopic('');
    setBrief({
      title: '',
      description: '',
      questions: '',
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      {/* LEFT: controls + mini calendar */}
      <div className="space-y-4">
        {/* Mode + topic card */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-medium text-slate-100">
              Episode inputs
            </h2>
            <div className="inline-flex items-center rounded-full bg-white/5 p-1 text-[11px] text-slate-300">
              <button
                type="button"
                onClick={() => setMode('ai')}
                className={`rounded-full px-2 py-0.5 transition ${
                  mode === 'ai' ? 'bg-white text-slate-900' : ''
                }`}
              >
                AI assisted
              </button>
              <button
                type="button"
                onClick={() => setMode('manual')}
                className={`rounded-full px-2 py-0.5 transition ${
                  mode === 'manual' ? 'bg-white text-slate-900' : ''
                }`}
              >
                Manual
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Dating scenario / hook
              </label>
              <Input
                placeholder="Exes matched on a dating app, a secret situationship going public, a first date with a big twist..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="border-white/10 bg-slate-950/60 text-sm text-white placeholder:text-slate-500"
              />
              <p className="text-[11px] text-slate-400">
                Focus on tension: secrets, ultimatums, mismatched expectations,
                or high-stakes firsts.
              </p>
            </div>

            {mode === 'ai' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>AI Assist Level</span>
                  <span>{assistLevel}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={assistLevel}
                  onChange={(e) =>
                    setAssistLevel(Number(e.target.value || 0))
                  }
                  className="w-full accent-white"
                />
                <p className="text-[11px] text-slate-400">
                  0% = you write everything. 100% = let the assistant shape
                  title, description, and beats.
                </p>
              </div>
            )}

            <div className="flex gap-2 pt-1">
              {mode === 'ai' && (
                <Button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic.trim()}
                  className="text-xs font-medium"
                >
                  {isGenerating ? 'Generating…' : 'Generate brief'}
                </Button>
              )}
              <Button
                type="button"
                onClick={handleClear}
                className="text-xs text-slate-200 border border-white/10 bg-transparent hover:bg-white/10"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Mini calendar – visual only for now, safe and non-breaking */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-slate-100">
              Recording calendar
            </h2>
            <span className="text-[11px] text-slate-400">
              Booked dates will be highlighted
            </span>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] text-slate-400">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[11px]">
            {Array.from({ length: 28 }).map((_, i) => {
              const day = i + 1;
              const isBooked = false; // can wire up to real data later

              return (
                <div
                  key={day}
                  className={`flex h-7 items-center justify-center rounded-md border border-white/5 ${
                    isBooked
                      ? 'bg-slate-500/70 text-white'
                      : 'bg-slate-950/40 text-slate-300'
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT: brief preview + editing */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-slate-100">Segment brief</h2>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-slate-300">
            TV-style dating interview prep
          </span>
          <div className="ml-auto">
            <PrintButton />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-100">
          <div className="space-y-3">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-slate-400">
                Episode title
              </div>
              <div className="mt-1 text-base font-semibold text-white">
                {brief.title ||
                  'Your dating-show episode title will appear here.'}
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wide text-slate-400">
                Description
              </div>
              <Textarea
                value={brief.description}
                onChange={(e) =>
                  setBrief((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={5}
                className="mt-1 min-h-[120px] border-white/10 bg-slate-950/60 text-sm text-white placeholder:text-slate-500"
                placeholder="Short, punchy description you can use in your run-of-show and episode description."
              />
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wide text-slate-400">
                Key beats / questions
              </div>
              <Textarea
                value={brief.questions}
                onChange={(e) =>
                  setBrief((prev) => ({
                    ...prev,
                    questions: e.target.value,
                  }))
                }
                rows={6}
                className="mt-1 min-h-[140px] border-white/10 bg-slate-950/60 text-sm text-white placeholder:text-slate-500"
                placeholder="List the emotional beats and questions you want to hit in order. Treat this like a TV prep sheet."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
