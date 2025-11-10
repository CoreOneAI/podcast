// app/api/ai/research/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { keywords, assistLevel } = await req.json().catch(() => ({}));

  if (!keywords || typeof keywords !== 'string') {
    return NextResponse.json(
      { error: 'Missing keywords in request body.' },
      { status: 400 }
    );
  }

  const level = typeof assistLevel === 'number' ? assistLevel : 70;

  // Very simple "AI-ish" generator for now: formats your keywords into useful structure.
  // You can later swap this for a real Genkit call without touching the UI.
  const normalized = keywords
    .split(/[,\n]/)
    .map((s: string) => s.trim())
    .filter(Boolean);

  const mainTopic = normalized[0] || 'Encore Podcast Episode';

  const suggestions = [
    `Encore: ${mainTopic}`,
    `Deep Dive: ${mainTopic}`,
    `Behind the Mix – ${mainTopic}`,
  ];

  const description = [
    `In this episode of the Encore Podcast, we explore ${mainTopic.toLowerCase()}.`,
    normalized.length > 1
      ? `We also touch on ${normalized
          .slice(1)
          .map((k) => k.toLowerCase())
          .join(', ')}.`
      : '',
    level > 60
      ? `Whether you're a host, producer, or creative leader, you'll walk away with practical takeaways you can apply to your next session.`
      : `This outline is intentionally lightweight so you can bring more of your own voice into the conversation.`,
  ]
    .filter(Boolean)
    .join(' ');

  const talkingPointsBase =
    normalized.length > 0
      ? normalized
      : ['Intro & personal connection', 'Main theme', 'Practical takeaways'];

  const pointCount = level > 70 ? 6 : level > 40 ? 4 : 3;

  const talkingPoints = [
    `Why ${mainTopic.toLowerCase()} matters right now for your audience`,
    ...talkingPointsBase.slice(0, pointCount - 2).map((p) => `Exploring: ${p}`),
    `Closing: how listeners can take action this week`,
  ];

  return NextResponse.json({
    suggestions,
    description,
    talkingPoints,
  });
}
