<<<<<<< HEAD
PS C:\Users\Medford\Desktop\encore-portal> git commit -m "Replace stub shows page with real create-show UI"
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   app/(app)/shows/page.tsx
        modified:   app/page.tsx

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        app/guest/
        app/research/
        components/guest/
        components/shows/

no changes added to commit (use "git add" and/or "git commit -a")
PS C:\Users\Medford\Desktop\encore-portal> git push
Everything up-to-date
=======
// app/(app)/shows/page.tsx
import Link from "next/link";
import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Show = {
  id: string;
  title: string | null;
  description: string | null;
  created_at: string | null;
};

// Server action to create a new show
async function createShow(formData: FormData) {
  "use server";

  const rawTitle = (formData.get("title") ?? "").toString().trim();
  const rawDescription = (formData.get("description") ?? "").toString().trim();

  if (!rawTitle) {
    // No title – don’t insert an empty show
    return;
  }

  const supabase = await createClient();

  await supabase.from("shows").insert({
    title: rawTitle,
    description: rawDescription || null,
  });

  // Refresh this page’s data
  revalidatePath("/shows");
}

export default async function ShowsPage() {
  const supabase = await createClient();

  const { data: shows, error } = await supabase
    .from("shows")
    .select("id, title, description, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading shows:", error);
  }

  const safeShows: Show[] = (shows ?? []) as Show[];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Shows</h1>
          <p className="text-sm text-slate-400">
            Manage your podcast shows for Encore.
          </p>
        </div>
      </div>

      {/* Two-column layout: shows list + create panel */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        {/* Left: list of shows */}
        <div className="space-y-3">
          {safeShows.length > 0 ? (
            safeShows.map((show) => (
              <div
                key={show.id}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold text-white">
                      {show.title || "Untitled show"}
                    </h2>

                    {show.description && (
                      <p className="mt-1 text-xs text-slate-300">
                        {show.description}
                      </p>
                    )}

                    <p className="mt-2 text-[11px] uppercase tracking-wide text-slate-500">
                      Created{" "}
                      {show.created_at
                        ? new Date(show.created_at).toLocaleString()
                        : "Unknown"}
                    </p>
                  </div>

                  {/* Open show – later this can go to /shows/[id] */}
                  <Link
                    href={`/shows/${show.id}`}
                    className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-slate-50 hover:bg-white/20"
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-sm text-slate-300">
              <p className="mb-1 font-medium text-white">No shows yet</p>
              <p className="text-xs text-slate-400">
                Use the panel on the right to create your first show. Your host
                will see it as soon as they log in.
              </p>
            </div>
          )}
        </div>

        {/* Right: create show form */}
        <form
          action={createShow}
          className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <div>
            <h2 className="text-sm font-semibold text-white">
              Create a new show
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Give the show a clear name and a short description your host and
              producer will recognize.
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-xs font-medium text-slate-200"
            >
              Show title
            </label>
            <Input
              id="title"
              name="title"
              required
              placeholder="Love Notes Live"
              className="bg-black/40 text-sm border-white/20"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-xs font-medium text-slate-200"
            >
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Dating-show format: live coaching sessions, guest hot-seats, and follow-up reflections."
              className="bg-black/40 text-sm border-white/20"
            />
          </div>

          <Button
            type="submit"
            className="mt-1 w-full rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-white"
          >
            Create show
          </Button>
        </form>
      </div>
    </div>
  );
}
>>>>>>> 3b42daa (Add shows create UI, guest pages, and research assistant)
