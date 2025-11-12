// components/layout/AppShell.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/shows', label: 'Shows' },
  { href: '/guests', label: 'Guests' },
  { href: '/calendar', label: 'Production Calendar' },
  { href: '/production', label: 'Production Board' },
  { href: '/research', label: 'AI Research' },
  { href: '/guide', label: 'User Guide' },
  { href: '/settings', label: 'Settings' },
];

export function AppShell({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background glow */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(1200px 800px at 80% -20%, hsl(222 84% 56% / 0.18) 0%, transparent 60%),' +
            'radial-gradient(800px 600px at -10% 20%, hsl(280 80% 60% / 0.18) 0%, transparent 60%),' +
            'linear-gradient(180deg, hsl(222 47% 10%) 0%, hsl(222 47% 6% / 0.95) 100%)',
          backgroundAttachment: 'fixed',
        }}
      />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="px-5 py-4 border-b border-white/10">
            <div className="text-sm font-semibold tracking-wide text-slate-300">
              Encore Podcast
            </div>
            <div className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Encore Podcast Portal
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm transition-colors',
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="px-5 py-4 border-t border-white/10 text-xs text-slate-400 space-y-2">
            <div className="font-medium text-slate-200">
              {user.email}
            </div>
            <div>Encore Studio</div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="sticky top-0 z-10 border-b border-white/5 bg-black/40 backdrop-blur-xl">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="text-sm text-slate-300">
                Welcome back,{' '}
                <span className="font-semibold">{user.email}</span>
              </div>
              <Button
                type="button"
                onClick={handleLogout}
                className="h-8 px-3 text-xs"
              >
                Log out
              </Button>
            </div>
          </header>

          <div className="flex-1 px-4 py-4 md:px-6 md:py-6">
            <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-black/40 p-4 md:p-6 shadow-[0_0_60px_rgba(15,23,42,0.6)] backdrop-blur-xl">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
