import { ResearchAssistant } from '@/components/research/ResearchAssistant';

export default function ResearchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">AI Research Assistant</h1>
        <p className="text-sm text-slate-400">
          Plan dating-app episodes with AI or manually. Save briefs so they show on your dashboard
          and calendar.
        </p>
      </div>

      <ResearchAssistant />
    </div>
  );
}
