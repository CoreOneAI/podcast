// app/page.tsx

import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescri// app/page.tsx
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const tiles = [
  {
    href: '/shows',
    title: 'Shows',
    tagline: 'Manage your podcast shows and overall formats for Encore.',
    body: 'Create a show to start planning episodes.',
    cta: 'Go to Shows',
  },
  {
    href: '/guests',
    title: 'Guests',
    tagline: 'Your recurring network of guests for Encore recordings.',
    body: 'Add a guest to start building your roster.',
    cta: 'Manage guests',
  },
  {
    href: '/research',
    title: 'AI Research Assistant',
    tagline:
      'Plan dating-app episodes with AI or manually, then print or save briefs.',
    body:
      'Generate titles, descriptions, and talking points for TV-style interviews.',
    cta: 'Open assistant',
  },
  {
    href: '/board',
    title: 'Production Board',
    tagline:
      'A simple pipeline view of episodes moving from Planning → Published.',
    body:
      'See episodes grouped by status: Planning, Booked, Recording, Published.',
    cta: 'View board',
  },
  {
    href: '/calendar',
    title: 'Production Calendar',
    tagline:
      'A calendar view for scheduled recording dates and release plans.',
    body: 'See what’s booked, pending, and released at a glance.',
    cta: 'Open calendar',
  },
  {
    href: '/settings',
    title: 'Settings',
    tagline: 'Studio settings, roles, and integrations.',
    body: 'Manage studio configuration and access in one place.',
    cta: 'Open settings',
  },
];

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 🚪 If not logged in, send to login screen
  if (!user) {
    redirect('/auth/login');
  }

  // ✅ Logged in → show the Encore Podcast Studio dashboard
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Encore Podcast
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Encore Podcast Studio
          </h1>
          <p className="max-w-2xl text-sm text-slate-400">
            Central hub for your dating-show production — shows, guests, prep,
            and scheduling in one place.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {tiles.map((tile) => (
            <Card
              key={tile.href}
              className="border-white/10 bg-white/5 hover:border-emerald-400/60 transition-colors"
            >
              <CardHeader>
                <CardTitle className="text-sm text-white">
                  {tile.title}
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  {tile.tagline}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-end justify-between gap-4">
                <p className="text-xs text-slate-400">{tile.body}</p>
                <Link
                  href={tile.href}
                  className="text-xs font-medium text-emerald-400 underline-offset-2 hover:text-emerald-300 hover:underline whitespace-nowrap"
                >
                  {tile.cta}
                </Link>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}
ption,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="space-y-8">
      {/* Page header */}
      <section className="space-y-1">
        <h1 className="text-2xl font-semibold text-white">
          Encore Podcast Studio
        </h1>
        <p className="text-sm text-slate-400">
          Central hub for your dating-show production — shows, guests, prep, and
          scheduling in one place.
        </p>
      </section>

      {/* Main grid of navigation cards */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Shows */}
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Shows</CardTitle>
            <CardDescription>
              Manage your podcast shows and overall formats for Encore.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Create a show to start planning episodes.
            </p>
            <Button asChild size="sm">
              <Link href="/shows">Open</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Guests */}
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Guests</CardTitle>
            <CardDescription>
              Your recurring network of guests for Encore recordings.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Add a guest to start building your roster.
            </p>
            <Button asChild size="sm">
              <Link href="/guests">Open</Link>
            </Button>
          </CardContent>
        </Card>

        {/* AI Research Assistant */}
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>AI Research Assistant</CardTitle>
            <CardDescription>
              Plan dating-app episodes with AI or manually, then print or save
              the brief for your guest and calendar.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Generate titles, descriptions, and talking points for TV-style
              interviews.
            </p>
            <Button asChild size="sm">
              <Link href="/research">Open</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Production Board */}
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Production Board</CardTitle>
            <CardDescription>
              A simple pipeline view of your dating-show episodes moving from
              Planning → Published.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              See episodes grouped by status: Planning, Booked, Recording,
              Published.
            </p>
            <Button asChild size="sm">
              <Link href="/board">Open</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Production Calendar */}
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Production Calendar</CardTitle>
            <CardDescription>
              A calendar view for scheduled recording dates and release plans.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              See what&apos;s booked, pending, and released at a glance.
            </p>
            <Button asChild size="sm">
              <Link href="/calendar">Open</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Studio settings, roles, and integrations.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Manage access and how Encore integrates with your tools.
            </p>
            <Button asChild size="sm">
              <Link href="/settings">Open</Link>
            </Button>
          </CardContent>
        </Card>

        {/* User Guide */}
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>User Guide</CardTitle>
            <CardDescription>
              Internal documentation for how the Encore Portal is used in your
              studio.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Share best practices, checklists, and episode workflows.
            </p>
            <Button asChild size="sm">
              <Link href="/guide">Open</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
