// app/research/page.tsx
import Link from 'next/link';
import { Card } from '../../components/ui/card';

export default function ResearchPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/" className="text-sm text-sky-700 hover:underline">← Dashboard</Link>
      </div>

      <header className="space-y-1 text-center">
        <h1 className="text-2xl font-bold">AI Research Assistant</h1>
        <p className="text-sm text-slate-600">
          Plan dating-app episodes with AI or manually. Save briefs so they can be used for guest prep and scheduling.
        </p>
      </header>

      <Card className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow">
        <div className="grid gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Mode</label>
            <div className="flex gap-4 text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="mode" defaultChecked /> Manual
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="mode" /> AI Assist
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Topic / Keywords</label>
            <input
              type="text"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="e.g., first-date expectations, texting cadence, red flags"
            />
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Episode title</label>
              <input
                type="text"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-300"
                placeholder="Title"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Key questions / beats</label>
              <textarea
                className="h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-300"
                placeholder="List your beats"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <textarea
              className="h-28 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="Short description"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <Link
              href="/"
              className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-200"
            >
              Cancel
            </Link>
            <button
              type="button"
              className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Save Brief
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
