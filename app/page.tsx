// app/page.tsx
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 md:py-16">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-400">
              Encore Podcast
            </p>
            <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
              Encore Podcast Studio
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-400">
              Central hub for your dating-show production — shows, guests,
              prep, and scheduling in one place.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Sign in
              </Button>
            </Link>
          </div>
        </header>

        {/* Main grid */}
        <section className="grid gap-4 md:grid-cols-2">
          <Card className="border-white/10 bg-slate-900/80">
            <CardHeader>
              <CardTitle className="text-sm">Shows</CardTitle>
              <CardDescription>
                Manage your podcast shows and overall formats for Encore.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between text-xs text-slate-400">
              <p>Create a show to start planning episodes.</p>
              <Link href="/shows">
                <Button variant="outline" size="sm">
                  Open
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900/80">
            <CardHeader>
              <CardTitle className="text-sm">Guests</CardTitle>
              <CardDescription>
                Your recurring network of guests for Encore recordings.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between text-xs text-slate-400">
              <p>Add a guest to start building your roster.</p>
              <Link href="/guests">
                <Button variant="outline" size="sm">
                  Open
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900/80">
            <CardHeader>
              <CardTitle className="text-sm">AI Research Assistant</CardTitle>
              <CardDescription>
                Plan dating-app episodes with AI or manually, then print or
                save the brief for your guest and calendar.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between text-xs text-slate-400">
              <p>Generate titles, descriptions, and talking points.</p>
              <Link href="/research">
                <Button variant="outline" size="sm">
                  Open
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900/80">
            <CardHeader>
              <CardTitle className="text-sm">Production Board</CardTitle>
              <CardDescription>
                Simple pipeline view of episodes moving from Planning → Published.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between text-xs text-slate-400">
              <p>See episodes grouped by status at a glance.</p>
              <Link href="/board">
                <Button variant="outline" size="sm">
                  Open
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900/80">
            <CardHeader>
              <CardTitle className="text-sm">Production Calendar</CardTitle>
              <CardDescription>
                Calendar view for scheduled recording dates and release plans.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between text-xs text-slate-400">
              <p>See what&apos;s booked, pending, and released.</p>
              <Link href="/calendar">
                <Button variant="outline" size="sm">
                  Open
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900/80">
            <CardHeader>
              <CardTitle className="text-sm">Settings</CardTitle>
              <CardDescription>
                Studio settings, roles, and integrations.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between text-xs text-slate-400">
              <p>Manage studio-only access and configuration.</p>
              <Link href="/settings">
                <Button variant="outline" size="sm">
                  Open
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
