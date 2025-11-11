// app/auth/login/page.tsx

import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-md border-white/10 bg-white/5">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl text-white">
            Encore Podcast Portal
          </CardTitle>
          <CardDescription className="text-slate-400">
            Sign in to manage shows, guests, and production.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-slate-400">
            Studio-only access. Contact your producer or admin if you need an
            account.
          </p>

          {/* Simple “enter” button for now */}
          <div className="pt-2">
            <Link href="/">
              <Button className="w-full">
                Enter portal
              </Button>
            </Link>
          </div>
        </CardContent>

        <CardFooter className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Encore Podcast.
        </CardFooter>
      </Card>
    </div>
  );
}
