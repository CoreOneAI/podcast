// app/page.tsx
import Link from 'next/link';
import { Card } from '../components/ui/card';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Encore Podcast Studio</h1>
        <p className="text-sm text-slate-600">
          Central hub for your dating-show production — shows, guests, research, and scheduling in one place.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow hover:shadow-md">
          <h3 className="mb-1 text-base font-semibold">Shows</h3>
          <p className="mb-3 text-sm text-slate-600">
            Manage your podcast shows and formats. Create a show to start planning episodes.
          </p>
          <Link href="/shows" className="text-sm font-medium text-sky-700 hover:underline">
            Open Shows →
          </Link>
        </Card>

        <Card className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow hover:shadow-md">
          <h3 className="mb-1 text-base font-semibold">Guests</h3>
          <p className="mb-3 text-sm text-slate-600">
            Build your recurring network of guests for recordings.
          </p>
          <Link href="/guests" className="text-sm font-medium text-sky-700 hover:underline">
            Open Guests →
          </Link>
        </Card>

        <Card className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow hover:shadow-md">
          <h3 className="mb-1 text-base font-semibold">AI Research Assistant</h3>
          <p className="mb-3 text-sm text-slate-600">
            Plan episode titles, descriptions, and questions. Save briefs for prep and scheduling.
          </p>
          <Link href="/research" className="text-sm font-medium text-sky-700 hover:underline">
            Open Assistant →
          </Link>
        </Card>

        <Card className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow hover:shadow-md">
          <h3 className="mb-1 text-base font-semibold">Production Board</h3>
          <p className="mb-3 text-sm text-slate-600">
            Track episodes from Planning → Booked → Recording → Published.
          </p>
          <Link href="/board" className="text-sm font-medium text-sky-700 hover:underline">
            Open Board →
          </Link>
        </Card>

        <Card className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow hover:shadow-md">
          <h3 className="mb-1 text-base font-semibold">Production Calendar</h3>
          <p className="mb-3 text-sm text-slate-600">
            See booked dates and releases at a glance.
          </p>
          <Link href="/calendar" className="text-sm font-medium text-sky-700 hover:underline">
            Open Calendar →
          </Link>
        </Card>

        <Card className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow hover:shadow-md">
          <h3 className="mb-1 text-base font-semibold">Settings & Guide</h3>
          <p className="mb-3 text-sm text-slate-600">Studio settings, roles, and internal documentation.</p>
          <div className="flex gap-4">
            <Link href="/settings" className="text-sm font-medium text-sky-700 hover:underline">
              Settings →
            </Link>
            <Link href="/guide" className="text-sm font-medium text-sky-700 hover:underline">
              Guide →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
